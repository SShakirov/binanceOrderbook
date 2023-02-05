export const getFromLocalStorage = (name: string) => {
  const settings = localStorage.getItem(name);
  return settings ? JSON.parse(settings) : undefined;
};

export const saveToLocalStorage = (name: string, obj: unknown) => {
  localStorage.setItem(name, JSON.stringify(obj));
};
