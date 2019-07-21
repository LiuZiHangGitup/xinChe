import { request } from '@/common/ajax.js'

// 获取用户信息
export const getMeInfo = () => request('/sys/user/info',{},'GET')

// 获取车商信息
export const marketSelectMarket = () => request('/market/selectMarket',{},'GET')

// 获取车商信息
export const merchantSelectMerchant = () => request('/merchant/selectMerchant',{},'GET')

// 获取个人信息列表  /messageInfo/selectByMany
export const getMyMsg = (parmas) => request('/messageInfo/selectByMany',parmas)