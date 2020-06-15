const whiteSpace = '    ';
const halfSpace = '  ';

const objecToString = (prefix, key, value, depth) => {
  const arr = [];

  const iter = (prefix2, key2, obj2, depth2) => {
    const firstPart = `${whiteSpace.repeat(depth2 - 1)}${halfSpace}${prefix} ${key2}: {`;
    arr.push(firstPart);

    const keys = Object.keys(obj2);
    keys.forEach((forKey) => {
      if (typeof obj2[forKey] === 'object') {
        const newDepth = depth2 + 1;
        iter(' ', forKey, obj2[forKey], newDepth);
      } else {
        const str = `${whiteSpace.repeat(depth2 + 1)}${forKey}: ${obj2[forKey]}`;
        arr.push(str);
      }
    });

    const secondPart = `${whiteSpace.repeat(depth2)}}`;
    arr.push(secondPart);
  };

  iter(prefix, key, value, depth);

  return arr;
};

const prepareData = (sign, key, value, lvl) => {
  if (typeof value === 'object') {
    return objecToString(sign, key, value, lvl);
  }
  return `${whiteSpace.repeat(lvl - 1)}${halfSpace}${sign} ${key}: ${value}`;
};

export default (ast) => {
  const array = [];
  const iter = (tree, arr) => {
    tree.forEach((el) => {
      const {
        key, status, depth, newValue, oldValue,
      } = el;

      if (status === 'bothObjects') {
        arr.push(`${whiteSpace.repeat(depth)}${key}: {`);
        iter(newValue, arr);
        arr.push(`${whiteSpace.repeat(depth)}}`);
      } else if (status === 'added') {
        arr.push(prepareData('+', key, newValue, depth));
      } else if (status === 'unchanged') {
        arr.push(prepareData(' ', key, newValue, depth));
      } else if (status === 'deleted') {
        arr.push(prepareData('-', key, oldValue, depth));
      } else if (status === 'changed') {
        arr.push(prepareData('+', key, newValue, depth));
        arr.push(prepareData('-', key, oldValue, depth));
      }
    });
  };
  iter(ast, array);
  return `{\n${array.flat().join('\n')}\n}`;
};
