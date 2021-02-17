export const LIST_VIEW = "list";
export const CHART_VIEW = "chart";

export const parseToYearAndMonth = (str?: string) => {
  const date = str ? new Date(str) : new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};
