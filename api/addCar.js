import {
	request
} from '@/common/ajax.js'
// 新增车辆 /car/addCarForApp
export const addCar = (params) => request('/car/addCarForApp', params)
// 修改车辆 /car/updateCarForApp
export const updateCar = (params) => request('/car/updateCarForApp', params)
// 获取所属市场
export const selectMarket = () => request('/market/selectMarket', {}, 'GET')
// 获取指定市场下的所属车商
export const selectMerchantById = (marketId) => request('/merchant/selectMerchantById', {
	marketId: marketId
})
// 获取指定车商下的车场区域
export const getUnSigningAreaByMerchantId = (merchantId) => request('/area/getUnSigningAreaByMerchantId', {
	merchantId: merchantId
})

