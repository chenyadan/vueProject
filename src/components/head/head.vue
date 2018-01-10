<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
            <div class="content">
                <div v-if="seller.supports" class="support-count" @click="showDetial">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper"  @click="showDetial">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :score="2.6" :size="48"></star>
                    </div>
                    <div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="supports">
						<li class="support-item" v-for="(item,index) in seller.supports">
							<span class="icon" track-by="id" :class="classMap[index]"></span>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
                    <div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
                    <div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>	
                </div>
            </div>
            <div class="detial-close" @click="hideDetail">
				<i class="icon-close"></i>
			</div>
        </div>
    </div>
</template>
<script>
import star from '../star/star.vue'
export default {
    components:{
        star
    },
    props: {
        seller: {
            type: Object
        }
    },
    data(){
        return{
            detailShow:false
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods:{
        showDetial(){
            this.detailShow=true;
        },
        hideDetail(){
            this.detailShow=false;
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/scss/mixin.scss';
div,
body,
html,
ul,
li,
a,
span {
    padding: 0;
    margin: 0;
}

.header {
    color: #fff;
    position: relative;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper {
        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    width: 30px;
                    height: 18px;
                    vertical-align: top;
                    display: inline-block;
                    @include bg-image('brand');
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description {
                font-size: 12px;
                margin-bottom: 10px;
                line-height: 12px;
            }
            .support {
                font-size: 0;
                margin-top: 10px;
                .icon {
                    display: inline-block;
                    font-size: 12px;
                    vertical-align: top;
                    height: 12px;
                    line-height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    width: 12px;
                }
                .decrease {
                    @include bg-image('decrease_1')
                }
                .discount {
                    @include bg-image('discount_1')
                }
                .guarantee {
                    @include bg-image('guarantee_1')
                }
                .invoice {
                    @include bg-image('invoice_1')
                }
                .special {
                    @include bg-image('special_1')
                }
                .text {
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 18px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
        }
    }
    .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
        position: relative;
        background: rgba(7, 17, 27, 0.2);
        .bulletin-title {
            display: inline-block;
            width: 22px;
            height: 12px;
            @include bg-image('bulletin');
            background-repeat: no-repeat;
            background-size: 22px 12px;
            vertical-align: top;
            margin-top: 8px;
        }
        .bulletin-text {
            margin: 0 4px;
            font-size: 10px;
            vertical-align: top;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            font-size: 10px;
            right: 12px;
            top: 8px;
        }
    }
    .background{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:-1;
        filter:blur(10px);
    }
    .detail{
        position:fixed;
        height:100%;
        width:100%;
        z-index:100;
        top:0;
        left:0;
        overflow:auto;
        transition:all 0.5s;
        background:rgba(7,17,27,0.8);
        .detail-wrapper{
            min-height:100%;
            .detail-main{
                margin-top:64px;
				padding-bottom:64px;
                .name{
                    line-height:16px;
                    text-align:center;
                    font-size:16px;
                    font-weight:700;
                }
                .star-wrapper{
                    margin-top:32px;
                    padding:2px 0;
                    text-align:center;
                }
                .title{
                    display:flex;
                    width:80%;
                    margin:30px auto 24px auto;
                    .line{
                        flex:1;
                        position:relative;
                        top:-6px;
                        border-bottom:1px solid rgba(255,255,255,0.2);
                    }
                    .text{
                        padding:0 12px;
                        font-size:14px;
                        font-weight:700;
                    }
                }
                .supports{
                    width:80%;
					margin:0 auto;
                    .support-item{
                        padding:0 12px;
                        margin-bottom:12px;
                        font-size:0;
                        &:last-child{
                            margin-bottom:10px;
                        }
                        .icon{
                            display:inline-block;
                            width:16px;
                            height:16px;
                            vertical-align:top;
                            margin-right:6px;
                            background-size:16px 16px;
                            background-repeat:no-repeat;
                        }
                        .decrease{
							@include bg-image('decrease_2')
                        }
                        .discount{
							@include bg-image('discount_2')
                        }
                        .guarantee{
							@include bg-image('guarantee_2')
                        }
                        .invoice{
							@include bg-image('invoice_2')
                        }
                        .special{
							@include bg-image('special_2')
                        }
                        .text{
                            line-height:16px;
                            font-size:12px;
                        }
                    }

                }
                .bulletin{
                    width:80%;
                    margin:0 auto;
                    .content{
                        padding:0 12px;
                        line-height:24px;
                        font-size:12px;
                    }
                }
            }
        }
        .detial-close{
            position:relative;
            width:24px;
            height:24px;
            margin: 0 auto 0 auto;
            clear:both;
            font-size:23px;
            border:1px solid #fff;
        }
    }
}
</style>
