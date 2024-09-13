export const buildPath = (
  path: string,
  queryParams: Record<string, string | number>,
): string => {
  let newPath = path;

  Object.entries(queryParams).forEach(([key, value]) => {
    newPath = newPath.replace(`:${key}`, value.toString());
  });

  return newPath;
};
