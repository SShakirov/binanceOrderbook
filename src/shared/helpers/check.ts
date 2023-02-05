// eslint-disable-next-line valid-jsdoc
/**
 * Метод проверки на наличие записей в полях
 * @typedef {type} T - Объект для проверки
 * @param {T} obj - Объект для проверки
 * @param {Array<keyof T>} keys - Ключи для проверки
 * @return {Array<keyof T>} - Список полей, у которых нет значений
 **/
export default function check<T>(obj: T, keys: Array<keyof T>) : Array<keyof T> {
  return keys.filter((item) => !obj[item]);
}
