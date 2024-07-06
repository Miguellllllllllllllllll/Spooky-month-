// @ts-nocheck
export function unhack(obj) {
  if('nil' in obj && obj.nil === "true") {
    return null;
  }
  if('value' in obj) { // isLeaf
    const strValue = obj.value;
    const type = 'type' in obj ? obj.type : 'string';
    switch (type) {
      case 'string':
      case 'date':
      case 'dateTime':
        return strValue;
      case 'integer':
        return parseInt(strValue);
      case 'boolean':
        return strValue === "true";
      default:
        throw new Error(`unknown type ${type}`);
    }
  }
  if ('type' in obj && obj.type === 'array') {
    const keys = Object.keys(obj).filter(x => x !== 'type');
    if (keys.length === 0) {
      return []; // empty
    }
    if(keys.length === 1) {
      const body = obj[keys[0]]; // list or obj
      return Array.isArray(body) ? body.map(x => unhack(x)) : [unhack(body)];
    }
    throw new Error(`unexpected array type with keys ${keys}`);
  }
  // normalize keys and recurse
  const result = {};
  for (const key in obj) {
    const ukey = key.replaceAll("-", "_");
    result[ukey] = unhack(obj[key]);
  }
  return result;
}
