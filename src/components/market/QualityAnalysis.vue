<template>
    <div class="container animated bounceInUp">
      <div class="con">
        <h2><i></i>年度13月继续率前三公司</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>13月保费继续率</span>
            <span>行业均值</span>
          </li>
          <li v-for="(val,index) in continue_rate_y_13_3rd" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.y_thirteen_rate}}</span>
            <span>{{val.y_thirteen_rate_avg}}</span>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>


      <div class="con">
        <h2><i></i>年度25月继续率前三公司</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>25月保费继续率</span>
            <span>行业均值</span>
          </li>
          <li v-for="(val,index) in continue_rate_y_25_3rd" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.y_twentyfive}}</span>
            <span>{{val.y_twentyfive_avg}}</span>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>
    </div>
</template>
<script>

export default {
    name: 'market-premium',
    data(){
      return {
        
      }
    },
    created(){
      
    },
    mounted(){
      
    },
    computed:{
      continue_rate_y_13_3rd(){
        return this.$store.state.market_data.continue_rate_y_13_3rd;
      },
      continue_rate_y_25_3rd(){
        return this.$store.state.market_data.continue_rate_y_25_3rd;
      },
    },
    methods:{
      
    }
}
</script>

<style lang='less' scoped>
@import url(../../assets/css/main.less);
div.container{
  .con{
    position:relative;margin-top:5*@rex;
    // &:last-child{
    //   margin-top:7*@rex;
    // }
    div.popBg{
      height:16.2*@rex;padding-top:4.5*@rex;padding-left:.7em;background:url('../../assets/img/market/pop_bg.png') no-repeat center center;background-size:110%;box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);color:@white;letter-spacing: .1*@rex;
      b{
        font-size:3.4*@rex;
      }
    }
    h2{
      font-size:3.1*@rex;color:#000;margin-bottom: 2*@rex;font-weight:bold;
      i{
        display:inline-block;height:2.8*@rex;width:.7*@rex;margin-right: 1.5*@rex;position: relative;top:.1em;
        background-image:linear-gradient(0deg,#FF5568,#FF86AB);
      }
    }
    ul{
      box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);
      li{
        font-size:2.4*@rex;padding:.8em 0;color:@gray;
        &.title{
          font-size:2.6*@rex;color:#000000;font-weight:bold;
        }
        &.double{
          background-color: #F9F9F9;
        }

        span{
          display:inline-block;width:23.5%;text-align: center;vertical-align:top;
          &:first-child{width:21%;}
          &:nth-child(2){width:21%;}
          &:nth-child(3){width:30.5%;}
          &:last-child{width:20%;}
        }
      }
    }
    i{
      position:absolute;bottom:-4*@rex;right:0;font-size:2*@rex;color:@gray;
    }
  }
}
</style>