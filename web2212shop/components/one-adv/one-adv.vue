<template>
	<view class="one-adv">
		<view class="my-1" v-if="title">{{title}}</view>
		<view class="product-image" v-if="cover">
			<image :src="cover" mode="heightFix" class="one-advimage"></image>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "one-adv",
		data() {
			return {

			};
		},
		props: {
			title: {
				type: String
			},
			cover: {
				type: String
			}
		}
	}
</script>

<style scoped>
	.product-image {
		height: 150px;
		position: relative;
		overflow: hidden;
	}

	.one-advimage {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
</style>
