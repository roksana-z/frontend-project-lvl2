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
          const str = `Property ${path} was added with value: ${valueNew}`;
          arr.push(str);
          break;
        }
        case 'deleted': {
          const str2 = `Property ${path} was deleted`;
          arr.push(str2);
          break;
        }
        case 'changed': {
          const str3 = `Property ${path} was changed from ${valueOld} to ${valueNew}`;
          arr.push(str3);
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
