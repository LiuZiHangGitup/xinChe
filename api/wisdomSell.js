import { request } from '@/common/ajax.js'
export const getWisdom = (params) => request('/cars/selectByMany',params)  