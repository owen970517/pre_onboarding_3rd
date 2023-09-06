import { EXPIRE_TIME } from '../constants/cache';
import { searchProps } from '../types/search';

const isCachedExpired = (cachedDate: string) => {
  if (!cachedDate) return true;
  
  const fetchDate = new Date(cachedDate).getTime();
  const now = new Date().getTime();

  return now - fetchDate > EXPIRE_TIME;
};

export const getCachedList = async (queryStr: string) => {
  const cache = await caches.open('search-cache');
  const response = await cache.match(queryStr);
  
  if (response) {
    const cachedDate = response.headers.get('SET_DATE');
    
    if (!isCachedExpired(cachedDate!)) {
      return response;
    } else {
      await cache.delete(queryStr);
    }
  }

  return null;
};

export const setCacheList = async (value: string, data: searchProps[]) => {
  const cache = await caches.open('search-cache');
  const header = new Headers();
  header.append('SET_DATE', new Date().toISOString());
  const response = new Response(JSON.stringify(data), {headers: header});
  cache.put(value, response);
};