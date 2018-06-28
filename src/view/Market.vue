<template>
    <div class="container page">
      <HeaderCommon>市场概览</HeaderCommon>
      <ul class="tab">
        <li :class="[{'active':tab_index==0}]" @click="evn(0)">保费分析</li>
        <li :class="[{'active':tab_index==1}]" @click="evn(1)">产品分析</li>
        <li :class="[{'active':tab_index==2}]" @click="evn(2)">品质分析</li>
      </ul>


      <!-- <transition name="bounce animated"> -->
        <PremiumAnalysis v-if="tab_index==0"></PremiumAnalysis>
      <!-- </transition> -->
      <!-- <transition name="bounce"> -->
        <ProductAnalysis v-if="tab_index==1"></ProductAnalysis>
      <!-- </transition> -->
      <!-- <transition name="bounce"> -->
        <QualityAnalysis v-if="tab_index==2"></QualityAnalysis>
      <!-- </transition> -->
      
      
      
    </div>
  
</template>
<script>
import HeaderCommon from '@/components/HeaderCommon'
import PremiumAnalysis from '@/components/market/PremiumAnalysis'
import ProductAnalysis from '@/components/market/ProductAnalysis'
import QualityAnalysis from '@/components/market/QualityAnalysis'
export default {
    name: 'market',
    data(){
      return {
        tab_index:'',
      }
    },
    components:{HeaderCommon,PremiumAnalysis,ProductAnalysis,QualityAnalysis},
    mounted(){
      ax('dataInterface/appSCGL.do',{affiliation_date:common.getCurDate()}).then(res=>{
        if(res.code=='success'){
          this.$store.state.market_data = res.data;
          this.tab_index=0;
        }
      })
    },
    methods:{
      evn(index){
        this.tab_index = index;
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.page{
  padding:0 5%;
  ul.tab{
    display:flex;justify-content: space-between;margin-top:2*@rex;
    li{
      width:21.6*@rex;height:9*@rex;line-height:9*@rex;background:@bggray; background-size: 110%;text-align: center;color:@gray;font-size: 3.2*@rex;border-radius:1*@rex;
      &.active{
        background: url('../assets/img/market/btn_bg.png') no-repeat center center; background-size: 110%;color:@white;
      }
    }
  }
}
</style>
