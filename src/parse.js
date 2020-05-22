import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';

export default (file) => {
  const ext = path.extname(path.basename(file));
  const content = fs.readFileSync(file, 'utf-8');
  if (ext === '.json') {
    return JSON.parse(content);
  } if (ext === '.yml') {
    return yaml.safeLoad(content);
  }
  if (ext === '.ini') {
    return ini.parse(content);
  }
};
