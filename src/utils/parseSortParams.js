import { SORT_ORDER, STUDENT_KEYS } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownSortOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(
    sortOrder,
  );

  if (isKnownSortOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  if (STUDENT_KEYS.includes(sortBy)) return sortBy;

  return STUDENT_KEYS[0];
};

export const parseSortParams = ({ sortOrder, sortBy }) => {
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
