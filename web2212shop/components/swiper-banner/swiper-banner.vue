<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
		<swiper-item v-for="(swiper,k) in swipers" :key="k">
			<view class="swiper-item">
				<image :src="swiper.src" mode="heightFix"></image>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "swiper-banner",
		data() {
			return {

			};
		},
		props: {
			swipers: {
				type: Object
			}
		}
	}
</script>

<style>

</style>
