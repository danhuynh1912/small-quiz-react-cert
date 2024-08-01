export const getParamsStringFrom = <O>(object: O) => {
  return object
    ? Object.entries(object)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';
};
