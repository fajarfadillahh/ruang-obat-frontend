export function filterData<T extends Record<string, any>>(
  data: T[],
  search: string,
  keys: (keyof T)[],
): T[] {
  return data.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return value && value.toLowerCase().includes(search.toLowerCase());
    }),
  );
}
