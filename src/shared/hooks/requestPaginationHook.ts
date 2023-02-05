import {computed, ref, type Ref, type ComputedRef} from 'vue';

import {IPaginationParams, IPagination} from '@/store/types';

import {
  serializeFromObjectToQueryString,
  IQueryObject,
} from '../helpers/serialize';
import useRequest from './requestHook';



export interface IUseRequestPaginationHook<T> {
  list: Ref<T[]>,
  pagination: Ref<IPaginationParams>,

  getList: ComputedRef<T[]>,

  setToList: (data: T[]) => void,
  addToList: (data: T[], reverse?: boolean, isChangeTotal?: boolean) => void,
  removeFromList: (data: T[], isChangeTotal?: boolean) => void,

  setFilters: (data: IQueryObject) => void,
  addFilters: (data: IQueryObject) => void,

  load: () => Promise<T[]>,
  loadNextPage: () => Promise<T[]>,

  addItem: (data: T, reverse?: boolean) => void,

  setValuesToDefault: () => void,
}


function useRequestPaginationHook<T>(baseUrl: string, filters?: IQueryObject): IUseRequestPaginationHook<T> {
  const isLoading = ref<boolean>(false);

  const list = ref<T[]>([]) as Ref<T[]>;
  const currentFilters = ref<IQueryObject | undefined>(filters);
  const pagination = ref<IPaginationParams>({
    page: 0,
    size: -1,
    total: -1,
  });

  const request = useRequest();


  const getList = computed<T[]>(() => list.value);


  const setToList = (data: T[]) => {list.value = data};
  const addToList = (data: T[], reverse = false, isChangeTotal = false) => {
    if (reverse) list.value.unshift(...data);
    else list.value.push(...data);

    if (isChangeTotal) pagination.value.total += data.length;
  };
  const removeFromList = (data: T[], isChangeTotal = false) => {
    list.value = list.value.filter((item) => !data.includes(item));
    if (isChangeTotal) pagination.value.total -= data.length;
  };

  const setFilters = (data: IQueryObject) => {currentFilters.value = data};
  const addFilters = (data: IQueryObject) => {currentFilters.value = {...currentFilters.value, ...data}};


  const addItem = (data: T, reverse = false) => {
    reverse ? list.value.unshift(data) : list.value.push(data);
  };

  const setValuesToDefault = () => {
    pagination.value.page = 0;
    pagination.value.total = -1;
    list.value = [];
  };

  const getQuery = () => {
    let query: IQueryObject = {};

    if (pagination.value.page > 1) query.page = pagination.value.page.toString();
    if (pagination.value.size > 0) query.size = pagination.value.size.toString();

    query = {...query, ...currentFilters.value};

    const stringQuery = serializeFromObjectToQueryString(query);

    return (stringQuery) ? '?' + stringQuery : '';
  };


  const doRequest = async (url: string): Promise<IPagination<T>> => {
    isLoading.value = true;

    return await request.get(url)
        .then((data: IPagination<T>) => {
          pagination.value.total = data.total;
          return data;
        })
        .finally(() => {isLoading.value = false});
  };

  const load = async (): Promise<T[]> => {
    pagination.value.page = 1;
    const response = await doRequest(baseUrl + getQuery());

    setToList(response.items);
    return response.items;
  };

  const loadNextPage = async (): Promise<T[]> => {
    if (list.value.length >= pagination.value.total) return [];

    pagination.value.page += 1;

    const response = await doRequest(baseUrl + getQuery());

    addToList(response.items);
    return response.items;
  };


  return {
    list,
    pagination,

    getList,

    setToList,
    addToList,
    removeFromList,

    setFilters,
    addFilters,

    load,
    loadNextPage,

    addItem,

    setValuesToDefault,
  };
}


const useRequestPagination = useRequestPaginationHook;
export default useRequestPagination;

