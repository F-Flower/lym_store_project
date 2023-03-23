<template>
	<view class="threeadv d-flex">
		<view style="width: 50%;height:100%;" class="d-flex flex-1">
			<image :src="news.data[0].src" class="left-adv"></image>
		</view>
		<view style="width: 50%;height:100%;" class="d-flex flex-column adv-right">
			<image :src="news.data[1].src"></image>
			<image :src="news.data[2].src"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "three-adv",
		data() {
			return {

			};
		},
		props: {
			news: {
				type: Object
			}
		}
	}
</script>

<style scoped>
	.threeadv {
		height: 460rpx;
	}

	.threeadv .left-adv {
		width: 375rpx;
		height: 460rpx !important;
	}

	.adv-right image {
		width: 375rpx;
		height: 230rpx !important;
	}
</style>
