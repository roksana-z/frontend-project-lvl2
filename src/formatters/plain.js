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
  const iter = (ast) => {
    ast.forEach((el) => {
      const {
        key, status, depth, parents, newValue, oldValue,
      } = el;
      const path = makePath(parents, key);
      const value1 = convertValue(newValue);
      const value2 = convertValue(oldValue);

      switch (status) {
        case 'bothObjects':
          iter(newValue);
          return;
        case 'added':
          const str = `Property ${path} was added with value: ${value1}`;
          arr.push(str);
          return;
        case 'deleted':
          const str2 = `Property ${path} was deleted`;
          arr.push(str2);
          return;
        case 'changed':
          const str3 = `Property ${path} was changed from ${value2} to ${value1}`;
          arr.push(str3);
        default:
          return;
      }
    });
  };
  iter(ast);
  return arr.join('\n');
};
