import { request } from '@/common/ajax.js'
// 获取rfid
export const getRfid = () => request('/LIFANGAPI/getRfid',{},'GET')
// 绑定rfid
export const addRfid = (params) => request('/LIFANGAPI/addRfid',params)