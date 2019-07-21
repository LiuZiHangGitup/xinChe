<template>
	<view id="staffAdmin">
		<view class="staffAdmin_item" v-for="(item,index) in userList" :key="index">
			<view>
				<!-- <image src="../../static/bannerCar1.jpg"></image> -->
				<text>{{ item.username }}</text>
			</view>
			<view><text>{{ item.mobile }}</text></view>
		</view>
		<view class="end">{{ ifHaveData }}</view>
	</view>
</template>

<script>
	import { sysUserList } from '@/api/staff.js'
	export default {
		data() {
			return {
				ifHaveData: '上划加载',
				pageNum:1,
				pageSize:20,
				userList:[]
				
			}
		},
		onShow() {
			this.pageNum = 1
			this.sysUserList()
		},
		onReachBottom() {
			this.pageNum++
			this.sysUserList()
		},
		methods: {
			// 获取员工列表
			async sysUserList(){
				try{
					if(this.ifHaveData == '已经是全部数据了'){
						return
					}else{
						this.$loading()
						this.ifHaveData = '正在加载...'
						let params = {
							pageNum: this.pageNum,
							pageSize: this.pageSize
						}
						let resData = await sysUserList(params)
						if(resData.code === 200){
							if(this.pageNum == 1){
								this.userList = resData.result.list
							}else{
								this.userList = this.userList.concat(resData.result.list)
							}
							this.ifHaveData = '上划加载'
							if(this.userList.length == resData.result.total){
								this.ifHaveData = '已经是全部数据了'
							}
							uni.hideLoading()
						}else{
							this.$toast('网络错误')
						}
					}
				}catch(e){
					this.$toast('网络错误')
				}
			}
		},
		onNavigationBarButtonTap() {
			this.$goWindow('../staffAdd/staffAdd')
		}
	}
</script>

<style scoped>
	#staffAdmin {
		width: 750upx;
	}

	.staffAdmin_item {
		padding: 20upx 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #E8E8E8;
	}

	.staffAdmin_item>view:first-child {
		flex: 0.5;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}

	.staffAdmin_item>view:first-child>image {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		margin-right: 20upx;
	}

	.staffAdmin_item>view:last-child {
		flex: 0.5;
		font-size: 30upx;
		color: #939393;
		display: flex;
		justify-content: flex-end;
	}

	.end {
		width: 750upx;
		padding: 15upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #939393;
	}
</style>
