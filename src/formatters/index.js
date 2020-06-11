import path from 'path';
import parse from '../parsers.js';
import formatToTree from './stylish.js';
import formatToText from './plain.js';
import formatToJson from './json.js';
import buildAstTree from '../buildAst.js';

const applyFormat = (ast, style) => {
  switch (style) {
    case 'stylish':
      return formatToTree(ast);
    case 'plain':
      return formatToText(ast);
    case 'json':
      return formatToJson(ast);
    default:
      return undefined;
  }
};

const resolvePath = (path1) => {
  const curDirectory = process.cwd();
  const absolutePath = path.resolve(curDirectory, path1);
  return absolutePath;
};

export default (file1, file2, format) => {
  const ext1 = path.extname(path.basename(file1));
  const ext2 = path.extname(path.basename(file2));
  if (ext1 !== ext2) {
    throw new Error('different extensions');
  }
  // dict
  const parsedTreeBefore = parse(resolvePath(file1));
  const parsedTreeAfter = parse(resolvePath(file2));
  const ast = buildAstTree(parsedTreeBefore, parsedTreeAfter);
  return applyFormat(ast, format);
};
