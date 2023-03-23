<template>
	<view class="home-shop">
		<!-- #ifdef MP -->
		<search-slot>
			<view class="mr-1" slot="left">
				<text class="iconfont icon-xiaoxi"></text>
			</view>
			<view class="flex-1 text-center text-muted search" slot="center" @click="goSearch">
				<text class="iconfont icon-sousuo"></text>
				智能积木
			</view>
			<view class="ml-1" slot="right" @click="sc anCode">
				<text class="iconfont icon-richscan_icon"></text>
			</view>
		</search-slot>
		<!-- #endif -->
		<view>{{address}}</view>
		<scroll-view scroll-x="true" :scroll-into-view="scrollinto" :scroll-with-animation="true">
			<view class="ws search-title">
				<view v-for="(item,index) in navbars" :key="index" class="mx-2 d-inline-block"
					:class="index==currentIndex?'active':''" @click="changeTab(index)" :id="'tab'+index">{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- navbars对应的页面 -->
		<swiper :style="'height:'+scrollH" :current="currentIndex" @change="changeIndex">
			<swiper-item v-for="(newItem,i) in newsItems" :key="i">
				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="'height:'+scrollH">
						<template v-if="newItem.list.length>0">
							<block v-for="(news,j) in newItem.list" :key="j">
								<!-- 轮播图 -->
								<template v-if="news.type=='swiper'">
									<swiper-banner :swipers="news.data"></swiper-banner>
								</template>
								<!-- 金刚区 -->
								<template v-else-if="news.type=='indexnavs'">
									<fast-nav :pagges="pagges"></fast-nav>
									<divider></divider>
								</template>
								<!-- 三图广告 -->
								<template v-else-if="news.type=='threeAdv'">
									<three-adv :news="news"></three-adv>
									<divider></divider>
								</template>
								<template v-else-if="news.type=='oneAdv'">
									<one-adv :title="news.data.title" :cover="news.data.cover"></one-adv>
									<divider></divider>
								</template>
								<template v-else-if="news.type=='list'">
									<common-list :news="news"></common-list>
								</template>
							</block>
						</template>
					</scroll-view>
					<!-- <template v-else>
						<view class="">
							暂无数据
						</view>
					</template> -->
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import {
		getHome
	} from '../../api'
	var QQMapWX = require('../../common/lib/qqmap-wx-jssdk.min.js');
	export default {
		data() {
			return {
				currentIndex: 0,
				scrollinto: '', //跟随
				navbars: [], //顶部导航栏
				scrollH: '', //可视高度
				newsItems: [], //对应标题的页面内容
				qqmapsdk: '',
				address: ''
			}
		},
		onLoad() {
			//计算可视高度
			// #ifdef H5||APP
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.scrollH = res.windowHeight - uni.upx2px(88) + 'px'
				}
			})
			// #endif
			// #ifdef MP
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.scrollH = res.windowHeight - uni.upx2px(176) + 'px'
				}
			})
			// #endif
			this.qqmapsdk = new QQMapWX({
				key: '5FCBZ-DTFA4-GHCU5-FEVF6-ON2NV-R6BGP'
			});
		},
		mounted() {
			this.gethome()
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					this.qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						success: (req) => {
							console.log(req);
							this.address = req.result.address
						}
					})
				}
			});

		},
		computed: {
			// 0                1
			// [[1,2,3,4,5,6,7,8],[9,10]] 
			//计算金刚区
			pagges() {
				let index = this.currentIndex //索引
				let pagge = []
				if (this.newsItems[index]) {
					this.newsItems[index].list.map(item => {
						if (item.type == 'indexnavs') {
							let indexnavspage = Object.values(item.data) //拿到indenavs的数据
							indexnavspage.forEach((v, i) => {
								let page = Math.floor(i / 8)
								if (!pagge[page]) {
									pagge[page] = []
								}
								pagge[page].push(v)
							})
						}
					})
				}
				console.log(pagge);
				return pagge
			}
		},
		//原生点击扫码
		onNavigationBarButtonTap(e) {
			console.log(e);
			if (e.index == 1) {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		},
		methods: {
			//点击跳转到搜索页
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			//点击切换标题
			changeTab(index) {
				if (index == this.currentIndex) return
				this.currentIndex = index
				this.scrollinto = 'tab' + index
				if (this.currentIndex < 6) {
					this.scrollinto = 'tab0'
				} else if (this.currentIndex < 8) {
					this.scrollinto = 'tab4'
				}
			},
			//点击扫码
			scanCode() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			//请求数据
			gethome() {
				getHome().then(res => {
					console.log('res=>', res);
					this.navbars = res.data.category
					for (var i = 0; i < this.navbars.length; i++) {
						var obj = {
							list: []
						}
						if (i == 0) { //获取首页数据
							obj.list = res.data.data
						}
						this.newsItems.push(obj)
					}
					console.log('newsItems=>', this.newsItems);
				})
			},
			//滑动整个大的swiper切换页面
			changeIndex(e) {
				this.currentIndex = e.detail.current
				this.scrollinto = 'tab' + this.currentIndex
			}
		}

	}
</script>

<style lang="scss" scoped>
	.search {
		height: 60rpx;
		line-height: 60rpx;
		background-color: #f5f5f5;
	}

	.search-title {
		height: 88rpx;
		line-height: 70rpx;
	}
</style>
