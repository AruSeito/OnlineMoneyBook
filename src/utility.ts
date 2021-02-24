export const LIST_VIEW = "list";
export const CHART_VIEW = "chart";

export const parseToYearAndMonth = (str?: string) => {
  const date = str ? new Date(str) : new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

export const FormatMonth = (month: number) => {
  return month < 10 ? `0${month}` : month;
};

export const isValidDate = (dateString: string) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return false; // Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

export const flattenArr = (arr: Array<any>) => {
  return arr.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
};

export const ID = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
