
import _ from 'lodash';

const makeState = (objBefore, objAfter, key, depth, parents) => {
  if (typeof objBefore[key] === 'object' && typeof objAfter[key] === 'object') {
    return {
      key, status: 'bothObjects', depth, parents,
    };
  } if (!_.has(objBefore, key)) {
    return {
      key, status: 'added', depth, parents, newValue: objAfter[key],
    };
  } if (!_.has(objAfter, key)) {
    return {
      key, status: 'deleted', depth, parents, oldValue: objBefore[key],
    };
  } if (objBefore[key] === objAfter[key]) {
    return {
      key, status: 'unchanged', depth, parents, newValue: objAfter[key],
    };
  }
  return {
    key, status: 'changed', depth, parents, oldValue: objBefore[key], newValue: objAfter[key],
  };
};

const buildAstTree = (nodeBefore, nodeAfter, depth = 1, parents = []) => {
  const beforeKeys = Object.keys(nodeBefore);
  const afterKeys = Object.keys(nodeAfter);

  const unitedKeys = _.union(beforeKeys, afterKeys);
  const result = unitedKeys.map((key) => {
    const data = makeState(nodeBefore, nodeAfter, key, depth, parents);

    if (data.status === 'bothObjects') {
      const newDepth = depth + 1;
      const newParents = [...parents, key];
      const value = buildAstTree(nodeBefore[key], nodeAfter[key], newDepth, newParents);
      return { ...data, newValue: value };
    }
    return data;
  });
  return result;
};

export default buildAstTree;
