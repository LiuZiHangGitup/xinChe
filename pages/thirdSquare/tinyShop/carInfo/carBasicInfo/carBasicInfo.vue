<style>
	#carDetail {
		padding-bottom: 100upx;
	}

	.car_img_list {
		width: 100%;
		height: 100%;
	}

	.car_img_list swiper {
		width: 100%;
		height: 540upx;
	}

	.swiper-item image {
		width: 100%;
		height: 540upx;
	}

	/* 信车认证 */
	.cars_title {
		font-size: 28upx;
		display: flex;
		flex-direction: column;
		padding: 20upx;
		box-sizing: border-box;
		border-bottom: 10upx solid #eee;
	}

	.car_title_btn {
		background: #007AFF;
		padding: 10upx 5upx 10upx 5upx;
		box-sizing: border-box;
		border-radius: 5upx;
		color: white;
		width: 120upx;
		font-size: 25upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cars_title_detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10upx;
	}

	.cars_title_detail view:nth-child(2) {
		color: #108EE9 !important;
		font-size: 40upx;
	}

	/* 车辆详细信息 */
	.car_info_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		font-size: 30upx;
		justify-content: center;
	}

	.car_info_item {
		width: 32.5%;
		height: 170upx;
		border-right: 1upx solid #eee;
		border-bottom: 1upx solid #eee;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.car_info_item view:nth-child(2) {
		color: #999;
	}

	.car_info_more_info {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		height: 70upx;
		color: #666;
	}

	.car_info_more_info view:nth-child(2) {
		display: flex;
		align-items: center;
	}

	.car_info_more_info view:nth-child(2) image {
		width: 30upx;
		height: 30upx;
	}

	/* 卖点描述 */
	.sell_info {
		font-size: 28upx;
	}

	.sell_info_title {
		background: #E8E8E8;
		width: 100%;
		padding: 10upx 0 10upx 20upx;
		box-sizing: border-box;
	}

	.sell_info_detail {
		padding: 20upx;
		box-sizing: border-box;
		letter-spacing: 5upx;
		line-height: 40upx;
		color: #666;
	}

	.sell_end {
		width: 750upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		height: 100upx;
	}

	.sell_end>view {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
	}

	.carList {
		min-width: 250upx;
		background-color: #108EE9;
		color: #FFFFFF;
	}

	.callCheShang {
		flex: 1;
		background-color: #21BFFF;
		color: #FFFFFF;
	}
