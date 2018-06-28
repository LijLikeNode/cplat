<template>
    <div class="container animated bounceInUp">
      <div class="con">
        <h2><i></i>当月重疾前三</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>产品</span>
            <span>标准保费</span>
          </li>
          <li v-for="(val,index) in sales_product_m_zjx_3rd" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.product_name}}</span>
            <span>{{val.m_criterion_premium}}</span>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>


      <div class="con">
        <h2><i></i>当月年金前三</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>产品</span>
            <span>标准保费</span>
          </li>
          <li v-for="(val,index) in sales_product_m_njx_3rd" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.product_name}}</span>
            <span>{{val.y_criterion_premium}}</span>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>

      <div class="con">
        <h2><i></i>当月终身寿前三</h2>
        <ul>
          <li class="title">
            <span>排名</span>
            <span>保险公司</span>
            <span>产品</span>
            <span>标准保费</span>
          </li>
          <li v-for="(val,index) in sales_product_m_zss_3rd" :class="[{'double':index%2==0}]">
            <span>{{index+1}}</span>
            <span>{{val.name}}</span>
            <span>{{val.product_name}}</span>
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
      sales_product_m_zjx_3rd(){
        return this.$store.state.market_data.sales_product_m_zjx_3rd;
      },
      sales_product_m_njx_3rd(){
        return this.$store.state.market_data.sales_product_m_njx_3rd;
      },
      sales_product_m_zss_3rd(){
        return this.$store.state.market_data.sales_product_m_zss_3rd;
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
        font-size:2.4*@rex;height:6*@rex;line-height: 6*@rex;color:@gray;
        &.title{
          font-size:2.6*@rex;color:#000000;font-weight:bold;height:7*@rex;line-height: 7*@rex;
        }
        &.double{
          background-color: #F9F9F9;
        }

        span{
          display:inline-block;width:23.5%;text-align: center;
        }
      }
    }
    i{
      position:absolute;bottom:-4*@rex;right:0;font-size:2*@rex;color:@gray;
    }
  }
}
</style>