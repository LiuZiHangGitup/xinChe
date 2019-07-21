import { request } from '@/common/ajax.js'
// 获取角色列表
export const sysRoleGetAppMerchantStaff = () => request('/sys/role/getAppMerchantStaff',{},'GET')
// 获取员工列表
export const sysUserList = (params) => request('/sys/user/list',params)
// 新增员工
export const sysUserSave = (params) => request('/sys/user/save',params)