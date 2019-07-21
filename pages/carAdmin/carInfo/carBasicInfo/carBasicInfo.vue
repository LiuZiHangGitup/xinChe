<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	#carInformation {
		width: 750upx;
		background-color: #E8E8E8;
	}

	.topFixed {
		position: fixed;
		z-index: 2;
		top: 150upx;
		left: 0upx;
		right: 0upx;
		display: flex;
		justify-content: space-between;
		padding: 0upx 20upx;
		box-sizing: border-box;
	}

	.topFixedLeft {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.goBack image {
		width: 40upx;
		height: 40upx;
	}

	.bianHao {
		height: 50upx;
		line-height: 50upx;
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 24upx;
		border-radius: 25upx;
		padding: 5upx 15upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}

	.fenxiang {
		height: 40upx;
		line-height: 40upx;
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 24upx;
		border-radius: 25upx;
		padding: 5upx 15upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
	swiper{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.carInfoTop,
	swiper,
	swiper-item,
	.swiper-item{
		width: 750upx;
		height: 540upx;
	}
	.swiperImg{
		height: 100% !important;
		width: 100% !important;
	}

	.carInfoBody {
		width: 750upx;
		padding: 20upx 30upx;
		background-color: #FFFFFF;
		/* margin-top: 10upx; */
		box-sizing: border-box;
		border-bottom: 1upx solid #E8E8E8;
	}

	.carInfoBodyTop {
		line-height: 50upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.top_right {
		border-radius: 10upx;
		width: 110upx;
		height: 50upx;
		color: #FFFFFF;
		background-color: #007AFF;
		display: flex;
		align-content: center;
		justify-content: center;
		font-size: 26upx;
	}

	.top_left {
		display: flex;
		justify-content: space-between;
	}

	.carInfoBodyTopLeft {
		display: inline-block;
		width: 124upx;
		text-align: center;
		background: #007AFF;
		color: #FFFFFF;
		height: 50upx;
		margin-right: 20upx;
		font-size: 26upx;
	}

	.carInfoBodyTopRight {
		font-size: 30upx;
		font-weight: bold;
	}

	.carInfoBodyBody {
		display: flex;
		justify-content: space-between;
		margin-top: 15upx;
		line-height: 50upx;
	}

	.carInfoBodyBodyLeft {
		font-size: 24upx;
	}

	.carInfoBodyBodyRight {
		font-size: 40upx;
		color: #108EE9;
	}

	.carInfoBodyFoot {
		color: #E8E8E8;
		font-size: 26upx;
	}

	.info {
		width: 750upx;
		background-color: #FFFFFF;
		/* margin-top: 10upx; */
		border-left: 1upx solid #E8E8E8;
		border-bottom: 1upx solid #E8E8E8;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
	}

	.infoChild {
		width: 33%;
		height: 130upx;
		box-sizing: border-box1;
		border-right: 1upx solid #E8E8E8;
		border-bottom: 1upx solid #E8E8E8;
		display: flex;
		align-items: center;
	}

	.infoChild-item {
		width: 100%;
		text-align: center;
		font-size: 28upx;
	}

	.infoChild-item text {
		display: block;
	}

	.infoChild-item text:last-child {
		margin-top: 10upx;
		color: #909399;
	}

	.more {
		width: 750upx;
		height: 70upx;
		line-height: 70upx;
		background: #FFFFFF;
		text-align: center;
		font-size: 30upx;
	}

	.foot {
		width: 750upx;
	}

	.footChild {
		width: 750upx;
		padding: 0upx 30upx;
		box-sizing: border-box;
		padding: 20upx 30upx;
		display: flex;
		align-items: center;

		background-color: #FFFFFF;
		font-size: 26upx;
	}

	.footChild:nth-child(1),
	.footChild:nth-child(3) {
		background-color: #E8E8E8;
	}

	.moreBg {
		width: 750upx;
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 2;
		transform: scaleY(0);
	}

	.moreData {
		transform: scaleY(0);
		transition: 0.3s all ease;
		width: 750upx;
		padding: 30upx 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap-reverse;
		background-color: #FFFFFF;
		z-index: 3;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
	}

	.more_data_item {
		width: 25%;
		height: 100upx;
		text-align: center;
		font-size: 26upx;
		margin-bottom: 30upx;
	}

	.more_data_item>image {
		height: 100%;
		width: 50%;
	}

	.moreShow {
		transform: scaleY(1);
	}
	.che_pai,.rfid{
		font-size: 26upx;
		color: #939393;
	}
	.che_pai>text:first-child{
		margin-right: 15upx;
	}
</style>
<template>
	<view id="carInformation">
		<view class="topFixed">
			<view class="topFixedLeft">
				<view class="bianHao">
					编号:{{ carData.vin }}
				</view>
			</view>
		</view>
		<view class="carInfoTop">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,index) in carData.coverUrl" :key="index">
					<view class="swiper-item">
						<image class="swiperImg" :src="item" :lazy-load="true" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="carInfoBody">
			<view class="carInfoBodyTop">
				<view class="top_left">
					<text class="carInfoBodyTopLeft">信车认证</text>
					<text class="carInfoBodyTopRight">{{ guoLv(carData.brandName) }}{{ guoLv(carData.name) }}</text>
				</view>
			</view>
			<view class="carInfoBodyBody">
				<text class="carInfoBodyBodyLeft">{{ guoLv(carData.licensedAt) }} | {{ guoLv(carData.mileage) }}万公里</text>
				<text class="carInfoBodyBodyRight">
					<block>￥{{ guoLv(carData.onlinePriceCents)=='未知'||guoLv(carData.onlinePriceCents)==''?'面议':guoLv(carData.onlinePriceCents)+'万' }}</block>
				</text>
			</view>
			<view class="carInfoBodyBody">
				<view class="che_pai"><text v-if="$guoLv(carData.currentPlateNumber) != '' ">车牌号: {{ $guoLv(carData.currentPlateNumber) }}</text><text v-if="$guoLv(carData.rFid) != ''">RFID: {{ $guoLv(carData.rFid) }}</text></view>
			</view>
			<view class="carInfoBodyBody">
				<view class="che_pai">VIN码: {{ $guoLv(carData.vin) }}</view>
			</view>
		</view>
		<view class="info">
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.exteriorColorName) }}</text>
					<text>外观颜色</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.interiorColor) }}</text>
					<text>内饰颜色</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.isRegularMaintenance) }}</text>
					<text>是否4s店保养</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.carType) }}</text>
					<text>车身类型</text>
				</view>
			</view>
			<!-- isTurboCharger -->
			<view class="infoChild">
				<view class="infoChild-item">
					<!-- {{ carData.isTurboCharger }} -->
					<text>{{ guoLv(carData.displacementStr) }}{{ guoLv(carData.isTurboCharger) }}</text>
					<text>排量</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.transmission) }}</text>
					<text>变速箱</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.fuelType) }}</text>
					<text>燃油类型</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.emissionStandard) }}</text>
					<text>排放标准</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.validateDate) }}</text>
					<text>年审到期日</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.forceInsuranceDate) }}</text>
					<text>交强险到期日</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.licensedAt) }}</text>
					<text>上牌时间</text>
				</view>
			</view>
			<view class="infoChild">
				<view class="infoChild-item">
					<text>{{ guoLv(carData.nature) }}</text>
					<text>使用性质</text>
				</view>
			</view>
		</view>
		<view class="more" @tap="goEndInfo()">
			更多参数配置信息&nbsp;&gt;
		</view>
		<view class="foot">
			<view class="footChild">卖点描述</view>
			<view class="footChild">{{ guoLv(carData.sellingPoint) }}</view>
			<view class="footChild">卖家信息</view>
			<view class="footChild">{{ carData.merchantName?'所属车商：'+carData.merchantName:'所属市场：'+carData.marketName }}</view>
			<view class="footChild">所在车市区域：{{ guoLv(carData.areaName) }}</view>
			<view class="footChild" @tap="$goPhone(carData.respoPhone)">卖家电话：{{ guoLv(carData.respoPhone) }}</view>
		</view>

		<!-- 更多功能 -->
		<view :class="[moreState?'moreShow':'','moreBg']" @touchmove.stop.prevent="noMove()" @tap="closeMore()"></view>
		<view :class="[moreState?'moreShow':'','moreData']">
			<view class="more_data_item" @tap="updateCar()">
				<image src="../../../../static/carAdmin/carInfo/writeCar.png" :lazy-load="true"></image>
				<view>
					编辑车辆
				</view>
			</view>
			<view class="more_data_item" @tap="$goWindow('../../bindIc/bindIc')">
				<image src="../../../../static/carAdmin/carInfo/bindCard.png" :lazy-load="true"></image>
				<view>
					车辆绑定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		get_cars_detail_info
	} from '@/api/carAdmin/carInfo.js'
	export default {
		data() {
			return {
				carData: {},
				moreState: false
			}
		},
		onNavigationBarButtonTap: function(e) {
			if (e.index == 1) {
				this.$goPhone(this.carData.respoPhone);
			} else {
				this.moreState = true;
			}
		},
		onLoad(options) {
			this.get_cars_detail_info(options.id);
		},
		methods: {
			closeMore() {
				this.moreState = false;
			},
			guoLv(data){
				if(data){
					return data
				}else{
					return '未知'
				}
			},
			// 滑动无效果
			noMove() {

			},
			// 进入修改车辆页面
			updateCar() {
				this.closeMore();
				this.$goWindow('../../addCar/addCar?carData=' + JSON.stringify(this.carData))
			},
			//加载好车详情
			async get_cars_detail_info(t) {
				let params = {
					"id": t
				};
				try {
					let resData = await get_cars_detail_info(params);
					if (resData.code === 200) {
						this.carData = resData.result;
						this.carData.isRegularMaintenance == 0 ? this.carData.isRegularMaintenance = '是' : this.carData.isRegularMaintenance = '否';
						this.carData.transmission == 'auto' ? this.carData.transmission = '自动' : this.carData.transmission = '手动';
						if (this.carData.fuelType == 'gasoline') {
							this.carData.fuelType = '汽油'
						} else if (this.carData.fuelType == 'diesel') {
							this.carData.fuelType = '柴油'
						} else if (this.carData.fuelType == 'electric') {
							this.carData.fuelType = '电动'
						} else if (this.carData.fuelType == 'hybrid') {
							this.carData.fuelType = '混合'
						} else if (this.carData.fuelType == 'other') {
							this.carData.fuelType = '其他'
						}
						if (this.carData.interiorColor == 'double') {
							this.carData.interiorColor = '双色'
						} else if (this.carData.interiorColor == 'cream') {
							this.carData.interiorColor = '米黄'
						} else if (this.carData.interiorColor == 'oyster_grey') {
							this.carData.interiorColor = '米灰'
						} else if (this.carData.interiorColor == 'red') {
							this.carData.interiorColor = '红色'
						} else if (this.carData.interiorColor == 'black') {
							this.carData.interiorColor = '黑色'
						} else if (this.carData.interiorColor == 'brown') {
							this.carData.interiorColor = '双色'
						} else if (this.carData.interiorColor == 'double') {
							this.carData.interiorColor = '棕色'
						} else if (this.carData.interiorColor == 'rgb(59, 250, 250)') {
							this.carData.interiorColor = '其他'
						}

						if (this.carData.emissionStandard == 'guo_1') {
							this.carData.emissionStandard = '国I'
						} else if (this.carData.emissionStandard == 'guo_2') {
							this.carData.emissionStandard = '国II'
						} else if (this.carData.emissionStandard == 'guo_3') {
							this.carData.emissionStandard = '国III'
						} else if (this.carData.emissionStandard == 'guo_4') {
							this.carData.emissionStandard = '国IV'
						} else if (this.carData.emissionStandard == 'guo_5') {
							this.carData.emissionStandard = '国V'
						} else if (this.carData.emissionStandard == 'eu_1') {
							this.carData.emissionStandard = '欧I'
						} else if (this.carData.emissionStandard == 'eu_2') {
							this.carData.emissionStandard = '欧II'
						} else if (this.carData.emissionStandard == 'eu_3') {
							this.carData.emissionStandard = '欧III'
						} else if (this.carData.emissionStandard == 'eu_4') {
							this.carData.emissionStandard = '欧IV'
						} else if (this.carData.emissionStandard == 'eu_5') {
							this.carData.emissionStandard = '欧V'
						}

						if (this.carData.carType == 'micro_car') {
							this.carData.carType = '微型车'
						} else if (this.carData.carType == 'small_car') {
							this.carData.carType = '小型车'
						} else if (this.carData.carType == 'compact_car') {
							this.carData.carType = '紧凑型'
						} else if (this.carData.carType == 'mid_size_car') {
							this.carData.carType = '中型车'
						} else if (this.carData.carType == 'mid_full_size_car') {
							this.carData.carType = '中大型'
						} else if (this.carData.carType == 'mpv') {
							this.carData.carType = 'MPV'
						} else if (this.carData.carType == 'suv') {
							this.carData.carType = 'SUV'
						} else if (this.carData.carType == 'sports_car') {
							this.carData.carType = '跑车'
						} else if (this.carData.carType == 'pickup_trucks') {
							this.carData.carType = '皮卡'
						} else if (this.carData.carType == 'small_van') {
							this.carData.carType = '微面'
						} else if (this.carData.carType == 'electrocar') {
							this.carData.carType = '电动车'
						} else if (this.carData.carType == 'ohter') {
							this.carData.carType = '其他'
						} else {
							this.carData.carType = '未选'
						}
						this.carData.isTurboCharger == 0 ? this.carData.isTurboCharger = 'T' : this.carData.isTurboCharger = 'L'
						this.carData.nature == 0 ? this.carData.nature = '营运' : this.carData.nature = '非营运'
						this.carData.coverUrl = this.carData.coverUrl.split(',')
					} else {
						this.$toast(resData.message)
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			goEndInfo() {
				this.$goWindow('../carMoreInfo/carMoreInfo?styleId=' + this.carData.styleId)
			},
			goBack() {
				uni.navigateBack({});
			}
		}
	}
</script>
