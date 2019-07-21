<style scoped>
	@import url("../../../common/css/fenXiang.css");

	/*顶部*/
	.top-info {
		position: relative;
	}

	.top-info image {
		width: 100%;
		height: 100%;
	}

	.top-info-img {
		width: 100%;
		height: 540upx;
	}

	swiper {
		height: 540upx;
	}

	swiper-item {
		height: 100%;
	}

	.swiper-item {
		height: 100%;
	}

	.swiper-item image {
		height: 100%;
	}

	/* 车辆图片底部 */
	.cars-info-box {
		margin-left: 15upx;
		font-size: 30upx;
		margin-top: 50upx;
	}

	.cars-info {
		display: flex;
		justify-content: space-between;
		padding: 25upx 20upx 25upx 20upx;
		border-bottom: 1upx solid #eee;
		align-items: center;
	}

	.cars-info view:nth-child(1) {
		color: #333;
		font-weight: 500;
	}

	.cars-info view:nth-child(2) {
		color: #999;
	}

	/*车辆信息*/
	.cars-info-detail {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 18upx 0 18upx 0;
	}

	.cars-info-detail-name {
		display: flex;
		align-items: center;
		width: 50%;
		justify-content: center;
	}

	.cars-info-detail-name view:nth-child(1) {
		color: #999;
		display: flex;
		justify-content: flex-end;
		width: 50%;
	}

	.cars-info-detail-name view:nth-child(2) {
		color: #333;
		display: flex;
		justify-content: flex-start;
		padding-left: 20upx;
		width: 50%;
	}

	.cars-info-detail-price {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cars-info-detail-price view:nth-child(1) {
		width: 50%;
		display: flex;
		justify-content: flex-end;
		color: #999;
	}

	.cars-info-detail-price view:nth-child(2) {
		width: 50%;
		padding-left: 10upx;
	}

	.cars-info-bottom-border {
		height: 1upx;
		width: 100%;
		background: #eee;
	}

	/* 车辆照片 */
	.cars-info-img {
		display: flex;
		padding: 25upx 20upx 25upx 20upx;
		border-bottom: 1upx solid #eee;
		flex-direction: column;
		justify-content: center;
	}

	.cars-info-img view:nth-child(1) {}

	.cars-info-img view:nth-child(2) {
		width: 160upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		margin-bottom: 80upx;
	}

	.cars-info-img view:nth-child(2) image {
		width: 100%;
		height: 100%;
		padding-top: 30upx;
	}

	.cars-info-beizhu {
		display: flex;
		padding: 25upx 20upx 25upx 20upx;
		border-bottom: 1upx solid #eee;
		flex-direction: column;
		justify-content: center;
	}

	.cars-info-beizhu view:nth-child(2) {
		color: #999;
		padding-top: 15upx;
	}

	.end {
		margin-bottom: 100upx !important;
	}

	/*底部拨打电话*/
	.cars-info-btn {
		position: fixed;
		bottom: 0;
		background: #4A90FF;
		width: 100%;
		color: white;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 33upx;
	}
</style>
<template>
	<view>
		<view class="top-info">
			<view class="top-info-img">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" indicator-color="#f3f3f3"
				 indicator-active-color="#4A90FF" autoplay="true" circular="true">
					<swiper-item v-for="(item,index) in img_list" :key="index">
						<view class="swiper-item">
							<image :src="item" :lazy-load="true" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="cars-info-box">
			<view class="cars-info">
				<view>车辆信息</view>
				<!-- <view>{{ $guoLv(good_car_info.updateTime) }}更新</view> -->
			</view>
			<view class="cars-info-detail">
				<view class="cars-info-detail-name">
					<view>车辆类型</view>
					<view>{{ good_car_info.state == 0?'新车':'二手车' }}</view>
				</view>
				<view class="cars-info-detail-price">
					<view>批发价</view>
					<view style="color:#C79410 ;">{{ $guoLv(good_car_info.carPrice) }}万</view>
				</view>
			</view>
			<view class="cars-info-detail">
				<view class="cars-info-detail-name">
					<view>颜色</view>
					<view>{{ $guoLv(good_car_info.carColor) }}</view>
				</view>
				<view class="cars-info-detail-price"></view>
			</view>
			<view class="cars-info-detail">
				<view class="cars-info-detail-name">
					<view>车源有效期</view>
					<view>2019/06/13</view>
				</view>
				<view class="cars-info-detail-price">
					<view>车源所在地</view>
					<view>{{ $guoLv(good_car_info.city) }}</view>
				</view>
			</view>
			<view class="cars-info-detail">
				<view class="cars-info-detail-name">
					<view>手续</view>
					<view v-if="good_car_info.procedures == 0">有</view>
					<view v-if="good_car_info.procedures == 1">没有</view>
				</view>
				<view class="cars-info-detail-price"></view>
			</view>
			<view class="cars-info-bottom-border"></view>
			<view class="cars-info-beizhu">
				<view>备注</view>
				<view v-if="good_car_info.remark || good_car_info.remark == ''">{{ $guoLv(good_car_info.remark) }}</view>
			</view>
			<view class="cars-info-beizhu end" @tap="$goPhone(good_car_info.contactPhone)">
				<view>联系方式：{{ good_car_info.contactPhone }}</view>
			</view>
		</view>
		<view class="cars-info-btn" v-if="good_car_info.isYd == 1" @tap="yu_ding()">预定</view>
		<view class="cars-info-btn" v-else>已预定</view>
		<share frind="../../../static/share/frind.png" frind_circle="../../../static/share/frind_circle.png"
		 @update_share_show="get_update_share_show" :if_show_share="if_show_share" share_url="pages/goodCarDetail/goodCarDetail"
		 :car_id="car_id" car_title="特价好车" :car_summary="good_car_info.carTitle" :img_url="img_list[0]"></share>
	</view>
</template>

<script>
	import {
		get_good_car_detail,
		yu_ding
	} from "@/api/goodCar.js"
	export default {
		data() {
			return {
				car_id: '',
				good_car_info: '',
				img_list: [],
				if_show_share: false
			}
		},
		onLoad(options) {
			this.get_good_car_info(options.id);
			this.car_id = options.id;
		},
		onNavigationBarButtonTap() {
			this.if_show_share = !this.if_show_share;
		},
		methods: {
			get_update_share_show(data) {
				this.if_show_share = data
			},
			fenXiang(index) {
				let scene = 'WXSenceTimeline'
				if (index == 2) {
					scene = 'WXSceneSession'
				}
				this.if_show_share = !this.if_show_share;
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: 'http://wshop.xczlbox.com/#/pages/goodCarDetail/goodCarDetail?id=' + this.car_id,
					title: "特价好车",
					summary: this.good_car_info.carTitle,
					imageUrl: this.img_list[0]
				});
			},
			yu_ding() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '您确定要预定此车辆？',
					success: function(res) {
						if (res.confirm) {
							_this.sure_yu_ding();
						} else if (res.cancel) {
							_this.$toast('您已取消预定。')
						}
					}
				});
			},
			async sure_yu_ding() {
				let params = {
					id: this.car_id
				}
				try {
					let resData = await yu_ding(params)
					if (resData.code === 200) {
						this.$toast('预定成功,耐心等待客服联系。')
						this.get_good_car_info(this.car_id)
					} else {
						this.$toast(resData.message)
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 加载好车详情
			async get_good_car_info(t) {
				try {
					let params = {
						id: t
					};
					let resData = await get_good_car_detail(params);
					if (resData.code === 200) {
						this.good_car_info = resData.result;
						//字符串转换为数组
						this.img_list = resData.result.carImg.split(',');
					} else {
						this.$toast(resData.message);
					}
				} catch (e) {
					this.$toast('网络错误');
				}
			},
			//预览图片
			look_img_detail() {
				return;
				// var imgLists = this.img_list; //获取data-list
				// var index = 0;
				// //图片预览
				// uni.previewImage({
				// 	current: imgLists[index], // 当前显示图片的http链接
				// 	urls:imgLists,// 需要预览的图片http链接列表
				// 	indicator: "number",
				// 	loop: true
				// })
			},
		}
	}
</script>
