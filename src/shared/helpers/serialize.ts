export interface IQueryObject {
  [key: string]: string | string[];
}

const delimiter = '&';
const getQueryPath = (key: string, value: string) => {
  const currentKey = encodeURIComponent(key);
  const currentValue = encodeURIComponent(value);
  return currentKey + '=' + currentValue;
};

// eslint-disable-next-line valid-jsdoc
/**
 * Метод сериализации объекта в query string
 * @typedef {type} T - Тип объекта для сериализации
 * @param {T} obj - Объект для сериализации
 * @return {Array<keyof T>} - query string
 **/
export function serializeFromObjectToQueryString<T extends IQueryObject>(obj: T) {
  return Object.entries(obj)
      .filter(([, value]) => value != null && value.length !== 0 && value !== '' )
      .map(([key, value]) => {
        if (Array.isArray(value)) return value.map((item) => getQueryPath(key, item)).join(delimiter);
        else return getQueryPath(key, value);
      })
      .join(delimiter);
}
