<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <!-- <div class="ball-container">
            <div class="ball">
                <div class="inner inner-hook"></div>
            </div>
        </div> -->
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty">清空</span>
            </div>
            <div class="list-content">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import cartcontrol  from "../cartcontrol/cartcontrol.vue"
export default {
    components:{
        cartcontrol
    },
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [
                    {
                        price:20,
                        count:0
                    }
                ];
            }
        },
        deliveryPrice:{
           type:Number,
           default:0
       },
        minPrice:{
           type:Number,
           default:0
       }

    },
    computed:{
        totalPrice(){
            var total=0;
            this.selectFoods.forEach(foods=>{
             total+=foods.count*foods.price
            });
            return total
        },
        totalCount(){
            var  count=0;
            this.selectFoods.forEach(foods=>{
             count+=foods.count
            });
            return count
        },
        payDesc(){
            console.log(this.totalPrice)
        }

       
    }
}
</script>
<style lang="scss" scoped>
h1,div,ul,li,body,html{
    margin:0;
    padding:0;
}
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
        display: flex;
        background: #141d27;
        font-size: 0;
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    background: #2b343c;
                    .icon-shopping_cart {
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                        .highlight {
                            color: #fff;
                        }
                    }
                }
                .highlight {
                    background: rgb(0, 160, 220);
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background: rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.4);
            }
            .highlight {
                color: #fff;
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.4);
                font-size: 10px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                color: #fff;
            }
            .not-enough {
                background: #2b333b;
            }
            .enough {
                background: #00b43c;
                color: #fff;
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
        }
        .drop-transition {
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition: all 0.4s linear;
            }
        }
    }
    .shopcart-list {
        position: fixed;
        bottom: 43px;
        z-index: -1;
        left: 0;
        width: 100%;
        .list-header {
            height: 40px;
            background: #f3f5f7;
            line-height: 40px;
            padding: 0 18px;
            border-bottom: 2px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .empty {
                float: right;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
        }
        .list-content {
            padding: 0 18px;
            max-height: 217px;
            background: #fff;
            overflow: hidden;
            .food {
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                list-style: none; // border-1px(rgba(7,17,27,0.1));
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    display: inline-block;
                }
                .price {
                    position: absolute;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    left: 63%;
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    bottom: 4px;
                    right: 0;
                }
            }
        }
    }
}
</style>


