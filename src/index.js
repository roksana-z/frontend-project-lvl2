import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatToTree from './formatters/stylish.js';
import formatToText from './formatters/plain.js';
import formatToJson from './formatters/json.js';
import buildAstTree from './buildAst.js';

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

const resolvePath = (filePath) => {
  const curDirectory = process.cwd();
  const absolutePath = path.resolve(curDirectory, filePath);
  return absolutePath;
};

export default (file1Path, file2Path, format) => {
  const resolvedPath1 = resolvePath(file1Path);
  const extFile1 = path.extname(path.basename(resolvedPath1));

  const resolvedPath2 = resolvePath(file2Path);
  const extFile2 = path.extname(path.basename(resolvedPath2));

  if (extFile1 !== extFile2) {
    throw new Error('different extensions');
  }

  const contentFile1 = fs.readFileSync(resolvedPath1, 'utf-8');
  const parsedFile1 = parse(contentFile1, extFile1);

  const contentFile2 = fs.readFileSync(resolvedPath2, 'utf-8');
  const parsedFile2 = parse(contentFile2, extFile2);

  const ast = buildAstTree(parsedFile1, parsedFile2);
  return applyFormat(ast, format);
};
