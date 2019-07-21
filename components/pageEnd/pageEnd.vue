<template>
	<view id="pageEnd">
		<view class="pageEnd">
			{{ ifHaveData }}
		</view>
	</view>
</template>

<script>
	export default {
		name:'pageEnd',
		props:{
			ifHaveData:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped>
#pageEnd{
	width: 750upx;
}
.pageEnd{
	width: 100%;
	background-color: #FFFFFF;
	padding: 15upx 0upx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30upx;
	color: #939393;
}
</style>
