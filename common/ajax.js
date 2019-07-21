import {
	getToken,
	toast
} from '@/common/utils.js'
const baseUrl = 'http://47.105.165.101:8686/xinche';

export const request = (url, params, type) => {
	return new Promise((reslove, reject) => {
		getToken();
		let token = {}
		if (uni.getStorageSync('token')) {
			token = uni.getStorageSync('token')
		}
		let typeState = 'POST';
		if (type) {
			typeState = type
		}
		uni.request({
			url: baseUrl + url,
			method: typeState,
			data: params,
			dataType: 'json',
			header: {
				'Authentication': token
			},
			success: (resData) => {
				if (resData.statusCode !== 200) {
					// uni.reLaunch({url:'../login/login'})
					toast('服务器错误')
					reslove()
				} else if (resData.data.code == 401) {
					uni.reLaunch({
						url: '/pages/index/login/login?token=1'
					})
					uni.clearStorageSync();
					toast('身份已过期,请重新登录')
					reslove()
				} else {
					reslove(resData.data);
				}
			}
		})
	})
}
