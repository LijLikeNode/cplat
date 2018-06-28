<template>
    <div class="container animated bounceInUp">
      <div class="con">
        <div class="popBg">
          截至<b>{{current_year}}</b>年<b>{{current_month}}</b>月，中介市场当月新单标保<b>{{premium_sum_m}}</b>万元，年度新单标保<b>{{premium_sum_y}}</b>万元。
        </div>
      </div>
      <div class="con">
        <h2><i></i>当月标保前三</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>标准保费</span>
          </li>
          <li v-for="(val,index) in premium_3rd_m" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.m_criterion_premium}}</span>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>


      <div class="con">
        <h2><i></i>当年标保前三</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>标准保费</span>
          </li>
          <li v-for="(val,index) in premium_3rd_y" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.y_criterion_premium}}</span>
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
        current_year:'',
        current_month:'',
      }
    },
    created(){
      this.getDate();
    },
    mounted(){
      
    },
    computed:{
      premium_3rd_m(){
        return this.$store.state.market_data.premium_3rd_m;
      },
      premium_3rd_y(){
        return this.$store.state.market_data.premium_3rd_y;
      },
      premium_sum_m(){
        return this.$store.state.market_data.premium_sum_m;
      },
      premium_sum_y(){
        return this.$store.state.market_data.premium_sum_y;
      },
    },
    methods:{
      getDate(){
        let now = new Date();
        this.current_year = now.getFullYear();
        this.current_month = now.getMonth()+1;
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../../assets/css/main.less);
div.container{
  .con{
    position:relative;margin-top:3*@rex;
    &:last-child{
      margin-top:7*@rex;
    }
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
        font-size:2.4*@rex;height:6*@rex;line-height: 6*@rex;color:@gray;
        &.title{
          font-size:2.6*@rex;color:#000000;font-weight:bold;height:7*@rex;line-height: 7*@rex;
        }
        &.double{
          background-color: #F9F9F9;
        }

        span{
          display:inline-block;width:32%;text-align: center;
        }
      }
    }
    i{
      position:absolute;bottom:-4*@rex;right:0;font-size:2*@rex;color:@gray;
    }
  }
}
</style>