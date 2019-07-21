import { request } from '@/common/ajax.js'

// 查询买车客户列表
export const getBuyCarList = (params) => request('/customer/customerBuyList',params)
// 买车客户添加
export const customerCustomerBuyAdd = (params) => request('/customer/customerBuyAdd',params)
// 卖车客户添加
export const customerCustomerSellAdd = (params) => request('/customer/customerSellAdd',params)
// 卖车客户列表 customer/customerSellList
export const customerCustomerSellList = (params) => request('/customer/customerSellList',params)
// 买车客户详情 customer/customerBuyInfo
export const customerCustomerBuyInfo = (params) => request('/customer/customerBuyInfo',params)
// 卖车客户详情 customer/customerSellInfo
export const customerCustomerSellInfo = (params) => request('/customer/customerSellInfo',params)
//跟踪状态添加 customer/customerTracking
export const customerCustomerTracking = (params) => request('/customer/customerTracking',params)
// 跟踪列表查询 customer/customerTrackingList
export const customerCustomerTrackingList = (params) => request('/customer/customerTrackingList',params)
// 卖车客户删除 customer/customerSellDel
export const customerCustomerSellDel = (params) => request('/customer/customerSellDel',params)
// 买车客户删除
export const customerCustomerBuyDel = (params) => request('/customer/customerBuyDel',params)
// 卖车客户编辑
export const customerCustomerSellModify = (params) => request('/customer/customerSellModify',params)
// 买车客户编辑
export const customerCustomerBuyModify = (params) => request('/customer/customerBuyModify',params)