<style scoped>
	#car_list {
		width: 750upx;
	}

	.car_list_top {
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		background-color: #FFFFFF;
	}

	.car_list_top_top {
		width: 750upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid #E8E8E8;
		box-sizing: border-box;
	}

	.car_list_top_top_item {
		flex: 0.5;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		padding: 20upx 0upx;
		box-sizing: border-box;
	}

	.car_list_top_top_item_active {
		background-color: #108EE9;
		color: #FFFFFF;
	}

	.car_list_center {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1upx solid #E8E8E8;
	}

	.car_list_center_item {
		max-width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15upx 0upx;
		box-sizing: border-box;
		font-size: 26upx;
	}

	.car_list_center_item>image {
		transition: 0.3s all ease;
		width: 15upx;
		height: 13upx;
		margin-left: 10upx;
	}

	.car_list_center_image {
		transform: rotate(180deg);
	}

	.car_list_bottom_bg {
		position: fixed;
		top: 146upx;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.car_list_bottom {
		position: fixed;
		top: 146upx;
		left: 0upx;
		right: 0upx;
		width: 750upx;
		background-color: #FFFFFF;
		transition: 0.3s all ease;
		transform: scaleY(0);
	}

	.car_list_bottom_show {
		transform: scaleY(1);
	}

	.car_list_bottom_item {
		padding: 10upx 0upx;
		font-size: 26upx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1upx solid #E8E8E8;
	}

	.car_list_bottom_item_active {
		color: #108EE9;
	}

	.car_list_body {
		width: 750upx;
		margin-top: 146upx;
	}

	.car_list_body_item {
		padding: 15upx 20upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #E8E8E8;
		display: flex;
		justify-content: space-between;
	}

	.car_list_body_item_left {
		flex: 0.4;
		height: 200upx;
	}

	.car_list_body_item_left>image {
		width: 100%;
		height: 100%;
		border-radius: 25upx;
	}

	.car_list_body_item_right {
		flex: 0.6;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		margin-left: 25upx;
	}

	.car_list_body_item_right_title {
		font-size: 30upx;
		font-weight: bold;
	}

	.car_list_body_item_right_address {
		color: #939393;
		font-size: 26upx;
	}

	.car_list_body_item_right_price {
		color: #108EE9;
		font-size: 28upx;
	}
</style>

<template>
	<view id="car_list">
		<view class="car_list_top">
			<!-- 新车二手车 -->
			<view class="car_list_top_top">
				<view :class="[car_title_index == index?'car_list_top_top_item_active':'','car_list_top_top_item']" v-for="(item,index) in car_title"
				 :key="index" @tap="change_top_title(index)">{{ item }}</view>
			</view>
			<!-- 筛选 -->
			<view class="car_list_center">
				<view class="car_list_center_item" v-for="(item,index) in car_center" :key="index" @tap="change_top_center(index)">
					{{ item }}
					<image :class="car_center_index == index?'car_list_center_image':''" src="../../../static/common/jianTou.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 背景颜色 -->
			<view class="car_list_bottom_bg" @touchmove.stop.prevent="noMove()" @tap="change_top_center(car_center_index)" v-if="car_center_index != '='"></view>
			<!-- 来源 -->
			<view :class="[car_center_index == (car_center.length == 4?0:4)?'car_list_bottom_show':'','car_list_bottom']">
				<view :class="[from_index == index?'car_list_bottom_item_active':'','car_list_bottom_item']" v-for="(item,index) in from_list"
				 :key="index" @tap="change_from_index(index,car_center_index)">{{ item }}</view>
			</view>
			<!-- 价格 -->
			<view :class="[car_center_index == (car_center.length == 4?2:1)?'car_list_bottom_show':'','car_list_bottom']">
				<view :class="[price_index == index?'car_list_bottom_item_active':'','car_list_bottom_item']" v-for="(item,index) in price_list"
				 :key="index" @tap="change_price_index(index,car_center_index)">{{ item }}</view>
			</view>
			<!-- 排序 -->
			<view :class="[car_center_index == (car_center.length == 4?3:2)?'car_list_bottom_show':'','car_list_bottom']">
				<view :class="[sort_index == index?'car_list_bottom_item_active':'','car_list_bottom_item']" v-for="(item,index) in sort_list"
				 :key="index" @tap="change_sort_index(index,car_center_index)">{{ item }}</view>
			</view>
		</view>
		<view class="car_list_body">
			<view class="car_list_body_item" v-for="(item,index) in car_list" :key="index" @tap="$goWindow('../carInfo/carInfo?id='+item.id)">
				<view class="car_list_body_item_left">
					<image :src="item.carImg[0]" mode="aspectFill"></image>
				</view>
				<view class="car_list_body_item_right">
					<text class="car_list_body_item_right_title">{{item.carTitle}}</text>
					<text class="car_list_body_item_right_address">{{item.city}}</text>
					<text class="car_list_body_item_right_price">{{ $guoLv(item.carPrice) }}万</text>
				</view>
			</view>
		</view>
		<page-end :ifHaveData="if_have_car"></page-end>
	</view>
</template>

<script>
	let old_car_title_index = 0,
		old_car_center_index = 0,
		old_price_index = 0,
		old_sort_index = 0,
		old_from_index = 0
	import {
		getGoodCar
	} from '@/api/goodCar.js'
	export default {
		data() {
			return {
				car_title: ['新车', '二手车'],
				car_title_index: 0,
				car_center: ['品牌车型', '价格', '排序'],
				car_center_index: '=',
				price_index: 0,
				price_list: ['全部价格', '3万及以下', '3-5万', '5-8万', '8-10万', '10-15万', '15-30万', '30-50万', '50-100万', '100万及以上'],
				sort_list: ['价格最低', '价格最高'],
				from_list: ['全部来源', '批发车源', '好友车源', '车行认证', '个人车源', '拍卖车源'],
				from_index: 0,
				sort_index: 0,
				car_list: [],
				getGoodCarData: {
					"audiId": "",
					"carPrice": null,
					"pageNum": 1,
					"paixu": "2",
					"pageSize": 10,
					"state": "0",
					"brandName": "",
					"dataSources": ''
				},
				if_have_car: '上划加载'
			}
		},
		onShow() {
			this.get_car_list()
		},
		methods: {
			// 滑动无效
			noMove(){},
			// 修改新车二手车
			change_top_title(index) {
				if (index != old_car_title_index) {
					this.car_title_index = index;
					old_car_title_index = index;
					this.getGoodCarData.state = String(index)
					if (index == 1 && this.car_center.length != 4) {
						this.car_center.unshift('来源')
					} else if (index == 0) {
						this.car_center.shift()
						this.getGoodCarData.dataSources = ''
						this.from_index = 0
						old_from_index = 0
					}
					this.get_good_cars()
					this.change_top_center('=')
				}
			},
			// 修改筛选
			change_top_center(index) {
				if (index == (this.car_center.length == 4 ? 1 : 0)) {
					this.$goWindow('../../common/carBrand/carBrand?state=1&ifGoodCar=true')
					this.car_center_index = '='
					old_car_center_index = '='
				} else {
					if (index != old_car_center_index) {
						this.car_center_index = index
						old_car_center_index = index
					} else {
						this.car_center_index = '='
						old_car_center_index = '='
					}
				}
			},
			// 修改来源
			change_from_index(index, center_index) {
				if (old_from_index != index) {
					this.from_index = index
					old_from_index = index
					this.getGoodCarData.dataSources = index - 1
					if (index == 0) {
						this.getGoodCarData.dataSources = ''
					}
					this.get_good_cars()
				}
				this.change_top_center(center_index)
			},
			// 修改价格
			change_price_index(index, center_index) {
				if (old_price_index != index) {
					this.price_index = index
					old_price_index = index
					this.getGoodCarData.carPrice = String(index - 1)
					if (index == 0) {
						this.getGoodCarData.carPrice = ''
					}
					this.get_good_cars()
				}
				this.change_top_center(center_index)
			},
			// 修改排序
			change_sort_index(index, center_index) {
				if (old_sort_index != index) {
					this.sort_index = index
					old_sort_index = index
					this.change_top_center(center_index)
					this.getGoodCarData.paixu = String(index + 1)
					this.get_good_cars()
				}
			},
			get_good_cars() {
				this.getGoodCarData.pageNum = 1
				this.if_have_car = '正在加载...'
				this.get_car_list()
			},
			// 获取好车
			async get_car_list() {
				try {
					if (this.if_have_car != '已经是全部数据了') {
						this.$loading()
						this.if_have_car = '正在加载...'
						let resData = await getGoodCar(this.getGoodCarData)
						if (resData.code === 200) {
							let bianLi = (val) => {
								val.carImg = val.carImg.split(',')
							}
							resData.result.list.forEach(bianLi)
							if (this.getGoodCarData.pageNum == 1) {
								this.car_list = resData.result.list
							} else {
								this.car_list = this.car_list.concat(resData.result.list)
							}
							this.if_have_car = '上划加载'
							if (!resData.result.hasNextPage) {
								this.if_have_car = '已经是全部数据了'
							}
							uni.hideLoading()
						} else {
							this.$toast(resData.message)
						}
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			}
		},
		// 上滑加载特价好车列表
		onReachBottom() {
			this.getGoodCarData.pageNum++
			this.get_car_list()
		}
	}
</script>
