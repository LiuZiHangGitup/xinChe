import { request } from '@/common/tinyShopAjax.js'
// 获取微店车辆列表
export const getCarList = (params) => request('/car/getCarVdian',params)
// 获取品牌 /carBrand/SELECT_BRAND_ALL
export const getBrand = () => request('/carBrand/selectByAll',{})
// 获取车系
export const getXinCheXings = (params) => request('/carAudi/selectByBrandId',params)
// 获取指定车系下的所有车型 
export const getSelectByAudiId = (params) => request('/carType/selectByAudiId', params)
// 获取车辆信息
export const get_cars_detail_info = (params) => request('/car/findCarById',params)
