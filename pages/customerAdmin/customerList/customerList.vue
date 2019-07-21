<template>
	<view id="customerAdmin">
		<view class="top_top">
			<view :class="[topIndex == 1?'top_top_item_active':'','top_top_item']" @tap="changeTopIndex(1)">卖车客户</view>
			<view :class="[topIndex == 2?'top_top_item_active':'','top_top_item']" @tap="changeTopIndex(2)">买车客户</view>
		</view>
		<view class="top_center">
			<view class="top_center_item" @tap="changeChooseIndex(index)" v-for="(item,index) in top_center_json" :key="index">
				<text>{{ item }}</text>
				<image :class="[chooseIndex == index?'chooseImageActive':'','chooseImage']" src="../../static/jianTou.png" mode=""></image>
			</view>
		</view>
		<view class="top_bottom_bg" v-if="bgState" @tap="changeChooseIndex(chooseIndex)"></view>
		<view :class="[chooseIndex == 0?'top_bottom_active':'','top_bottom']">
			<view :class="[topTimeIndex == index+1?'top_bottom_item_active':'','top_bottom_item']" @tap="changeTimeIndex(index)"
			 v-for="(item,index) in time_json" :key="index">{{ item }}</view>
		</view>
		<view :class="[chooseIndex == 1?'top_bottom_active':'','top_bottom']">
			<view :class="[customerIndex == index+1?'top_bottom_item_active':'','top_bottom_item']" @tap="changeCustomerIndex(index)"
			 v-for="(item,index) in customer_json" :key="index">{{ item }}</view>
		</view>
		<view :class="[chooseIndex == 2?'top_bottom_active':'','top_bottom']">
			<view :class="[intentionIndex == index?'top_bottom_item_active':'','top_bottom_item']" @tap="changeIntentionIndex(index)"
			 v-for="(item,index) in intention_json" :key="index">{{ item }}</view>
		</view>
		<view :class="[chooseIndex == 3?'top_bottom_active':'','top_bottom']">
			<view :class="[topTimeIndex == index?'top_bottom_item_active':'','top_bottom_item']" @tap="changeTimeIndex(index)"
			 v-for="(item,index) in time_json" :key="index">时间正序</view>
		</view>
		<view class="customer_list">
			<view class="customer_list_item" v-for="(item,index) in customerList" :key="index" @tap="$goWindow('../customerInfo/customerInfo?id='+item.id+'&state='+topIndex)">
				<view class="customer_list_item_top">
					<view class="customer_list_item_top_left">{{ item.customerCar[0].brandName }}{{ item.customerCar[0].carsName }}{{ $guoLv(item.customerCar[0].modelName) }}</view>
					<view class="customer_list_item_top_right">{{ item.updateDate }}</view>
				</view>
				<view class="customer_list_item_bottom">
					<view class="customer_list_item_bottom_left">{{ item.cuName }}</view>
					<view class="customer_list_item_bottom_center">
						<view>
							<image src="../../../static/customer/title.png" mode="aspectFit"></image>
							{{ item.remark }}
						</view>
					</view>
					<view class="customer_list_item_bottom_right" @tap.stop.prevent="$goPhone(item.cuPhone)">
						<image src="../../../static/customer/phone.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<page-end :ifHaveData="ifHaveData"></page-end>
	</view>
</template>

