import { request } from '@/common/ajax'
// 获取公告列表接口
export const getNoticeList = (params) => request('/notice/selectByMany',params)