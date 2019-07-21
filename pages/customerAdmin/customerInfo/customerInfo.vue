<template>
	<view id="customerInfo">
		<view id="customerInfoTop">
			<view class="customerInfoTop_top">
				<view>
					<text class="title">创建时间：</text>{{ userInfo.customerSell.createDate }}
				</view>
				<view>
					<text class="title">负责人：</text>{{ $guoLv(userInfo.customerSell.username) }}
				</view>
			</view>
			<view class="customerInfoTop_top">
				<view>
					<text class="title">客户姓名：</text>{{ userInfo.customerSell.cuName }}</view>
				<view>
					<text class="title">意向状态：</text>
					<text v-if="userInfo.customerSell.state == 0">未跟进</text>
					<text v-if="userInfo.customerSell.state == 1">已跟进</text>
					<text v-if="userInfo.customerSell.state == 2">成交</text>
					<text v-if="userInfo.customerSell.state == 3">无效</text>
				</view>
			</view>
			<view class="customerInfoTop_Center">
				<view class="customerInfoTop_Center_Left">
					<text class="title">基本信息：</text>
					<view v-for="(item,index) in userInfo.customerCar" :key="index">{{ item.brandName }}{{ item.carsName }}{{ $guoLv(item.modelName) }}</view>
					<view>预算：<text v-if="minPrice != ''">{{ userInfo.customerSell.minPrice }}</text><text  v-if="maxPrice != '' && minPrice != ''">-</text><text v-if="maxPrice != ''">{{ userInfo.customerSell.maxPrice }}</text>万元</view>
					<view>
						<text class="title">备注：</text><text>{{ $guoLv(userInfo.customerSell.remark) }}</text>
					</view>
				</view>
				<view class="customerInfoTop_Center_Right">
					<image :src="userInfo.customerSell.imgPath" mode="aspectFit"></image>
				</view>
			</view>
			<view class="customerInfoTop_title">
				跟进记录
			</view>
			<view class="list" v-for="(item,index) in trackingList" :key="index">
				<view class="customerInfoTop_center">
					<view class="customerInfoTop_center_left">
						<view>{{ item.createDate }}</view>
						<view><text class="title">跟进人：</text><text>{{ $guoLv(item.username) }}</text></view>
					</view>
					<view class="customerInfoTop_center_right">
						<image :src="item.imgPath" mode="aspectFit" :lazy-load="true"></image>
					</view>
				</view>
				<view class="customerInfoTop_bottom">{{ item.info }}</view>
			</view>
		</view>
		<view class="moreBg" v-if="showMore" @tap="showMore = !showMore"></view>
		<view :class="[showMore?'show':'','more']">
			<view class="more_item" @tap="goFollow()">
				<image src="../../../static/customer/genJin.png" mode="aspectFit"></image>
				<text>跟进</text>
			</view>
			<view class="more_item" @tap="goWrite()">
				<image src="../../../static/customer/write.png" mode="aspectFit"></image>
				<text>编辑</text>
			</view>
			<view class="more_item" @tap="customerCustomerSellDel()">
				<image src="../../../static/customer/delete.png" mode="aspectFit"></image>
				<text>删除</text>
			</view>
		</view>
		<view class="end">
			{{ ifHaveData }}
		</view>
	</view>
</template>

