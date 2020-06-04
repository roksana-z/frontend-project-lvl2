
export default (ast) => {
  const result = ast.map(obj => {

    const iter = (object) => {
      const {
        key, status, newValue, oldValue,
      } = object;

      if (Array.isArray(newValue)) {
        const result2 = newValue.map((el) => iter(el));
        return { key, status, newvalue: result2 };
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
