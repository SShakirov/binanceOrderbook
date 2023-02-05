import {computed} from 'vue';

/**
 * Хук для работы с разными видами списков
 * @typedef {type} T - Тип объекта
 * @param {Readonly<T>} props - пропсы
 * @param {string} componentName - название компонента
 * @param {string} componentNameClass - название класса
 * @param {string[]} noClassAttributes - атрибуты, которые не должны попадать в классы
 * @param {Object} validators - валидаторы
 * @return {Object}
 **/
export default function classesFromPropsHook<T>(
    props: Readonly<T>,
    componentName: string,
    componentNameClass: string,
    noClassAttributes: string[],
    validators: {[key: string]: string[] | number[] | boolean[]},
) {
  const getClasses = computed(() => {
    return Object.entries(props)
        .filter(([key, value]) => !noClassAttributes.includes(key) && value)
        .map(([key, value]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!validators[key].includes(value)) {
            // debugger;
            console.warn(`${componentName} haven't define to ${value} ${key}`);
          }

          const name = key.split(/(?=[A-Z])/).map((item) => item.toLowerCase()).join('-');

          let className = `${componentNameClass}__${name}`;
          if (typeof value !== 'boolean') className += `__${value}`;

          return className;
        });
  });

  return {
    getClasses,
  };
}
