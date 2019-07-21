<style scoped>
	#app {
		width: 750upx;
		background-color: #f3f3f3;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	.head {
		width: 750upx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.head:first-child {
		background-color: #108ee9;
	}

	.head:nth-child(2) {
		background-color: #ffffff;
		margin-top: 10upx;
	}

	.headChild {
		width: 25%;
		height: 125upx;
		font-size: 26upx;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.headChildTop>image {
		width: 55upx !important;
		height: 55upx !important;
	}

	.headChildTop {
		color: #ffffff;
		font-size: 28upx !important;
	}

	.headChild image {
		width: 45upx;
		height: 45upx;
		margin-bottom: 10upx;
	}

	/* 轮播部分样式--start */
	.banner {
		margin: 10upx 0upx 10upx 0upx;
		height: 220upx;
	}

	.banner swiper {
		height: 100%;
	}

	.swiper-item image {
		width: 100%;
		height: 220upx;
	}

	/* 轮播部分样式--end */
	.notice {
		width: 750upx;
		background: #FFFFFF;
		padding: 0upx 35upx;
		box-sizing: border-box;
		display: flex;
		font-size: 26upx;
		align-items: center;
		margin: 0upx 0upx 10upx 0upx;
		justify-content: space-between;
	}

	.notice-img>view>image {
		width: 100upx;
		height: 100upx;
	}

	.notice-title-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 550upx;
		height: 150upx;
	}

	.Recommend-right {
		display: flex;
		align-items: center;
		padding-top: 10upx;
		padding-bottom: 10upx;
		box-sizing: border-box;
		color: #333;
	}

	.hei_dian {
		width: 10upx;
		height: 10upx;
		background-color: #000000;
		border-radius: 50%;
		margin-right: 15upx;
		display: inline-block;
	}

	.Recommend-right>view:nth-child(2) {
		max-width: 160upx;
		max-height: 100%;
		font-size: 26upx;
		font-weight: bold;
		color: #108EE9;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.Recommend-right>view:last-child {
		width: 350upx;
		max-height: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.swiper-content {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 280upx;
	}

	.swiper-content swiper {
		height: 280upx;
	}

	/* 好车列表 */
	.carList {
		width: 750upx;
		background-color: #FFFFFF;
		float: left;
		padding: 20upx 0upx 0upx 0upx;
		box-sizing: border-box;

	}

	.carListTop {
		width: 20%;
		height: 50upx;
		line-height: 50upx;
		border-left: 10upx solid #108ee9;
		font-size: 30upx;
		padding-left: 2%;
		box-sizing: border-box;
	}

	.carLists {
		float: left;
		width: 100%;
		padding: 10upx 0upx 0upx 0upx;
		box-sizing: border-box;
		border-bottom: 10upx solid #f3f3f3;
		margin: 10upx;
	}

	.carListsLeft {
		width: 45%;
		float: left;
		height: 200upx;
	}

	.carListsLeft image {
		width: 100%;
		height: 200upx;
		border-radius: 20upx;
	}

	.carListsRight {
		float: right;
		width: 50%;
		margin-right: 2%;
		display: flex;
		flex-direction: column;

	}

	.carListsRight text {
		font-size: 30upx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.carListsRight text:nth-child(2) {
		display: block;
		color: #909399;
		margin: 10upx 0;
	}

	.carListsRight text:nth-child(3) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #21bfff;
		display: inline-block;
		width: 80%;
		padding: 20upx 0 0 0;
		box-sizing: border-box;
	}

	.notice_title {
		font-size: 26upx;
		font-weight: bold;
		color: #108EE9;
		max-width: 104upx;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.notice_content {
		font-size: 26upx;
		max-width: 400upx;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<template>
	<view id="app">
		<!-- 蓝色头部背景 -->
		<view class="head">
			<view v-if="$qx('addCar')" class="headChild headChildTop" @click="$goWindow('../../carAdmin/addCar/addCar')">
				<image src="../../../static/index/index/sys.png"></image>
				<text>新建车辆</text>
			</view>
			<view class="headChild headChildTop" @tap="$goWindow('../../wisdomSell/wisdomSell')" v-if="$qx('wisdom')">
				<image src="../../../static/index/index/zhyx.png"></image>
				<text>智慧营销</text>
			</view>
			<view class="headChild headChildTop" @tap="$goNavWindow('../../goodCar/carList/carList')" v-if="$qx('goodCar')">
				<image src="../../../static/index/index/goodCarLogo.png"></image>
				<text>特价好车</text>
			</view>
			<view class="headChild headChildTop" @tap="$goWindow('../../thirdSquare/tinyShop/carList/carList')" v-if="$qx('microShop')">
				<image src="../../../static/index/index/weiDian.png"></image>
				<text>微店</text>
			</view>
		</view>
		<!-- 白色头部背景 -->
		<view class="head">
			<view class="headChild" @click="$goWindow('../../carAdmin/carList/carList?paiXu=最近入库')" v-if="$qx('carAdmin')">
				<image mode="aspectFill" src="../../../static/index/index/goOut.png"></image>
				<text>车辆管理</text>
			</view>
			<view class="headChild" @tap="$goWindow('../../carAdmin/carList/carList?paiXu=最近入库&shangjia=1')" v-if="$qx('upCars')">
				<image mode="aspectFill" src="../../../static/index/index/nowCarNum.png"></image>
				<text>上架车辆</text>
			</view>
			<view class="headChild" @tap="$goNavWindow('../../statistics/statistics')" v-if="$qx('dataStatistic')">
				<image mode="aspectFill" src="../../../static/index/index/nowMonthCarNum.png"></image>
				<text>数据统计</text>
			</view>
			<view class="headChild" v-if="$qx('allCars')" @tap="$goWindow('../../thirdSquare/allNetwork/carList/carList')">
				<image mode="aspectFill" src="../../../static/index/index/cheYuan.png"></image>
				<text>全网车源</text>
			</view>
			<view class="headChild" @tap="isCheShang('../../customerAdmin/customerList/customerList')">
				<image mode="aspectFill" src="../../../static/index/index/keHuAdmin.png"></image>
				<text>客户管理</text>
			</view>
			<view class="headChild" @tap="isCheShang('../../staff/staffList/staffList')">
				<image mode="aspectFill" src="../../../static/index/index/yuanGongAdmin.png"></image>
				<text>员工管理</text>
			</view>
			<view class="headChild" @tap="$goWindow('../readFrid/readFrid')">
				<image mode="aspectFill" src="../../../static/index/index/read.png"></image>
				<text>识别</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" indicator-color="#0066ff"
			 indicator-active-color="#f3f3f3" autoplay="true" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image mode="aspectFill" src="../../../static/index/index/bannerCar2.jpg"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image mode="aspectFill" src="../../../static/index/index/bannerCar3.jpg"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image mode="aspectFill" src="../../../static/index/index/bannerCar1.jpg"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice" v-if="qx != 'admine'">
			<view class="notice-img">
				<view>
					<image mode="aspectFill" src="../../../static/index/index/notice.png"></image>
				</view>
			</view>
			<view class="notice-title">
				<view class="notice-title-item">
					<view style="width: 300upx;" v-if="notice_list.length == 0">暂无公告</view>
					<view style="width: 550upx; display: flex; align-items: center;" v-if="notice_list.length == 1 && notice_list[0].length == 1"
					 @tap="$goWindow('../../notice/noticeList/noticeList')">
						<text class="hei_dian"></text>
						<view>
							<text class="notice_title">
								{{ notice_list[0][0].title }}:
							</text>
							<text class="notice_content">{{ notice_list[0][0].noticeContent }}</text>
						</view>
					</view>
					<swiper :circular="true" vertical="true" autoplay='true' interval='5000' indicator-color='white'
					 indicator-active-color='white' v-if="notice_list[0].length > 1" @tap="$goWindow('../../notice/noticeList/noticeList')"
					 style='height:120upx;width: 550upx;'>
						<swiper-item v-for="(item,index) in notice_list" :key="index" style="width: 400upx; height: 150upx;">
							<view class="Recommend-right" v-for="(items,index2) in item" :key="index2">
								<text class="hei_dian"></text>
								<view>{{ items.title }}：</view>
								<view>{{ items.noticeContent }}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="notice-more">
				<view>
					<!-- <image mode="aspectFill" 
						src="../../../static/index/index/jianTou.png" 
						style="width:25upx;height: 30upx;">
					</image> -->
				</view>
			</view>
		</view>
		<view class="carList" v-if="$qx('goodCar')">
			<view class="carListTop">
				特价好车
			</view>
			<!-- @tap="$goWindow('../carInformation/carInformation')" -->
			<view class="carLists" v-for="(item,index) in goodCarList" :key="index" @tap="$goWindow('../../goodCar/carInfo/carInfo?id=' + item.id)">
				<view class="carListsLeft">
					<image mode="aspectFill" :src="item.carImg[0]" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="carListsRight">
					<text>{{item.carTitle}}</text>
					<text>{{item.city}}</text>
					<text>{{ $guoLv(item.carPrice) }}万</text>
				</view>
			</view>
		</view>
		<page-end :ifHaveData="ifHaveCar"></page-end>
	</view>
</template>

<script>
	import {
		getGoodCar
	} from '@/api/goodCar.js'
	import {
		getNoticeList
	} from '@/api/noticeList.js'

	export default {
		data() {
			return {
				notice_list: uni.getStorageSync('noticeList'),
				noticePage: 1,
				noticePageSize: 10,
				qx: '',
				title: '信车',
				// 查询特价好车所需条件
				goodCarData: {
					"audiId": "",
					"brandId": "",
					"carPrice": null,
					"carYear": null,
					"dataSources": "",
					"pageNum": 1,
					"paixu": "",
					"pageSize": 10,
					"state": "0"
				},
				// 特价好车参数
				goodCarList: [],
				// 是否有更多数据
				ifHaveCar: '上划加载',
				// 查询总数据
				goodCarTotal: 0
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.$goNavWindow('../../me/meInfo/meInfo')
			}
		},
		onLoad() {
			if (this.notice_list.length == 0) {
				uni.setStorageSync('noticeList', [])
			}
		},
		onShow() {
			//获取消息通知列表
			this.getNoticeLists();
			// 获取特价好车列表
			this.getGoodCar();
		},
		methods: {
			isCheShang(url) {
				if (uni.getStorageSync('qx') != 'merchan') {
					this.$toast('请使用车商账号登录')
				} else {
					this.$goWindow(url)
				}
			},
			async getNoticeLists() {
				let params = {
					"pageNum": this.noticePage,
					"pageSize": this.noticePageSize
				};
				let notice_list = []
				try {
					let resData = await getNoticeList(params);
					if (resData.code === 200) {
						//两条通知一组轮播
						let jsonOne = {}
						let data = resData.result.list;
						let num = 2;
						for (var i = 0; i < data.length; i += num) {
							notice_list.push(data.slice(i, i + num));
							uni.setStorageSync('noticeList', notice_list)
							this.notice_list = uni.getStorageSync('noticeList')
						}
					} else {
						this.$toast(resData.message);
					}
					uni.hideLoading();
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 获取特价好车
			async getGoodCar() {
				if (this.ifHaveCar == '已经是全部数据了') {
					this.ifHaveCar = '已经是全部数据了';
				} else {
					this.ifHaveCar = '正在加载...';
					this.$loading()
					try {
						let resData = await getGoodCar(this.goodCarData);
						if (this.goodCarList == resData.result.total) {
							this.ifHaveCar = '已经是全部数据了';
						} else {
							if (resData.code === 200) {
								this.goodCarTotal = resData.result.total;
								this.goodCarList = this.goodCarList.concat(resData.result.list);
								if (resData.result.hasNextPage == false) {
									this.ifHaveCar = '已经是全部数据了';
								} else {
									this.ifHaveCar = '上拉加载';
								}
								let xunHuan = (val) => {
									val.carImg = val.carImg.split(',')
								}
								this.goodCarList.forEach(xunHuan)
							} else {
								this.$toast(resData.message)
							}
						}
						uni.hideLoading()
					} catch (e) {
						this.$toast('网络错误')
					}
				}
			},
			zwkf() {
				this.$toast('暂未开放')
			}
		},
		// 下拉刷新功能
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上滑加载特价好车列表
		onReachBottom() {
			this.goodCarData.pageNum++;
			this.getGoodCar();
		}
	}
</script>
