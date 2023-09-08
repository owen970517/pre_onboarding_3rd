import { instance } from "./instance";
import * as cacheStorage from '../utils/cacheStorage';

export const getSearchedList = async (searchValue: string) => {
  if (searchValue === '') {
    return [];
  } 

  const cachedResponse = await cacheStorage.getCachedList(searchValue);
  if (cachedResponse) {
    return cachedResponse.json();
  }

  try {
    const response = await instance.get(`/sick?sickNm_like=${searchValue}`);
    await cacheStorage.setCacheList(searchValue, response.data);
    console.info('calling api');
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};