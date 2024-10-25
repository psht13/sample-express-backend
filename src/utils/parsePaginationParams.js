const parseNumber = (value, defaultValue) => {
  const isString = typeof value === 'string';
  if (!isString) return defaultValue;

  const parsedValue = parseInt(value, 10);
  const isNaNValue = Number.isNaN(parsedValue);

  if (isNaNValue) return defaultValue;

  return parsedValue;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return { page: parsedPage, perPage: parsedPerPage };
};
