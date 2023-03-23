<template>
	<view class="list">
		<view v-for="(list,listindex) in news.data" :key="listindex" class="listshow">
			<image :src="list.cover" mode="heightFix"></image>
			<text class="title">{{list.title}}</text>
			<view>{{list.desc}}</view>
			<!-- <text>￥{{list.pprice}}</text>
			<text>原价:￥{{list.oprice}}</text> -->
			<p-price>
				<text slot="newprice">
					<text class="money">￥</text>
					<text class="price">{{list.pprice}}</text>
				</text>
				<text slot="oldprice">
					原价:￥{{list.oprice}}
				</text>
			</p-price>
		</view>
	</view>
</template>

<script>
	export default {
		name: "common-list",
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
	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/* text-indent: 10rpx; */
	}

	.list .listshow {
		width: 50%;
		margin: 10rpx 0;
	}

	.list .listshow image {
		max-width: 100%;
		display: block;
		margin: 0 auto;
	}

	.list .listshow view {
		white-space: normal;
		word-break: break-all;
		word-warp: break-word;
		font-size: 28rpx;
	}

	.list .listshow .title {
		display: inline-block;
		/* padding:16rpx 0 10rpx 0; */
		font-size: 32rpx;
		font-weight: 700;
	}
	.money {
		font-size: 20rpx;
	}
	.price {
		font-weight: 900;
	}
</style>
