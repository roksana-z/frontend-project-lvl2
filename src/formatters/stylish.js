const whiteSpace = '  ';
const whiteSpaceForCloseBrackets = '  ';

const objecToString = (prefix, key, value, depth) => {
  const arr = [];

  const iter = (prefix2, key2, obj2, depth2) => {
    const firstPart = `${whiteSpace.repeat(depth2)}${prefix} ${key2}: {`;
    arr.push(firstPart);

    const keys = Object.keys(obj2);
    keys.forEach((forKey) => {
      if (typeof obj2[forKey] === 'object') {
        const newDepth = depth2 + 1;
        iter(' ', forKey, obj2[forKey], newDepth);
      } else {
        const str = `${whiteSpace.repeat(depth2 + 2)}${forKey}: ${obj2[forKey]}`;
        arr.push(str);
      }
    });

    const secondPart = `${whiteSpaceForCloseBrackets.repeat(depth2)}}`;
    arr.push(secondPart);
  };

  iter(prefix, key, value, depth);

  return arr;
};

export default (ast) => {
  const array = [];
  const iter = (tree, arr) => {
    tree.forEach((el) => {
      const {
        key, status, depth, newValue, oldValue,
      } = el;

      if (status === 'bothObjects') {
        const str = `${whiteSpace.repeat(depth)}${key}: {`;
        arr.push(str);
        iter(newValue, arr);
        arr.push(`${whiteSpaceForCloseBrackets}}`);
      } else if (status === 'added') {
        if (typeof newValue === 'object') {
          const newArr = objecToString('+', key, newValue, depth);
          arr.push(newArr);
        } else {
          const str = `${whiteSpace.repeat(depth)}+ ${key}: ${newValue}`;
          arr.push(str);
        }
      } else if (status === 'unchanged') {
        if (typeof newValue === 'object') {
          const newArr = objecToString(' ', key, newValue, depth);
          arr.push(newArr);
        } else {
          const str = `${whiteSpace.repeat(depth)}  ${key}: ${newValue}`;
          arr.push(str);
        }
      } else if (status === 'deleted') {
        if (typeof oldValue === 'object') {
          const newArr = objecToString('-', key, oldValue, depth);
          arr.push(newArr);
        } else {
          const str = `${whiteSpace.repeat(depth)}- ${key}: ${oldValue}`;
          arr.push(str);
        }
      } else if (status === 'changed') {
        if (typeof newValue === 'object' && typeof oldValue !== 'object') {
          const newArr = objecToString('+', key, newValue, depth);
          arr.push(newArr);
          const str = `${whiteSpace.repeat(depth)}- ${key}: ${oldValue}`;
          arr.push(str);
        } else if (typeof oldValue === 'object' && typeof newValue !== 'object') {
          const newArr = objecToString('-', key, oldValue, depth);
          arr.push(newArr);
          const str = `${whiteSpace.repeat(depth)}+ ${key}: ${newValue}`;
          arr.push(str);
        } else {
          const newStr = `${whiteSpace.repeat(depth)}+ ${key}: ${newValue}`;
          arr.push(newStr);
          const oldStr = `${whiteSpace.repeat(depth)}- ${key}: ${oldValue}`;
          arr.push(oldStr);
        }
      }
    });
  };
  iter(ast, array);
  const result = `{\n${array.flat().join('\n')}\n}`;
  return result;
};
