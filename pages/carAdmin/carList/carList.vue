<style scoped>
	#vehicleSource {
		width: 750upx;
		background-color: #f3f3f3;
	}
	
	.vehicleSourceBody {
		width: 750upx;
	}
	
	.top_select_list {
		display: flex;
		width: 100%;
		align-items: center;
		flex-wrap: nowrap;
		font-size: 25upx;
		background: white;
		justify-content: space-between;
		position: fixed;
		top: 0upx;
		border-bottom: 1upx solid #eee;
		z-index: 10;
	}
	
	.top_select_item {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20upx 0 20upx 0;
	}
	
	.top_select_item view:nth-child(2) {
		width: 20upx;
		height: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.top_select_item view:nth-child(2) image {
		width: 100%;
		height: 60%;
		padding-left: 5upx;
	}
	
	/* 车辆管理列表 */
	.cars_list {
		width: 100%;
		font-size: 30upx;
		background: white;
		margin-top: 72upx;
	}
	
	.cars_item {
		display: flex;
		padding: 20upx;
	}
	
	.cars_item_img {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45%;
		height: 200upx;
	}
	
	.cars_item_img image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
	
	.cars_item_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10upx;
		width: 50%;
	}
	
	.cars_item_content {
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		justify-content: space-between;
		font-size: 26upx;
		align-items: center;
	}
	
	.cars_item_right_bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #108EE9;
	}
	
	.cars_item_btn {
		color: white;
		background-color: rgb(64, 158, 255) !important;
		padding: 8upx 25upx 8upx 25upx;
		border-radius: 10upx;
		font-size: 25upx;
		position: relative;
	}
	
	.cars_item_btn_box {
		position: absolute;
		width: 100%;
		left: 0upx;
		height: 150upx;
		transition: 0.3s all ease;
		transform: scaleY(0);
	}
	
	.cars_item_btn_box>view {
		width: 100%;
		height: 50upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		color: #000000;
		border-bottom: 1upx solid #E8E8E8;
		box-sizing: border-box;
		border: 1upx solid #E8E8E8;
		border-top: none;
	}
	
	.cars_item_btn_box_choose {
		transform: scaleY(1);
	}
</style>

<template>
	<view id="vehicleSource">
		<view class="top_select_list">
			<view class="top_select_item" @tap="$goWindow('../paiXu/paiXu')">
				<view>{{ paiXu }}</view>
				<view>
					<image mode="aspectFill" :lazy-load="true" src="../../static/jianTou.png"></image>
				</view>
			</view>
			<view class="top_select_item" @tap="$goWindow('../../common/carBrand/carBrand?state=1')">
				<view>品牌</view>
				<view>
					<image mode="aspectFill" :lazy-load="true" src="../../static/jianTou.png"></image>
				</view>
			</view>
			<view class="top_select_item" @tap="$goWindow('../carPrice/carPrice')">
				<view>价格</view>
				<view>
					<image mode="aspectFill" :lazy-load="true" src="../../static/jianTou.png"></image>
				</view>
			</view>
			<view class="top_select_item" @tap="$goWindow('../carState/carState')">
				<view>{{ carState }}</view>
				<view>
					<image mode="aspectFill" :lazy-load="true" src="../../static/jianTou.png"></image>
				</view>
			</view>
		</view>
		<view class="cars_list">
			<view class="cars_item" v-for="(item,index) in carList" :key="index" @tap="goInfo(index,item.id)">
				<view class="cars_item_img">
					<image mode="aspectFill" :lazy-load="true" :src="item.coverUrl[0]"></image>
				</view>
				<view class="cars_item_right">
					<view>{{item.brandName + item.styleName}}</view>
					<view class="cars_item_content">
						<view>{{ item.createdAt }}年{{item.mileage}}万公里</view>
						<view v-if="$guoLv(item.onlinePriceCents) == 0 || $guoLv(item.onlinePriceCents) == ''">面议</view>
						<view v-else style="color: #108EE9; font-size: 26upx;"><text style="font-size: 35upx; font-weight: bold;">{{ $guoLv(item.onlinePriceCents) }}</text>万</view>
					</view>
					<view class="cars_item_right_bottom">
						<view style="font-size: 26upx;"><text v-if="$guoLv(item.currentPlateNumber) != ''">车牌号</text><text v-if="$guoLv(item.rFid) != '' && $guoLv(item.currentPlateNumber) != ''">/</text><text v-if="$guoLv(item.rFid) != ''">RFID</text></view>
						<view class="cars_item_btn" @tap.stop.prevent="chooseStateOpen(index)">
							{{ item.stateText }}
							<view :class="[chooseIndex == index?'cars_item_btn_box_choose':'','cars_item_btn_box']">
								<view @tap="setCarState(item.id,0,index)">已在库</view>
								<view @tap="setCarState(item.id,1,index)">已上架</view>
								<view @tap="setCarState(item.id,2,index)">已出售</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<page-end :ifHaveData="ifHaveCar"></page-end>
	</view>
