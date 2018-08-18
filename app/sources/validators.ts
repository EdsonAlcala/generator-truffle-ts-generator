export const requiredFor = (field: string) => {
  return (value: string): boolean | string => {
    if (!value) {
      return requiredMessageFor(field);
    }
    return true;
  };
};

const requiredMessageFor = (value: string): string => {
  return `${value} cannot be empty`;
};
