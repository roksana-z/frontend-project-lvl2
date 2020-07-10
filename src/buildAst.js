
import _ from 'lodash';

const buildAstTree = (nodeBefore, nodeAfter) => {
  const beforeKeys = Object.keys(nodeBefore);
  const afterKeys = Object.keys(nodeAfter);

  const unitedKeys = _.union(beforeKeys, afterKeys);

  const result = unitedKeys.map((key) => {
    if (!_.has(nodeBefore, key)) {
      return {
        key, status: 'added', newValue: nodeAfter[key],
      };
    } if (!_.has(nodeAfter, key)) {
      return {
        key, status: 'deleted', oldValue: nodeBefore[key],
      };
    } if (typeof nodeBefore[key] === 'object' && typeof nodeAfter[key] === 'object') {
      const children = buildAstTree(nodeBefore[key], nodeAfter[key]);
      return {
        key, status: 'bothObjects', newValue: children,
      };
    } if (nodeBefore[key] === nodeAfter[key]) {
      return {
        key, status: 'unchanged', newValue: nodeAfter[key],
      };
    }
    return {
      key, status: 'changed', oldValue: nodeBefore[key], newValue: nodeAfter[key],
    };
  });

  return result;
};

export default buildAstTree;
