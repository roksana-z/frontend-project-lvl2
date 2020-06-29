import _ from 'lodash';

const makePath = (prevKeys, curKey) => {
  const path = [...prevKeys, curKey];
  return path.join('.');
};

const convertValue = (val) => {
  if (typeof val === 'object') {
    return '[complex value]';
  } if (typeof val === 'string') {
    return `'${val}'`;
  } return val;
};

export default (ast) => {
  const astCopy = _.cloneDeep(ast);
  const result = [];
  const iter = (tree, parents) => {
    tree.forEach((el) => {
      const {
        key, status, newValue, oldValue,
      } = el;
      const path = makePath(parents, key);
      const valueNew = convertValue(newValue);
      const valueOld = convertValue(oldValue);

      switch (status) {
        case 'bothObjects':
          iter(newValue, [...parents, key]);
          break;
        case 'added': {
          result.push(`Property '${path}' was added with value: ${valueNew}`);
          break;
        }
        case 'deleted': {
          result.push(`Property '${path}' was deleted`);
          break;
        }
        case 'changed': {
          result.push(`Property '${path}' was changed from ${valueOld} to ${valueNew}`);
          break;
        }
        default:
          break;
      }
    });
  };
  iter(astCopy, []);
  return result.join('\n');
};
