import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const transformNumbers = (content) => {
  const copyContent = _.cloneDeep(content);
  const keys = Object.keys(copyContent);
  keys.forEach((key) => {
    if (typeof copyContent[key] === 'object') {
      copyContent[key] = transformNumbers(copyContent[key]);
    } if (Number.parseInt(copyContent[key], 10)) {
      copyContent[key] = Number.parseInt(copyContent[key], 10);
    }
  });
  return copyContent;
};

export default (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return transformNumbers(ini.parse(data));
    default:
      throw new Error(`Unknown extension: '${type}'!`);
  }
};
