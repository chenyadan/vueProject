<template>
<div>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
                    @click="selectMenu(index,$event)" ref="menuList">
                    <span class="text">
                        <span class="icon" v-show="item.type>0" :class="classMap[item.type]">
                        </span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list" ref="foodList">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" @click="selectFood(food,$event)" v-for="food in item.foods">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
                                <div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
                                <div class="cartcontrol-wrapper">
									<cart-control :food="food"></cart-control>	
								</div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-cart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    </div>
    <food :food="selectedFood" ref='food'></food>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import cartControl  from "../cartcontrol/cartcontrol.vue"
import shopCart  from "../shopcart/shopcart.vue"
import eventHub1 from '../../common/js/eventHub.js'
import food from '../food/food.vue';
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight:[],
            scrollY:0,
            selectedFood: {}
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        this.$http.get('/api/goods').then(response => {
            response = response.body;
            this.goods = response.data;
           
            this.$nextTick(()=>{
                this._initScroll()
                this._calculateHeight(); 
            })   
        })   
    },
    computed:{
        //左边菜单栏根据右边的滑动的高度进行区域的判断，然后进行颜色变化（左右进行联动）
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                 let height1=this.listHeight[i];
                 let height2=this.listHeight[i+1];
                 if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
                     this._followScroll(i)
                     return i;
                 }
            }
            return 0;
         },
        selectFoods(){
            let foods=[];
            this.goods.forEach((good)=> {
                good.foods.forEach((food)=>{
                    if(food.count){
                        // console.log(food)
                        foods.push(food)
                    }
                })
            });
            return foods
        }
    },
    methods:{
        selectFood(food,event){
            if (!event._constructed) {
                return;
            }
            this.selectedFood=food;
            this.$refs.food.show();
            // this.$root.eventHub.$emit('foods',this.goods)
        },
        //点击左边菜单联动右边
        selectMenu(index,event){
            if(!event._constructed){
                return;
            }
            let foodList=this.$refs.foodList;
            let el=foodList[index];
            this.foodsScroll.scrollToElement(el,200);
        },
        //获取左边每个系列在y轴上的高度放到数组里
        _calculateHeight(){
            let foodList=this.$refs.foodList;  //拿到"ref=foodList元素下的所有第一个子元素"
            // console.log(foodList)
            let height=0;  
            this.listHeight.push(height)
            for(let i=0;i<foodList.length;i++){
                let item=foodList[i];
                height+=item.clientHeight;
                this.listHeight.push(height);
            }
        },
        //初始化BScroll
        _initScroll(){
            this.menuScroll=new BScroll(this.$refs.menuWrapper,{
                click:true
            });
            this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
                click:true,
                probeType:3
            })
            this.foodsScroll.on('scroll',(pos)=>{
                if(pos.y<=0){
                    this.scrollY=Math.abs(Math.round(pos.y))
                }
            })
        },
        //右边滚动左边也发生联动
        _followScroll(index){
            let menuList=this.$refs.menuList;
            // console.log(menuList)
            let el = menuList[index];
            this.menuScroll.scrollToElement(el,200,0,-100);
        }
    },
    components:{
        cartControl,
        shopCart,
        food
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../common/scss/mixin.scss';
.goods {
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    display: flex;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            line-height: 14px;
            padding: 0 12px;
            .text{
                font-size:12px;
                display:table-cell;
                width:56px;
                vertical-align:middle;
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    height: 12px;
                    width: 12px;
                    line-height: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                }
                .decrease {
                    @include bg-image('decrease_3')
                }
                .discount {
                    @include bg-image('discount_3')
                }
                .guarantee {
                    @include bg-image('guarantee_3')
                }
                .invoice {
                    @include bg-image('invoice_3')
                }
                .special {
                    @include bg-image('special_3')
                }
            }
            
        }
        .current{
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background: #fff;
            font-weight: 700;
        }
    }
    .foods-wrapper{
        flex:1;
	    overflow:auto;
        .title{
            padding-left:14px;
            margin: 0px;
            height:26px;
            line-height:26px;
            border-left:2px solid #d9dde1;
            font-size:12px;
            color:rgb(147,153,159);
            background:#f3f5f7;
        }
        .food-item{
            display:flex;
            margin:18px;
            padding-bottom:18px;
            position: relative;
            &:last-child{
                margin-bottom:0;
            }
            .icon{
                flex:0 0 57px;
			    margin-right:10px;
            }
            .content{
                flex:1;
                .name{
                    margin:2px 0 8px 0;
                    height:14px;
                    line-height:14px;
                    font-size:14px;
                    color:rgb(7,17,27);
                }
                .desc{
                    margin-bottom:8px;
                    line-height:10px;
                    height:10px;
                    font-size:10px;
                    color:rgb(147,153,159);
                }
                .extra{
                    line-height:10px;
                    height:10px;
                    font-size:10px;
                    color:rgb(147,153,159);
                    .count{
                        margin-right:12px;
                    }
                }
                .price{
                    font-weight:700;
					line-height:24px;
                    .now{
                        margin-right:8px;
                        font-size:14px;
                        color:rgb(240,20,20);
                    }
                    .old{
                        text-decoration:line-through;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                }
                .cartcontrol-wrapper{
                    position:absolute;
                    right:0;
                    bottom:12px;
                }
            }
        }
    }
}
</style>
