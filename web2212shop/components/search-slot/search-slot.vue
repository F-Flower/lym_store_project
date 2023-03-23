<template>
	<view class="search-input d-flex px-2 j-sb a-center">
		<slot name="left">1122</slot>
		<slot name="center"></slot>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		name: "search-slot",
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.search-input {
		height: 88rpx;
	}
</style>
