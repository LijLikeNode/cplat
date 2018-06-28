<template>
    <div class="page">
      <h1>保险中介同行业交流平台</h1>
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="to_detail(item.toHref)">
          <h2>{{item.title}}</h2>
          <h3>{{item.titleEn}}</h3>
          <img :src="item.iconSrc" alt="">
        </li>
      </ul>
    </div>
  
</template>
<script>

export default {
    name: 'home',
    data(){
      return {
        list:[
          {
            title:'市场概览',
            titleEn:'MARKET OVERVIEW',
            iconSrc:require('../assets/img/home/img01.png'),
            toHref:'/market',
          },
          {
            title:'保费分析',
            titleEn:'PREMIUM ANALYSIS',
            iconSrc:require('../assets/img/home/img02.png'),
            toHref:'/premium',
          },
          {
            title:'渠道分析',
            titleEn:'CHANNEL ANALYSIS',
            iconSrc:require('../assets/img/home/img03.png'),
            toHref:'/channel',
          },
          {
            title:'产品分析',
            titleEn:'PRODUCT ANALYSIS',
            iconSrc:require('../assets/img/home/img04.png'),
            toHref:'/product',
          },
          {
            title:'品质分析',
            titleEn:'QUALITY ANALYSIS',
            iconSrc:require('../assets/img/home/img05.png'),
            toHref:'/quality',
          },
        ],
      }
    },
    mounted(){
      // common.noShare();
      // doShare("","填问卷 抽大奖","新福临门上市有奖评鉴  春暖花开华夏好礼相赠","http://zmt.ihxlife.com/tenyears/#/intro/"+rq().salesmanId+"?type=cust",'http://zmt.ihxlife.com/tenyears/pic.png');
    },
    methods:{
      evn(x){//点击跳转
        x=='intro'?this.to_intro():x=='rank'?this.to_rank():this.to_ybtintro();
      },
      to_detail(href){
        // console.log('to_rank')
        this.$router.push(href);
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.page{
  background: url('../assets/img/home/top_banner.png') no-repeat top center;background-size: 100%;
  h1{
    font-size: 4.6*@rex;color:@white;text-align: center;padding-top:9*@rex;font-weight: bold;
  }
  ul{
    margin-top: 5*@rex;
    li{
      height:22*@rex;margin-bottom: 1*@rex;position:relative;
      &:first-child{background:url('../assets/img/home/index01.png') no-repeat center center;background-size:100%;}
      &:nth-child(2){background:url('../assets/img/home/index02.png') no-repeat center center;background-size:100%;}
      &:nth-child(3){background:url('../assets/img/home/index03.png') no-repeat center center;background-size:100%;}
      &:nth-child(4){background:url('../assets/img/home/index04.png') no-repeat center center;background-size:100%;}
      &:nth-child(5){background:url('../assets/img/home/index05.png') no-repeat center center;background-size:100%;}
      h2{
        position:absolute;top:6*@rex;left:10*@rex;font-size:3.8*@rex;
        font-weight:bold;
      }
      h3{
        position:absolute;top:12*@rex;left:10*@rex;color:@gray;font-size:2.6*@rex;
      }
      img{
        width:18*@rex;height:18*@rex;position:absolute;right: 10*@rex;top:1.5*@rex;
      }
    }
  }
}

</style>