</template>

<script>
	import {
		getMeAllCars,
		upDateCarState
	} from '@/api/vehicleSource.js'
	export default {
		data() {
			return {
				// 当前修改的车辆Index
				chooseIndex: '==',
				// 查询特价好车所需条件
				getCarData: {
					// 排序
					"orderNum": "",
					// 价格区间
					"retailPrice": "",
					// 品牌名称
					brandName: '',
					// 车系名称
					seriesName: '',
					// 车型
					"styleName": '',
					// 状态
					"state": "",
					"pageNum": 1,
					"pageSize": 30
				},
				// 是否有更多数据
				ifHaveCar: '上划加载',
				// 排序
				paiXu: '排序',
				// 品牌
				pinPaiXingHao: '品牌',
				// 车辆当前状态
				carState: '状态',
				// 所查找的车辆价格
				carPrice: 0,
				// 车辆列表数组
				carList: []
			}
		},
		onShow() {
			this.getAllCars();
		},
		onLoad(params) {
			this.paiXu = params.paiXu;
			if (params.shangjia == 1) {
				this.getCarData.state = params.shangjia;
				this.carState = '已上架';
			}
		},
		methods: {
			// 暂未开放
			zwkf() {
				this.$toast('暂未开放');
			},
			// 修改车辆状态
			async setCarState(id, index, Index) {
				try {
					this.$loading()
					let params = {
						id: id,
						state: index
					};
					let resData = await upDateCarState(params);
					if (resData.code === 200) {
						this.ifHaveCar = '正在加载...';
						this.getAllCars();
						this.$toast('修改成功');
					} else {
						this.$toast(resData.message);
					}
					uni.hideLoading();
				} catch (e) {
					this.$toast('网络错误');
				}
			},
			goInfo(index, id) {
				if (this.chooseIndex == '==') {
					this.$goWindow('../carInfo/carBasicInfo/carBasicInfo?id=' + id)
				} else {
					this.chooseIndex = '=='
				}
			},
			// 修改状态显示或关闭
			chooseStateOpen(index) {
				this.chooseIndex == index ? this.chooseIndex = index + '==' : this.chooseIndex = index;
			},
			async getAllCars() {
				if (this.ifHaveCar != '已经是全部数据了') {
					this.ifHaveCar = '正在加载...';
					this.$loading()
					try {
						let resData = await getMeAllCars(this.getCarData)
						if (resData.code === 200) {
							this.ifHaveCar = '上划加载'
							if (!resData.result.hasNextPage) {
								this.ifHaveCar = '已经是全部数据了'
							}
							const bianLi = (val) => {
								val.coverUrl = val.coverUrl.split(',');
								val.createdAt = new Date(val.createdAt).getFullYear();
								if (val.state == 0) {
									val.stateText = '已在库';
								} else if (val.state == 1) {
									val.stateText = '已上架';
								} else if (val.state == 2) {
									val.stateText = '已出售';
								}
							}
							resData.result.list.forEach(bianLi)
							if (this.getCarData.pageNum == 1) {
								this.carList = resData.result.list
							} else {
								this.carList = this.carList.concat(resData.result.list)
							}
							uni.hideLoading();
						} else {
							this.$toast(resData.message)
						}
					} catch (e) {
						this.$toast('网络错误')
					}
				}
			},
			// 获取车辆列表
		},
		// 上滑加载车辆列表
		onReachBottom() {
			this.getCarData.pageNum++;
			this.getAllCars();
		}
	}
</script>
