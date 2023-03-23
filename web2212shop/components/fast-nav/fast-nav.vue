<template>
	<swiper :indicator-dots="true" style="height:350rpx">
		<swiper-item v-for="(page,p) in pagges" :key="p">
			<view class="swiper-item d-flex flex-wrap text-center">
				<view v-for="(item,k) in page" :key="k" class="span-5 mt-2">
					<image :src="item.src" mode="" class="image"></image>
					<view>{{item.text}}</view>
				</view>
			</view>
		</swiper-item>
	</swiper> 
</template>

<script>
	export default {
		name:"fast-nav",
		data() {
			return {
				
			};
		},
		props:{
			pagges:{
				type:Array
			}
		}
	}
</script>

<style scoped>
	.image {
		width: 88rpx;
		height:88rpx;
	}
</style>