<script>
	import {
		customerCustomerBuyInfo,
		customerCustomerSellInfo,
		customerCustomerTrackingList,
		customerCustomerSellDel,
		customerCustomerBuyDel
	} from '@/api/customer.js'
	export default {
		data() {
			return {
				ifHaveData:'已经是全部数据了',
				showMore:false,
				id:'',
				userInfo:{customerSell:{},customerCar:[]},
				state: '',
				ifLoadState:0,
				trackingList:[]
			}
		},
		onShow() {
			if(this.ifLoadState != 0){
				this.customerCustomerTrackingList()
				this.getCustomerInfo()
			}
		},
		onNavigationBarButtonTap() {
			this.showMore = !this.showMore
		},
		onLoad(params) {
			this.id = params.id
			this.state = params.state
			this.getCustomerInfo()
			this.customerCustomerTrackingList()
		},
		methods:{
			// 编辑事件
			goWrite(){
				if(this.state == 1){
					this.$goWindow('../customerSellAdd/customerSellAdd?userData='+JSON.stringify(this.userInfo))
				}else{
					this.$goWindow('../customerBuyAdd/customerBuyAdd?userData='+JSON.stringify(this.userInfo))
				}
				this.showMore = !this.showMore
			},
			// 卖车客户删除
			async customerCustomerSellDel(){
				try{
					let resData;
					if(this.state == 1){
						resData = await customerCustomerSellDel({id: this.id})
					}else{
						resData = await customerCustomerBuyDel({id: this.id})
					}
					if(resData.code === 200){
						this.$toast('删除成功')
						setTimeout(() => {
							uni.navigateBack()
						},500)
					}else{
						this.$toast(resData.message)
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 获取跟进列表
			async customerCustomerTrackingList(){
				try{
					let state = 1
					if(this.state == 1){
						state = 2
					}
					let params = {
						customerId: String(this.id),
						cuType: String(state)
					}
					let resData = await customerCustomerTrackingList(params)
					if(resData.code === 200){
						this.trackingList = resData.result
					}else{
						this.$toast(resData.message)
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 跟进事件
			goFollow(){
				this.$goWindow('../customerFollowUp/customerFollowUp?cuType='+this.state+'&id='+this.userInfo.customerSell.id)
				this.showMore = !this.showMore
			},
			async getCustomerInfo(){
				try{
					let resData = {};
					if(this.state == 1){
						resData = await customerCustomerSellInfo({id: this.id})
					}else if(this.state == 2){
						resData = await customerCustomerBuyInfo({id: this.id})
					}
					if(resData.code === 200){
						if(this.state == 1){
							this.userInfo.customerCar.push(resData.result.customerCar)
							this.userInfo.customerSell = resData.result.customerSell
						}else{
							this.userInfo.customerCar = resData.result.customerCars
							this.userInfo.customerSell = resData.result.customerBuy
						}
					}else{
						this.$toast('网络错误')
					}
				}catch(e){
					this.$toast('网络错误')
				}
			}
		}
	}
</script>

<style scoped>
	#customerInfo {
		width: 750upx;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.title{
		font-weight: bold;
	}

	#customerInfoTop{
		width: 100%;
		display: flex;
		flex-flow: column;
	}

	.customerInfoTop_top {
		display: flex;
		justify-content: flex-start;
	}

	.customerInfoTop_top>view {
		font-size: 30upx;
	}

	.customerInfoTop_top>view:first-child {
		flex: 0.65;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.customerInfoTop_top>view:last-child {
		flex: 0.35;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.customerInfoTop_Center{
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20upx;
		/* align-items: center; */
	}
	
	.customerInfoTop_Center_Left{
		flex: 0.6;
		font-size: 30upx;
		line-height: 45upx;
	}
	
	.customerInfoTop_Center_Right{
		flex: 0.4;
	}
	
	.customerInfoTop_Center_Right>image{
		width: 200upx;
		height: 300upx;
	}
	.list{
		width: 100%;
		border-bottom: 1upx solid #E8E8E8;
		padding-bottom: 20upx;
	}

	.customerInfoTop_center {
		display: flex;
		justify-content: space-between;
		height: 150upx;
		margin-top: 20upx;
	}

	.customerInfoTop_center_left {
		flex-flow: column;
		display: flex;
		flex: 0.6;
		justify-content: space-between;
		font-size: 30upx;
	}

	.customerInfoTop_center_right {
		flex: 0.4;
		margin-right: 50upx;
	}

	.customerInfoTop_center_right>image {
		width: 100%;
		height: 100%;
	}

	.customerInfoTop_top>view:last-child {
		width: 150upx;
	}

	.customerInfoTop_bottom {
		font-size: 30upx;
		margin-top: 20upx;
	}
	
	.customerInfoTop_title{
		width: 100%;
		padding: 15upx 0upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 30upx;
		color: #108EE9;
	}
	.customerInfoTop_title:before{
		content: '';
		height: 50upx;
		display: inline-block;
		width: 10upx;
		margin-right: 20upx;
		background-color: #108EE9;
	}
	.more{
		position: fixed;
		z-index: 2;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
		padding: 30upx 30upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 26upx;
		background-color: #FFFFFF;
		transition: 0.3s all ease;
		transform: scaleY(0);
	}
	.moreBg{
		position: fixed;
		z-index: 1;
		top: 0upx;
		left: 0upx;
		bottom: 0upx;
		right: 0upx;
		background-color: rgba(0,0,0,0.8);
	}
	.show{
		transform: scaleY(1);
	}
	.more_item{
		flex: 0.2;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
	}
	.more_item>image{
		width: 65%;
		height: 90upx;
		margin-bottom: 15upx;
	}
	.end{
		width: 100%;
		padding: 15upx 0upx 0upx 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #939393;
	}
</style>
