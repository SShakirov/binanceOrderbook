import {computed, ref} from 'vue';

import {type IId} from '@/store/types';



/**
 * Хук для работы с разными видами списков
 * @typedef {type} T - Тип объекта
 * @param {Array<T>} initList - Инициализируеший список
 * @return {Object}
 **/
export default function objectsListHook<T extends IId>(initList: Array<T> = []) {
  const list = ref<IId[]>(initList as IId[]);


  const getList = computed<T[]>(() => list.value as T[]);

  const getListLastIdNumber = computed<number>(() => {
    return (list.value.length > 0) ? +list.value[list.value.length - 1].id : 0;
  });

  const getFirstNItems = computed<T[]>((amount: number) => list.value.slice(0, amount) as T[]);


  const addItem = (item: IId) => {list.value = [...list.value, item]};
  const deleteItem = (id: string | number) => {
    list.value = list.value.filter((item) => item.id !== id);
  };

  const deleteAllItems = () => {
    list.value = [];
  };

  const addListItem = async (item: T): Promise<T> => {
    const currentItem = item;

    let currentId = Math.max(...list.value.map((item) => item.id as number));
    if (currentId === -Infinity) currentId = 0;

    currentItem.id = currentId + 1;

    addItem(currentItem);

    return currentItem;
  };


  return {
    getList,
    getListLastIdNumber,
    getFirstNItems,

    addItem,
    deleteItem,
    deleteAllItems,

    addListItem,
  };
}