</style>
<template>
	<view id="carDetail">
		<!-- swiper列表-->
		<view class="car_img_list">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,index) in car_detail_info.coverUrl" :key="index">
					<view class="swiper-item">
						<image class="swiperImg" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!--信车认证-->
		<view class="cars_title">
			<view class="car_title_btn">信车认证</view>
			<view class="cars_title_detail">
				<view>{{ car_detail_info.createdAt }}|{{ car_detail_info.mileageInFact }}万公里</view>
				<view>零售价：{{car_detail_info.onlinePriceCents}}万</view>
			</view>
		</view>
		<!--车辆详情-->
		<view class="car_info_list">
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.exteriorColorName) }}</view>
				<view>外观颜色</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.interiorColor) }}</view>
				<view>内饰颜色</view>
			</view>
			<view class="car_info_item">
				<block>
					<view>{{ $guoLv(car_detail_info.isRegularMaintenance) }}</view>
				</block>
				<view>是否4S店保养</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.carType) }}</view>
				<view>车身来源</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.displacementStr) }} {{ $guoLv(car_detail_info.isTurboCharger) }}</view>
				<view>排量</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.transmission) }}</view>
				<view>变速箱</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.fuelType) }}</view>
				<view>燃油类型</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.emissionStandard) }}</view>
				<view>排放标准</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.validateDate) }}</view>
				<view>年审到期日</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.forceInsuranceDate) }}</view>
				<view>交强险到期日</view>
			</view>
			<view class="car_info_item">
				<view>{{ $guoLv(car_detail_info.licensedAt) }}</view>
				<view>上牌时间</view>
			</view>
			<view class="car_info_item">
				<block>
					<view>{{ $guoLv(car_detail_info.nature) }}</view>
				</block>
				<view>使用性质</view>
			</view>
		</view>
		<view class="car_info_more_info" @tap="look_more_car_info">
			<view>查看更多</view>
			<view>
				<image mode="aspectFill" src="../../static/more.png"></image>
			</view>
		</view>
		<!-- 卖点描述-->
		<view class="sell_info">
			<view class="sell_info_title">
				卖点描述
			</view>
			<view class="sell_info_detail">{{ $guoLv(car_detail_info.sellingPoint) }}</view>
		</view>
		<view class="sell_info">
			<view class="sell_info_title">
				卖家信息
			</view>
			<view class="sell_info_detail">
				<view>所在车市区域：{{ $guoLv(car_detail_info.marketName) }}</view>
				<view>卖家电话：{{ $guoLv(car_detail_info.respoPhone) }}</view>
			</view>
		</view>
		<!-- 跳转首页联系车商 -->
		<view class="sell_end">
			<!-- #ifdef H5 -->
			<view class="carList">首页</view>
			<!-- #endif -->
			<view class="callCheShang" @tap="callCheShang(car_detail_info.respoPhone)">联系车商</view>
		</view>
		<share frind="../../../../../static/share/frind.png" frind_circle="../../../../../static/share/frind_circle.png"
		 @update_share_show="get_update_share_show" :if_show_share="if_show_share" share_url="pages/carDetail/carDetail"
		 :car_id="id" :userId="userId" :car_title="car_detail_info.brandName" :car_summary="car_detail_info.styleName" :img_url="car_detail_info.coverUrl[0]"></share>
	</view>
