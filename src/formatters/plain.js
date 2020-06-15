const makePath = (prevKeys, curKey) => {
  const path = [...prevKeys, curKey];
  return `'${path.join('.')}'`;
};

const convertValue = (val) => {
  if (typeof val === 'object') {
    return '[complex value]';
  } if (typeof val === 'string') {
    return `'${val}'`;
  } return val;
};

export default (ast) => {
  const arr = [];
  const iter = (tree) => {
    tree.forEach((el) => {
      const {
        key, status, parents, newValue, oldValue,
      } = el;
      const path = makePath(parents, key);
      const valueNew = convertValue(newValue);
      const valueOld = convertValue(oldValue);

      switch (status) {
        case 'bothObjects':
          iter(newValue);
          break;
        case 'added': {
          arr.push(`Property ${path} was added with value: ${valueNew}`);
          break;
        }
        case 'deleted': {
          arr.push(`Property ${path} was deleted`);
          break;
        }
        case 'changed': {
          arr.push(`Property ${path} was changed from ${valueOld} to ${valueNew}`);
          break;
        }
        default:
          break;
      }
    });
  };
  iter(ast);
  return arr.join('\n');
};
