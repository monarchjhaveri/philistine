import yaml from 'yamljs';

export function parseYaml(yamlString) {
  return yaml.parse(yamlString);
}