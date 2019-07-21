<template>
	<view id="bindIc">
		<view class="bindIc_Item">
			<view class="bindIc_Item_left">
				<image src="../../../static/carAdmin/carInfo/license.png"></image>
				<text>车牌号：</text>
			</view>
			<view class="bindIc_Item_right">
				<input type="text" placeholder="请输入车牌号" v-model="carCode" />
			</view>
		</view>
		<view class="bindIc_Item">
			<view class="bindIc_Item_left">
				<image src="../../../static/carAdmin/carInfo/rfid.png"></image>
				<text>Rfid：</text>
			</view>
			<view class="bindIc_Item_right">
				<text>{{ rfid }}</text>
				<view @tap="readFridCard()">{{ readText }}</view>
			</view>
		</view>
		<!-- <view class="bindIc_Item">
			<view class="bindIc_Item_left">
				<image src="../../../static/carAdmin/carInfo/icCard.png"></image>
				<text>ic卡：</text>
			</view>
			<view class="bindIc_Item_right">
				<text>{{ icCard }}</text>
				<view>读取</view>
			</view>
		</view> -->
		<!-- <view class="icImgBox">
			<view class="icImgBox_Left">
				<image src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" mode="aspectFit"></image>
			</view>
			<view class="icImgBox_Right">
				进场时间:2019-05-11&nbsp;12:00:00
			</view>
		</view> -->
	</view>
</template>

<script>
	const UHF = uni.requireNativePlugin('UHF')
	import {
		getRfid,
		addRfid
	} from '@/api/bindIc.js'
	export default {
		data() {
			return {
				rfid: '请绑定rifd',
				carCode: '',
				postData: {},
				EPC: '',
				icCard: '请绑定icCard',
				readState: true,
				readText: '读卡',
				car_id: ''
			}
		},
		onLoad(params) {
			this.car_id = params.id
		},
		onBackPress() {
			UHF.powerOff()
		},
		methods: {
			readFridCard() {
				if (this.readState) {
					this.readState = false
					this.readText = '停止'
					uni.showLoading({
						title: '加载中...',
						mask: false
					})
					// 打开UHF
					UHF.uhfStart((result) => {
						if (result.message == '设备已打开！') {
							UHF.controlReadCard(resultChoose => {
								if (resultChoose.message == '开始存盘！') {
									let getResult = () => {
										UHF.uhfReturn(results => { //获取UHF返回参数
											if (results.getListMap.length >= 1) {
												this.EPC = results.getListMap[0].EPC
												this.getRfid()
											} else {
												getResult()
											}
										})
									}
									getResult()
								} else {
									uni.showToast({
										title: '设备未成功打开',
										icon: 'none',
										position: 'bottom',
										mask: false
									})
								}
							})
						} else {
							uni.showToast({
								title: '设备打开失败',
								icon: 'none',
								position: 'bottom',
								mask: false
							})
						}
						this.readState = true
						this.readText = '读卡'
					});
				} else {
					UHF.powerOff()
					uni.hideLoading()
					this.readState = true
					this.readText = '读卡'
				}
			},
			// 绑定rfid
			async addRfid() {
				try {
					this.$loading()
					if (this.carCode == '' && this.rfid == '请绑定rifd' && this.icCard == '请绑定icCard') {
						this.$toast('请填写所需信息')
					} else if (this.carCode != '' && !this.$ifCarCode(this.carCode)) {
						this.$toast('请正确填写车牌号')
					} else {
						let params = {
							carcode: this.carCode,
							rfid: this.rfid,
							decrfid: this.postData.decrfid,
							recordid: this.postData.recordid,
							carId: this.car_id
						}
						let resData = await addRfid(params)
						if (resData.code === 200) {
							UHF.writeCard({
								epc: this.EPC,
								accessPassword: '00000000', //访问密码  默认值为00000000
								membank: 1, //0：RESERVE ; 1:EPC  ;  2:TID  ,3 :USER  
								addr: 6, //starting address  起始地址  默认值为0   
								length: 2, //Length of data 长度  默认值为1
								writeData: String(this.rfid).substring(8) //写入的数据
							}, result => { //获取UHF返回参数
								if (result.message == '写入数据成功') {
									this.$toast(result.message)
								} else {
									this.$toast(result.message)
								}
								UHF.powerOff()
								uni.hideLoading()
							});
						} else {
							this.$toast(resData.message)
						}
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 获取rifd
			async getRfid() {
				try {
					let resData = await getRfid()
					if (resData.code === 200) {
						this.postData = resData.result
						this.rfid = resData.result.rfid
						uni.hideLoading()
					} else {
						uni.hideLoading()
						uni.showToast({
							title: resData.message,
							mask: false,
							position: 'bottom',
							icon: 'none'
						})
					}
				} catch (e) {
					uni.showToast({
						title: '网络错误',
						mask: false,
						position: 'bottom',
						icon: 'none'
					})
				}
			}
		},
		onNavigationBarButtonTap() {
			this.addRfid()
		}
	}
</script>

<style>
	#bindIc {
		width: 750upx;
	}

	.bindIc_Item {
		width: 100%;
		padding: 15upx 20upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		border-bottom: 1upx solid #E8E8E8;
	}

	.bindIc_Item_left {
		flex: 0.25;
		justify-content: flex-start;
		display: flex;
		align-items: center;
	}

	.bindIc_Item_left>image {
		width: 50upx;
		height: 50upx;
		margin-right: 15upx;
	}

	.bindIc_Item_right {
		flex: 0.75;
		justify-content: flex-end;
		color: #939393;
		display: flex;
		align-items: center;
	}

	.bindIc_Item_right>input {
		text-align: right;
	}

	.bindIc_Item_right>view {
		padding: 10upx 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border: 1upx solid #E8E8E8;
		border-radius: 15upx;
		margin-left: 20upx;
	}

	.icImgBox {
		width: 100%;
		padding: 30upx 40upx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		flex-flow: column;
	}

	.icImgBox_Left {
		flex: 0.5;
	}

	.icImgBox_Left>image {
		width: 100%;
	}

	.icImgBox_Right {
		flex: 0.5;
		font-size: 26upx;
	}
</style>
