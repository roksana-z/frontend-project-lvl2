
const whiteSpace = '    ';
const halfSpace = '  ';

const objectToString = (prefix, key, value, depth) => {
  const result = Object.keys(value).map((el) => {
    if (typeof value[el] === 'object') {
      return objectToString(' ', el, value[el], depth + 1);
    }
    return `${whiteSpace.repeat(depth + 1)}${el}: ${value[el]}`;
  });

  const startPart = `${whiteSpace.repeat(depth - 1)}${halfSpace}${prefix} ${key}: {`;
  const endPart = `\n${whiteSpace.repeat(depth)}}`;
  return `${startPart}\n${result.join('\n')}${endPart}`;
};

const prepareData = (sign, key, value, lvl) => {
  if (typeof value === 'object') {
    return objectToString(sign, key, value, lvl);
  }
  return `${whiteSpace.repeat(lvl - 1)}${halfSpace}${sign} ${key}: ${value}`;
};

const makeStylish = (ast) => {
  const iter = (tree, depth = 1) => {
    const result = tree.map((el) => {
      const {
        key, status, newValue, oldValue,
      } = el;

      switch (status) {
        case 'bothObjects':
          return `${whiteSpace.repeat(depth)}${key}: {\n${iter(newValue, depth + 1)}\n${whiteSpace.repeat(depth)}}`;
        case 'added':
          return prepareData('+', key, newValue, depth);
        case 'unchanged':
          return prepareData(' ', key, newValue, depth);
        case 'deleted':
          return prepareData('-', key, oldValue, depth);
        case 'changed':
          return `${prepareData('+', key, newValue, depth)}\n${prepareData('-', key, oldValue, depth)}`;
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    });

    return result.join('\n');
  };

  return `{\n${iter(ast)}\n}`;
};

export default makeStylish;
