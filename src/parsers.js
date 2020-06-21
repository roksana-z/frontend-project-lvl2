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
  if (type === '.json') {
    return JSON.parse(data);
  } if (type === '.yml') {
    return yaml.safeLoad(data);
  } if (type === '.ini') {
    return transformNumbers(ini.parse(data));
  }
  throw new Error(`Unknown extension: '${type}'!`);
};
