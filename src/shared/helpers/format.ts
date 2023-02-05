/**
 * Хелперы для форматирования даты
 * Первая функция для данных в формате Date
 * Вторая функция для строки времени формата ISO (строка с временем с бека)
 * Виды options можно посмотреть на
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 * По дефолту выводит день, месяц и год
 * Вид вывода определяется по языку браузера пользователя
 */


export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  const userLocale = navigator.language;
  return date.toLocaleDateString(userLocale, options);
};

export const formatDateFromString = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(dateString);
  return formatDate(date, options);
};


/**
 * Хелпер для деления массива на чанки по определенному колличеству
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatArrayToChunks = (items: Array<any>, chunkSize: number): Array<Array<any>> => {
  if (!chunkSize) return items;
  const chunksCount = Math.ceil(items.length / chunkSize);

  return Array.from(Array(chunksCount).keys())
      .map((item) => items.slice(item * chunkSize, item * chunkSize + chunkSize));
};


// преобразует дату и выводит время актуальное
export const getLocaleTime = (dateString: string): Date => {
  const differenceBetweenTimeZone = new Date().getTimezoneOffset()*-60000;
  const now = new Date(dateString).getTime();
  return new Date(now + differenceBetweenTimeZone);
};

// преобразует введеный номер телефона к формату бэука
export const formatPhoneNumber = (phone: string): string => {
  const phoneDeleteSymbols = [' ', '-', '(', ')', '+'];

  let currentPhoneNumber = phone;
  phoneDeleteSymbols.forEach((symbol) => {currentPhoneNumber = currentPhoneNumber.replaceAll(symbol, '')});
  if (currentPhoneNumber[0] === '8') currentPhoneNumber = '7' + currentPhoneNumber.slice(1);
  currentPhoneNumber = '+' + currentPhoneNumber;

  return currentPhoneNumber;
};

// Number.prototype.toFixed() без округления
export const toFixedHard = (num: number, fixed: number): string => {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)?.[0] ?? '0';
}

