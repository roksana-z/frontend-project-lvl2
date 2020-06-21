import formatToTree from './stylish.js';
import formatToText from './plain.js';
import formatToJson from './json.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return formatToTree(ast);
    case 'plain':
      return formatToText(ast);
    case 'json':
      return formatToJson(ast);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
