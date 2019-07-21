// 上传图片接口地址
export const uploadImageUrl = 'http://47.105.165.101:8686/xinche/upload/multipartFile';
// 封装弹窗
export const toast = (msg) => {
	uni.showToast({
		title: msg,
		icon: 'none',
		position: 'bottom',
		mask: false
	})
}
// 封装页面跳转
export const goWindow = (url) => {
	uni.navigateTo({
		url: url
	})
}
// 查询用户是否已登录未登录调回登录页
export const getToken = () => {
	if (!uni.getStorageSync('token')) {
		uni.reLaunch({
			url: '../login/login'
		})
	}
}
// 封装加载框
export const loading = () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
}
// 当前时间转换
export const retTime = () => {
	let date = new Date();
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;

	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
// 封装跳转tab页面
export const goNavWindow = (url) => {
	uni.switchTab({
		url: url
	})
}
// 封装打电话事件
export const goPhone = (phone) => {
	let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
	if(TEL_REGEXP.test(phone)){
		uni.makePhoneCall({
			phoneNumber: phone
		})
	}else{
		toast('您拨打的是一个假电话哦~')
	}
}
// 权限
export const qx = (qx) => {
	for (let i in uni.getStorageSync('qxList')) {
		if (uni.getStorageSync('qxList')[i] == qx) {
			return true;
			break;
		}
		if (i == uni.getStorageSync('qxList').length && uni.getStorageSync('qxList')[i] != qx) {
			return false;
			break;
		}
	}
}
// 字段过滤器
export const guoLv = (data) => {
	if (data == undefined || data == null || data == NaN) {
		return ''
	} else {
		return data
	}
}
// 查看是否为正确电话
export const isPhone = (phone) => {
	if(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(phone)){
		return true
	}else{
		return false
	}
}