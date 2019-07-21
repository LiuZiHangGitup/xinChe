<template>
	<view id="share">
		<view class="share_bg" @touchmove.stop.prevent="noMove()" @tap="show_share()" v-if="if_show_share"></view>
		<view :class="[if_show_share?'share_show':'','share']">
			<view class="share_item" @tap="fenXiang(2)">
				<image :src="frind" mode="aspectFit"></image>
				<text>分享好友</text>
			</view>
			<view class="share_item" @tap="fenXiang(1)">
				<image :src="frind_circle" mode="aspectFit"></image>
				<text>分享朋友圈</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'share',
		props: {
			frind: {
				type: String,
				default: ''
			},
			frind_circle: {
				type: String,
				default: ''
			},
			if_show_share: {
				type: Boolean,
				default: false
			},
			share_url: {
				type: String,
				default: ''
			},
			car_id: {
				type: String,
				default: ''
			},
			car_title: {
				type: String,
				default: ''
			},
			car_summary: {
				type: String,
				default: ''
			},
			img_url: {
				type: String,
				default: ''
			},
			userId: {
				type: String,
				default: ''
			}
		},
		methods: {
			noMove() {},
			show_share() {
				this.if_show_share = !this.if_show_share
				this.$emit('update_share_show', this.if_show_share)
			},
			fenXiang(index) {
				let scene = 'WXSenceTimeline'
				if (index == 2) {
					scene = 'WXSceneSession'
				}
				this.show_share()
				let go_data = ''
				if (this.car_id && this.userId) {
					go_data = '?id=' + this.car_id + '&userId=' + this.userId + ''
				} else if (this.car_id && !this.userId) {
					go_data = '?id=' + this.car_id
				} else if (!this.car_id && this.userId) {
					go_data = '?userId=' + this.userId + ''
				}
				console.log(this.share_url)
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: 'http://wshop.xczlbox.com/#/' + (!this.share_url?go_data:this.share_url+go_data),
					title: this.car_title,
					summary: this.car_summary,
					imageUrl: this.img_url
				});
			}
		}
	}
</script>

<style>
	#share {
		width: 750upx;
	}

	.share_bg {
		width: 750upx;
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.share {
		position: fixed;
		padding: 40upx 50upx;
		box-sizing: border-box;
		bottom: 150upx;
		left: 60upx;
		right: 60upx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		border-radius: 50upx;
		transition: 0.3s all ease;
		transform: scale(0);
	}

	.share_show {
		transform: scale(1);
	}

	.share_item {
		flex: 0.26;
		height: 140upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: column;
	}

	.share_item>image {
		width: 50%;
		height: 100upx;
	}

	.share_item>text {
		font-size: 28upx;
		display: flex;
		justify-content: center;
		align-items: center;
		white-space: nowrap;
	}
</style>
