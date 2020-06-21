
import _ from 'lodash';

const makeState = (objBefore, objAfter, key) => {
  if (!_.has(objBefore, key)) {
    return {
      key, status: 'added', newValue: objAfter[key],
    };
  } if (!_.has(objAfter, key)) {
    return {
      key, status: 'deleted', oldValue: objBefore[key],
    };
  } if (typeof objBefore[key] === 'object' && typeof objAfter[key] === 'object') {
    return {
      key, status: 'bothObjects',
    };
  } if (objBefore[key] === objAfter[key]) {
    return {
      key, status: 'unchanged', newValue: objAfter[key],
    };
  }
  return {
    key, status: 'changed', oldValue: objBefore[key], newValue: objAfter[key],
  };
};

const buildAstTree = (nodeBefore, nodeAfter) => {
  const beforeKeys = Object.keys(nodeBefore);
  const afterKeys = Object.keys(nodeAfter);

  const unitedKeys = _.union(beforeKeys, afterKeys);
  const result = unitedKeys.map((key) => {
    const data = makeState(nodeBefore, nodeAfter, key);

    if (data.status === 'bothObjects') {
      const value = buildAstTree(nodeBefore[key], nodeAfter[key]);
      return { ...data, newValue: value };
    }
    return data;
  });
  return result;
};

export default buildAstTree;
