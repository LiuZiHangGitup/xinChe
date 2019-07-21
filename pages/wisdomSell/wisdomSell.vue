<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	#wisdom {
		width: 750upx;
		background: #FFFFFF;
	}

	.wisdomChild {
		width: 750upx;
		padding: 15upx 25upx;
		align-items: center;
		border-bottom: 1upx solid #E8E8E8;
		font-size: 30upx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.wisdomChildName {
		width: 300upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.wisdomChildPhone {
		color: #0066FF;
	}

	.goodCarNum {
		width: 750upx;
		text-align: center;
		color: #909399;
		clear: both;
		background: #FFFFFF;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
	}
</style>

<template>
	<view id="wisdom">
		<view class="wisdomChild" v-for="(item,index) in wisdomList" :key="index">
			<text class="wisdomChildName">{{ $guoLv(item.carTitle) }}</text>
			<text class="wisdomChildPhone" @tap="getPhone(item.linkmanPhone)">电话：{{ $guoLv(item.linkmanPhone) }}</text>
		</view>
		<page-end :ifHaveData="if_have_wisdom"></page-end>
	</view>
</template>

<script>
	import {
		getWisdom
	} from '@/api/wisdomSell.js'
	export default {
		data() {
			return {
				if_have_wisdom: '上划加载',
				wisdomData: {
					pageSize: 100,
					pageNum: 1
				},
				wisdomList: []
			}
		},
		onLoad() {
			this.getWisdom();
		},
		// 上滑加载特价好车列表
		onReachBottom() {
			this.wisdomData.pageNum++;
			this.getWisdom();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.wisdomData.pageNum = 1;
			this.getWisdom();
			uni.stopPullDownRefresh()
		},
		methods: {
			// 获取智慧营销车辆
			async getWisdom() {
				if (this.if_have_wisdom != '已经是全部数据了') {
					try {
						this.$loading()
						let resData = await getWisdom(this.wisdomData);
						if (resData.code === 200) {
							this.goodCarTotal = resData.result.total;
							if (this.wisdomData.pageNum == 1) {
								this.wisdomList = resData.result.list;
							} else {
								this.wisdomList = this.wisdomList.concat(resData.result.list);
							}
							if (resData.result.hasNextPage == false) {
								this.if_have_wisdom = '已经是全部数据了';
							} else {
								this.if_have_wisdom = '上拉加载';
							}
							uni.hideLoading()
						} else {
							this.$toast(resData.message);
						}
					} catch (e) {
						this.$toast('网络错误');
					}
				}
			},
			getPhone(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			}
		}
	}
</script>
