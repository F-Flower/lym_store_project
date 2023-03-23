<template>
	<view class="d-flex">
		<view class="newprice mr-1">
			<slot name="newprice"></slot>
		</view>
		<view class="oldprice">
			<slot name="oldprice"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"p-price",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.newprice {
	color:#f60;
}
.oldprice {
	color:#ccc;
	text-decoration: line-through;
}
</style>