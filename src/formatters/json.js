
export default (ast) => {
  const result = ast.map((obj) => {
    const iter = (object) => {
      const {
        key, status, newValue, oldValue,
      } = object;

      if (Array.isArray(newValue)) {
        const arrayResult = newValue.map((el) => iter(el));
        return { key, status, newValue: arrayResult };
      } if (status === undefined) {
        return { ...object };
      }
      return {
        key, status, oldValue, newValue,
      };
    };
    return iter(obj);
  });

  return JSON.stringify(result, null, 2);
};