</template>
<script>
	import {
		get_cars_detail_info
	} from '@/api/share.js'
	export default {
		data() {
			return {
				if_show_share: false,
				car_detail_info: {},
				id: 0,
				userId: uni.getStorageSync('userId')
			}
		},
		onLoad(params) {
			this.id = params.id
			this.get_car_info_detail(this.id);
		},
		onNavigationBarButtonTap() {
			this.if_show_share = !this.if_show_share;
		},
		methods: {
			get_update_share_show(data) {
				this.if_show_share = data
			},
			callCheShang(phone) {
				this.$goPhone(phone)
			},
			// 加载车辆详情
			async get_car_info_detail(t) {
				let params = {
					id: t
				};
				let resData = await get_cars_detail_info(params);
				try {
					this.car_detail_info = resData.result;
					this.car_detail_info.createdAt = this.car_detail_info.createdAt.substring(0, 10);
					this.car_detail_info.isRegularMaintenance == 0 ? this.car_detail_info.isRegularMaintenance = '是' : this.car_detail_info
						.isRegularMaintenance = '否';
					this.car_detail_info.transmission == 'auto' ? this.car_detail_info.transmission = '自动' : this.car_detail_info.transmission =
						'手动';
					if (this.car_detail_info.fuelType == 'gasoline') {
						this.car_detail_info.fuelType = '汽油'
					} else if (this.car_detail_info.fuelType == 'diesel') {
						this.car_detail_info.fuelType = '柴油'
					} else if (this.car_detail_info.fuelType == 'electric') {
						this.car_detail_info.fuelType = '电动'
					} else if (this.car_detail_info.fuelType == 'hybrid') {
						this.car_detail_info.fuelType = '混合'
					} else if (this.car_detail_info.fuelType == 'other') {
						this.car_detail_info.fuelType = '其他'
					}
					if (this.car_detail_info.interiorColor == 'double') {
						this.car_detail_info.interiorColor = '双色'
					} else if (this.car_detail_info.interiorColor == 'cream') {
						this.car_detail_info.interiorColor = '米黄'
					} else if (this.car_detail_info.interiorColor == 'oyster_grey') {
						this.car_detail_info.interiorColor = '米灰'
					} else if (this.car_detail_info.interiorColor == 'red') {
						this.car_detail_info.interiorColor = '红色'
					} else if (this.car_detail_info.interiorColor == 'black') {
						this.car_detail_info.interiorColor = '黑色'
					} else if (this.car_detail_info.interiorColor == 'brown') {
						this.car_detail_info.interiorColor = '双色'
					} else if (this.car_detail_info.interiorColor == 'double') {
						this.car_detail_info.interiorColor = '棕色'
					} else if (this.car_detail_info.interiorColor == 'rgb(59, 250, 250)') {
						this.car_detail_info.interiorColor = '其他'
					}

					if (this.car_detail_info.emissionStandard == 'guo_1') {
						this.car_detail_info.emissionStandard = '国I'
					} else if (this.car_detail_info.emissionStandard == 'guo_2') {
						this.car_detail_info.emissionStandard = '国II'
					} else if (this.car_detail_info.emissionStandard == 'guo_3') {
						this.car_detail_info.emissionStandard = '国III'
					} else if (this.car_detail_info.emissionStandard == 'guo_4') {
						this.car_detail_info.emissionStandard = '国IV'
					} else if (this.car_detail_info.emissionStandard == 'guo_5') {
						this.car_detail_info.emissionStandard = '国V'
					} else if (this.car_detail_info.emissionStandard == 'eu_1') {
						this.car_detail_info.emissionStandard = '欧I'
					} else if (this.car_detail_info.emissionStandard == 'eu_2') {
						this.car_detail_info.emissionStandard = '欧II'
					} else if (this.car_detail_info.emissionStandard == 'eu_3') {
						this.car_detail_info.emissionStandard = '欧III'
					} else if (this.car_detail_info.emissionStandard == 'eu_4') {
						this.car_detail_info.emissionStandard = '欧IV'
					} else if (this.car_detail_info.emissionStandard == 'eu_5') {
						this.car_detail_info.emissionStandard = '欧V'
					}

					if (this.car_detail_info.carType == 'micro_car') {
						this.car_detail_info.carType = '微型车'
					} else if (this.car_detail_info.carType == 'small_car') {
						this.car_detail_info.carType = '小型车'
					} else if (this.car_detail_info.carType == 'compact_car') {
						this.car_detail_info.carType = '紧凑型'
					} else if (this.car_detail_info.carType == 'mid_size_car') {
						this.car_detail_info.carType = '中型车'
					} else if (this.car_detail_info.carType == 'mid_full_size_car') {
						this.car_detail_info.carType = '中大型'
					} else if (this.car_detail_info.carType == 'mpv') {
						this.car_detail_info.carType = 'MPV'
					} else if (this.car_detail_info.carType == 'suv') {
						this.car_detail_info.carType = 'SUV'
					} else if (this.car_detail_info.carType == 'sports_car') {
						this.car_detail_info.carType = '跑车'
					} else if (this.car_detail_info.carType == 'pickup_trucks') {
						this.car_detail_info.carType = '皮卡'
					} else if (this.car_detail_info.carType == 'small_van') {
						this.car_detail_info.carType = '微面'
					} else if (this.car_detail_info.carType == 'electrocar') {
						this.car_detail_info.carType = '电动车'
					} else if (this.car_detail_info.carType == 'ohter') {
						this.car_detail_info.carType = '其他'
					}

					this.car_detail_info.isTurboCharger == 0 ? this.car_detail_info.isTurboCharger = 'T' : this.car_detail_info.isTurboCharger =
						'L'

					this.car_detail_info.nature == 0 ? this.car_detail_info.nature = '营运' : this.car_detail_info.nature = '非营运'
					this.car_detail_info.coverUrl = this.car_detail_info.coverUrl.split(',')
				} catch (e) {
					this.$toast('请求失败');
				}
			},
			// 查看更多
			look_more_car_info() {
				this.$goWindow('../carMoreInfo/carMoreInfo?styleId=' + this.car_detail_info.styleId)
			}
		}
	}
</script>
