import _ from 'lodash';

const whiteSpace = '    ';
const halfSpace = '  ';

const objecToString = (prefix, key, value, depth) => {
  const result = [];

  const iter = (sign, keyName, val, lvl) => {
    const firstPart = `${whiteSpace.repeat(lvl - 1)}${halfSpace}${sign} ${keyName}: {`;
    result.push(firstPart);

    const keys = Object.keys(val);
    keys.forEach((forKey) => {
      if (typeof val[forKey] === 'object') {
        const newLvl = lvl + 1;
        iter(' ', forKey, val[forKey], newLvl);
      } else {
        const str = `${whiteSpace.repeat(lvl + 1)}${forKey}: ${val[forKey]}`;
        result.push(str);
      }
    });

    const secondPart = `${whiteSpace.repeat(lvl)}}`;
    result.push(secondPart);
  };

  iter(prefix, key, value, depth);

  return result;
};

const prepareData = (sign, key, value, lvl) => {
  if (typeof value === 'object') {
    return objecToString(sign, key, value, lvl);
  }
  return `${whiteSpace.repeat(lvl - 1)}${halfSpace}${sign} ${key}: ${value}`;
};

export default (ast) => {
  const astCopy = _.cloneDeep(ast);
  const result = [];
  const iter = (tree, depth) => {
    tree.forEach((el) => {
      const {
        key, status, newValue, oldValue,
      } = el;

      if (status === 'bothObjects') {
        result.push(`${whiteSpace.repeat(depth)}${key}: {`);
        iter(newValue, depth + 1);
        result.push(`${whiteSpace.repeat(depth)}}`);
      } else if (status === 'added') {
        result.push(prepareData('+', key, newValue, depth));
      } else if (status === 'unchanged') {
        result.push(prepareData(' ', key, newValue, depth));
      } else if (status === 'deleted') {
        result.push(prepareData('-', key, oldValue, depth));
      } else if (status === 'changed') {
        result.push(prepareData('+', key, newValue, depth));
        result.push(prepareData('-', key, oldValue, depth));
      }
    });
  };
  iter(astCopy, 1);
  return `{\n${result.flat().join('\n')}\n}`;
};
