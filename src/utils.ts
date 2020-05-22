export const isKeyof = <T extends {}>(
  obj: T,
  key: string | number | symbol,
): key is keyof T => Object.prototype.hasOwnProperty.call(obj, key);
