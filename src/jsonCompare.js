#!/usr/bin/env node
import path from 'path';
import _ from 'lodash';
import parse from './parse.js';
import formatToTree from './format.js'

const makeState = (obj1, obj2, key, depth, parents) => {
  if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
    return {
      key, status: 'bothObjects', depth, parents,
    };
  } if (!_.has(obj1, key)) {
    return {
      key, status: 'added', depth, parents, newValue: obj2[key],
    };
  } if (!_.has(obj2, key)) {
    return {
      key, status: 'deleted', depth, parents, oldValue: obj1[key],
    };
  } if (obj1[key] === obj2[key]) {
    return {
      key, status: 'unchanged', depth, parents, newValue: obj2[key],
    };
  }
  return {
    key, status: 'changed', depth, parents, oldValue: obj1[key], newValue: obj2[key],
  };
};


const buildAstTree = (node1, node2, depth = 1, parents = []) => {
  const treeBeforeKeys = Object.keys(node1);
  const treeAfterKeys = Object.keys(node2);

  const resultKeys = _.union(treeBeforeKeys, treeAfterKeys);
  const result = resultKeys.map((key) => {
    const data = makeState(node1, node2, key, depth, parents);

    if (data.status === 'bothObjects') {
      const newDepth = depth + 1;
      const newParents = [...parents, key];
      const value = buildAstTree(node1[key], node2[key], newDepth, newParents);
      return {...data, newValue: value };
    }
    return data;
  });
  return result;
};

const applyFormat = (ast, style) => {
  switch (style) {
    case 'tree':
      return formatToTree(ast);
    default:
      break;
  }
};

export default (file1, file2, format) => {
  const ext1 = path.extname(path.basename(file1));
  const ext2 = path.extname(path.basename(file2));
  if (ext1 !== ext2) {
    throw new Error('different extensions');
  }
  // dict
  const parsedTreeBefore = parse(file1);
  const parsedTreeAfter = parse(file2);
  const ast = buildAstTree(parsedTreeBefore, parsedTreeAfter);
  console.log(applyFormat(ast, format));
  return applyFormat(ast, format);
};
