
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

const iter = (tree, parents = []) => {
  const result = tree.filter((el) => el.status !== 'unchanged').map((el) => {
    const {
      key, status, newValue, oldValue,
    } = el;
    const path = makePath(parents, key);
    const valueNew = convertValue(newValue);
    const valueOld = convertValue(oldValue);

    switch (status) {
      case 'bothObjects':
        return iter(newValue, [...parents, key]);
      case 'added':
        return (`Property '${path}' was added with value: ${valueNew}`);
      case 'deleted':
        return (`Property '${path}' was deleted`);
      case 'changed':
        return (`Property '${path}' was changed from ${valueOld} to ${valueNew}`);
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  });
  return result.filter((el) => el !== undefined).join('\n');
};

export default iter;