<script>
	import {
		getBuyCarList,
		customerCustomerSellList
	} from '@/api/customer.js'
	export default {
		data() {
			return {
				topIndex: 1,
				topTimeIndex: '1',
				chooseIndex: '##',
				top_center_json: ['排序', '客户来源', '意向状态', '归属员工'],
				time_json: ['时间倒序', '时间正序'],
				customer_json: ['网络集客', '同行批发', '朋友介绍', '门店'],
				intention_json: ['未跟进', '已跟进', '成交', '无效'],
				bgState: false,
				customerIndex: '##',
				intentionIndex: '##',
				ifHaveData: '上划加载',
				pageNum: 1,
				pageSize: 20,
				customerList: []
			}
		},
		onNavigationBarButtonTap() {
			if (this.topIndex == 1) {
				this.$goWindow('../customerSellAdd/customerSellAdd')
			} else {
				this.$goWindow('../customerBuyAdd/customerBuyAdd')
			}
		},
		onShow() {
			this.pageNum = 1
			this.getList()
		},
		// 上拉触底事件
		onReachBottom() {
			this.pageNum++;
			if (this.topIndex == 1) {
				this.customerCustomerSellLists()
			}else if(this.topIndex == 2){
				this.getBuyList()
			}
		},
		methods: {
			jieXiData(data){
				if(data == '##'){
					return ''
				}else{
					return data
				}
			},
			// 分别调用买车卖车接口
			getList(){
				this.pageNum = 1
				if(this.topIndex == 1){
					this.customerCustomerSellLists()
				}else if(this.topIndex == 2){
					this.getBuyList()
				}
			},
			// 获取卖车客户列表
			async customerCustomerSellLists() {
				try {
					if (this.ifHaveData == '已经是全部数据了' && this.pageNum > 1) {
						return
					} else {
						this.$loading()
						this.ifHaveData = '正在加载...'
						let params = {
							pageNum: this.pageNum,
							pageSize: this.pageSize,
							cuSource: this.jieXiData(this.customerIndex),
							state: this.jieXiData(String(this.intentionIndex)),
							startDate: '',
							endDate: '',
							sort: this.jieXiData(String(this.topTimeIndex)),
							marketId: uni.getStorageSync('marketId') || '',
							merchantId: uni.getStorageSync('merchantId') || ''
						}
						let resData = await customerCustomerSellList(params)
						if (resData.code === 200) {
							let xunHuan = (val) => {
								let customerCar = []
								let jsonOne = val.customerCar
								customerCar.push(jsonOne)
								val.customerCar = customerCar
							}
							resData.result.list.forEach(xunHuan)
							if (this.pageNum == 1) {
								this.customerList = resData.result.list
							} else {
								this.customerList = this.customerList.concat(resData.result.list)
							}
							if (!resData.result.hasNextPage) {
								this.ifHaveData = '已经是全部数据了'
							} else {
								this.ifHaveData = '上划加载'
							}
							uni.hideLoading()
						} else {
							this.$toast(resData.message)
						}
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 获取买车客户列表
			async getBuyList() {
				try {
					if (this.ifHaveData == '已经是全部数据了' && this.pageNum > 1) {
						return
					}else{
						this.$loading()
						this.ifHaveData = '正在加载...'
						let params = {
							pageNum: this.pageNum,
							pageSize: this.pageSize,
							cuSource: this.jieXiData(this.customerIndex),
							state: this.jieXiData(String(this.intentionIndex)),
							startDate: '',
							endDate: '',
							sort: this.jieXiData(String(this.topTimeIndex)),
							marketId: uni.getStorageSync('marketId') || '',
							merchantId: uni.getStorageSync('merchantId') || ''
						}
						let resData = await getBuyCarList(params)
						if (resData.code === 200) {
							if (this.pageNum == 1) {
								this.customerList = resData.result.list
							} else {
								this.customerList = this.customerList.concat(resData.result.list)
							}
							if (!resData.result.hasNextPage) {
								this.ifHaveData = '已经是全部数据了'
							} else {
								this.ifHaveData = '上划加载'
							}
							uni.hideLoading()
						} else {
							this.$toast(resData.message)
						}
						if (this.pageNum == 1) {
							this.customerList = resData.result.list
						} else {
							this.customerList.concat(resData.result.list)
						}
						if (!resData.result.hasNextPage) {
							this.ifHaveData = '已经是全部数据了'
						} else {
							this.ifHaveData = '上划加载'
						}
					}
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 修改买车/卖车客户状态
			changeTopIndex(index) {
				this.topIndex = index;
				this.changeChooseIndex(this.chooseIndex)
				this.getList()
			},
			// 修改二级筛选条件状态
			changeChooseIndex(index) {
				if (index == 3) {
					return
				} else {
					if (this.chooseIndex != index) {
						this.bgState = true
						this.chooseIndex = index
					} else {
						this.chooseIndex = '##'
						this.bgState = false
					}
				}
			},
			// 修改意向状态筛选
			changeIntentionIndex(index) {
				this.intentionIndex = index
				this.changeChooseIndex(this.chooseIndex)
				this.getList()
			},
			// 修改当前时间筛选状态
			changeTimeIndex(index) {
				this.topTimeIndex = index + 1;
				this.changeChooseIndex(this.chooseIndex)
				this.getList()
			},
			// 修改客户来源选择状态
			changeCustomerIndex(index) {
				this.customerIndex = index + 1
				this.changeChooseIndex(this.chooseIndex)
				this.getList()
			}
		}

	}
</script>

<style scoped>
	#customerAdmin {
		width: 750upx;
	}

	.top_top {
		width: 100%;
		height: 80upx;
		display: flex;
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		justify-content: space-between;
		border-bottom: 1upx solid #E8E8E8;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.top_top_item {
		flex: 0.5;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
	}

	.top_top_item_active {
		background-color: #0799f7;
		color: #FFFFFF;
	}

	.top_center {
		height: 60upx;
		display: flex;
		position: fixed;
		top: 80upx;
		left: 0upx;
		right: 0upx;
		justify-content: space-between;
		border-bottom: 1upx solid #E8E8E8;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.top_center_item {
		flex: 0.25;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
	}

	.chooseImage {
		width: 15upx;
		height: 15upx;
		margin-left: 10upx;
		transition: 0.3s all ease;
	}

	.chooseImageActive {
		transform: rotate(180deg);
	}

	.top_bottom_bg {
		position: fixed;
		top: 135upx;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 2;
	}

	.top_bottom {
		position: fixed;
		top: 135upx;
		left: 0upx;
		right: 0upx;
		z-index: 3;
		background-color: #FFFFFF;
		border-top: 1upx solid #E8E8E8;
		transition: 0.3s all ease;
		transform: scaleY(0);
	}

	.top_bottom_active {
		transform: scaleY(1);
	}

	.top_bottom_item {
		padding: 15upx 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		border-bottom: 1upx solid #E8E8E8;
	}

	.top_bottom_item_active {
		color: #108EE9;
	}

	.customer_list {
		width: 750upx;
		margin-top: 140upx;
	}

	.customer_list_item {
		width: 100%;
		padding: 20upx;
		border-bottom: 1upx solid #E8E8E8;
		box-sizing: border-box;
		display: flex;
		flex-flow: column;
		align-items: center;
	}

	.customer_list_item_top {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.customer_list_item_top_left {
		font-size: 30upx;
		font-weight: bold;
		flex: 0.6;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.customer_list_item_top_right {
		font-size: 26upx;
		color: #939393;
		flex: 0.4;
		text-align: right;
	}

	.customer_list_item_bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 30upx;
		margin-top: 25upx;
	}

	.customer_list_item_bottom_left {
		width: 120upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: flex;
		align-items: center;
	}

	.customer_list_item_bottom_center {
		width: 500upx;
		display: flex;
		align-items: center;
	}

	.customer_list_item_bottom_center>view {
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.customer_list_item_bottom_center>view>image {
		width: 30upx;
		height: 30upx;
	}

	.customer_list_item_bottom_right>image {
		width: 30upx;
		height: 30upx;
	}
</style>
