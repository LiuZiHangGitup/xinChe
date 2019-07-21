<style scoped>
	#me{
		margin: 0;
		padding: 0;
		width: 750upx;
		background: #f3f3f3;
		padding-top: 20upx;
		box-sizing: border-box;
	}
	.meTop{
		width: 610upx;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: 20upx;
		height: 130upx;
		padding: 50upx;
		font-size: 30upx;
	}
	.meTopLeft{
		display: flex;
		line-height: 130upx;
		float: left;
	}
	.meTopLeft image{
		width: 130upx;
		height: 130upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.meTopRight{
		float: right;
	}
	.meTopRight text:first-child{
		font-weight: bold;
		color: #606266 !important;
	}
	.meTopRight text{
		color: #909399;
	}
	.meTopSecond{
		width: 670upx;
		margin: 20upx auto;
		background-color: #FFFFFF;
		height: 50upx;
		padding: 20upx 20upx;
		font-size: 30upx;
	}
	.meTopSecondLeft{
		float: left;
		line-height: 50upx;
	}
	.meTopSecondLeft image{
		width: 30upx;
		height: 30upx;
		margin-right: 20upx;
	}
	.meTopSecondRight{
		line-height: 50upx;
		color: #909399;
		float: right;
	}
	.meBody{
		width: 670upx;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: 20upx;
		padding: 0upx 20upx;
		font-size: 30upx;
	}
	.meBody{
		width: 670upx;
		padding: 0upx 20upx;
		background: #FFFFFF;
	}
	.meBody:last-child{
		margin-top: 20upx;
	}
	.meBodyChild{
		width: 670upx;
		border-bottom: 1upx solid #E8E8E8;
		font-size: 30upx;
		padding: 25upx 10upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.meBodyChild:last-child{
		border: none !important;
	}
	.meBodyChildLeft image{
		width: 30upx;
		height: 30upx;
		margin-right: 20upx;
	}
	.meBodyChildRight{
		color: #909399;
	}
	.goOut{
		width: 700upx;
		margin: 30upx auto;
	}
</style>

<template>
	<view id="me">
		<view class="meTop">
			<view class="meTopLeft">
				<image src="../../../static/common/user_pic.png"></image>
				<text>{{ $guoLv(userData.username) }}</text>
			</view>
			<view class="meTopRight">
				<text>{{ $guoLv(userData.score) }}</text><br>
				<text>信用</text><br>
				<text>评测</text>
			</view>
		</view>
		<view class="meTopSecond" v-if="$qx('userInfo')">
			<view class="meTopSecondLeft" @tap="$goWindow('../myMsg/myMsg')">
				<image src="../../../static/me/meInfo/market.png"></image>
				<text>我的消息</text>
			</view>
			<view class="meTopSecondRight"></view>
		</view>
		<!-- 车商用户 -->
		<view class="meBody" v-if="qx == 'merchan'">
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/solid-shop-name.png"></image>
					<text>店铺名称</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.name) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/phone.png"></image>
					<text>店铺电话</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.merchantPhone) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/market.png"></image>
					<text>所属市场</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.marketName) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/address.png"></image>
					<text>店铺地址</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.merchantAddress) }}
				</view>
			</view>
		</view>
		<view class="meBody" v-if="qx == 'merchan'">
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/more_geren.png"></image>
					<text>注册地址</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.merchantRegister) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/license.png"></image>
					<text>营业执照号码</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.licenseCode) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/phoneFaRen.png"></image>
					<text>法人电话</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.respoPhone) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/name.png"></image>
					<text>法人代表姓名</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(merchanInfo.respoName) }}
				</view>
			</view>
		</view>
		<!-- 车市用户 -->
		<view class="meBody" v-if="qx == 'market' || qx == 'admine'">
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/solid-shop-name.png"></image>
					<text>市场名称</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.marketName) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/phone.png"></image>
					<text>服务电话</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.marketPhone) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/svg_introduction.png"></image>
					<text>市场面积</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.marketArea) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/license.png"></image>
					<text>市场车位数</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.marketNum) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/market.png"></image>
					<text>所属地域</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.province) }} {{ $guoLv(marketInfo.city) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/name.png"></image>
					<text>负责人名称</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.respoName) }}
				</view>
			</view>
			<view class="meBodyChild">
				<view class="meBodyChildLeft">
					<image src="../../../static/me/meInfo/phoneFaRen.png"></image>
					<text>负责人联系方式</text>
				</view>
				<view class="meBodyChildRight">
					{{ $guoLv(marketInfo.respoPhone) }}
				</view>
			</view>
		</view>
		<view class="goOut">
			<button type="primary" @tap="goOutLogin()">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		getMeInfo,
		marketSelectMarket,
		merchantSelectMerchant
	} from '@/api/me.js'
	export default {
		data() {
			return {
				userData: {},
				qx: uni.getStorageSync('qx'),
				marketInfo: {},
				merchanInfo: {}
			}
		},
		onLoad() {
			this.getUserInformation();
			if (this.qx != 'merchan') {
				this.marketSelectMarket();
			} else {
				this.merchantSelectMerchant();
			}
		},
		methods: {
			// 查询车商信息
			async merchantSelectMerchant() {
				try {
					let resData = await merchantSelectMerchant()
					if (resData.code === 200) {
						this.merchanInfo = resData.result
					} else {
						this.$toast(resData.message)
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 查询车市信息
			async marketSelectMarket() {
				try {
					let resData = await marketSelectMarket()
					if (resData.code === 200) {
						this.marketInfo = resData.result[0]
					} else {
						this.$toast(resData.message)
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 查询用户个人信息
			async getUserInformation() {
				try {
					let resData = await getMeInfo();
					if (resData.code === 200) {
						this.userData = resData.result;
					} else {
						this.$toast(resData.message);
					}
				} catch (e) {
					// this.$toast('请求失败');
				}
			},
			// 退出登录
			goOutLogin() {
				uni.clearStorage();
				uni.reLaunch({
					url: '../../index/login/login'
				})
			}
		}
	}
</script>

<style>

</style>
