<template>
    <div class="container page">
      <HeaderCommon>品质分析</HeaderCommon>
      <SelectC :opts="selectList" @change="changeYear" :value="yearOrMonth" @changeD="changeDate"></SelectC>

      <div class="con animated flipInX">
        <h2><i></i>年度13月保费继续率</h2>
        <ul>
          <li v-for="(val,index) in continue_rate_13" :key="String(index)">
            <h2><span class="lf">{{val.name}}</span></h2>
            <div class="progress-container">
              <div class="progress-bg lf">
                <div class="progress" :style="calcWidth(val.thirteen_rate,13)"></div>
              </div>
              <span class="rt">{{val.thirteen_rate}}</span>
            </div>
          </li>
        </ul>
        <!-- <i>单位：万元</i> -->
      </div>
      
      <div class="con animated flipInX">
        <h2><i></i>年度25月保费继续率</h2>
        <ul>
          <li v-for="(val,index) in continue_rate_25" :key="String(index)">
            <h2><span class="lf">{{val.name}}</span></h2>
            <div class="progress-container">
              <div class="progress-bg lf">
                <div class="progress" :style="calcWidth(val.twentyfive,25)"></div>
              </div>
              <span class="rt">{{val.twentyfive}}</span>
            </div>
          </li>
        </ul>
        <!-- <i>单位：万元</i> -->
      </div>
      
    </div>
  
</template>
<script>
import HeaderCommon from '@/components/HeaderCommon'
import SelectC from '@/components/SelectC'
export default {
    name: 'market',
    data(){
      return {
        tab_index:'',
        selectList:[{name:'年度'},{name:'月度'}],
        yearOrMonth:'月度',
        date:'',
      }
    },
    components:{HeaderCommon,SelectC},
    created(){
      this.request();
    },
    mounted(){
      this.date = common.getPreDate();
    },
    computed:{
      continue_rate_13(){
        return this.$store.state.quality_data.continue_rate_13;
      },
      continue_rate_25(){
        return this.$store.state.quality_data.continue_rate_25;
      },
      // widthMBase(){
      //   let premuim = this.continue_rate_13;
      //   let max;
      //   for(let i in premuim){
      //     if(max){
      //       if(premuim[i].m_criterion_premium>max){
      //         max = premuim[i].m_criterion_premium;
      //       }
      //     }else{
      //       max = premuim[i].m_criterion_premium;
      //     }
      //   }
      //   max/=0.8;
      //   // console.log(max);
      //   return max;
      // },
      // widthYBase(){
      //   let premuim = this.get_premium_org_y;
      //   let max;
      //   for(let i in premuim){
      //     if(max){
      //       if(premuim[i].y_criterion_premium>max){
      //         max = premuim[i].y_criterion_premium;
      //       }
      //     }else{
      //       max = premuim[i].y_criterion_premium;
      //     }
      //   }
      //   max/=0.8;
      //   // console.log(max);
      //   return max;
      // },
    },
    watch:{
      date:{
        handler(newVal){
          this.request();
        },
      },
      yearOrMonth:{
        handler(newVal){
          this.request();
        },
      },
    },
    methods:{
      calcWidth(val,num){
        if(num==13){
          // let percent = val/this.widthMBase;
          return `width:${val*100/100}%`;
        }else{
          return `width:${val*100/100}%`;
        }
      },
      evn(index){
        this.tab_index = index;
      },
      changeYear(val){
        this.yearOrMonth = val;
      },
      changeDate(val){
        this.date = val;
      },
      request(){
        this.$store.state.quality_data={};
        ax('dataInterface/appPinzhiFenxi.do',{affiliation_date:this.date,date_type:this.yearOrMonth=='月度'?'M':'Y'}).then(res=>{
          if(res.code=='success'){
            this.$store.state.quality_data = {...res.data};
          }
        });
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  padding:0 5%;
  .con{
    position:relative;margin-top:5*@rex;
    h2{
      font-size:3.1*@rex;color:#000;margin-bottom: 2*@rex;font-weight:bold;
      i{
        display:inline-block;height:2.8*@rex;width:.7*@rex;margin-right: 1.5*@rex;position: relative;top:.1em;
        background-image:linear-gradient(0deg,#2A6FFF,#55C2FF);
      }
    }
    ul{
      padding-top:3.5*@rex;border-radius:.9*@rex;box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);margin-bottom:8*@rex;
      li{
        font-size:2.4*@rex;height:14.2*@rex;

        span{
          display:inline-block;width:24%;text-align: center;
        }
        .lf{margin-left:4*@rex;}
        h2{
          height:3.7*@rex;line-height:3.7*@rex;margin-bottom:1*@rex;
          span{
            &.rt{
              color:@gray;font-size:2*@rex;
            }
            &.lf{
              font-size:2.6*@rex;text-align:left;
            }
          }
        }
        div.progress-container{
          height:3.7*@rex;line-height:3.7*@rex;
          div.progress-bg{
            height:2*@rex;width:47*@rex;background: @progressBg;position:relative;top:.9*@rex;
          }
          div.progress{
            height:2*@rex;width:0;background-image:linear-gradient(-270deg,#2A6FFF,#55C2FF);
          }
        }
      }
    }
    i{
      position:absolute;bottom:-5*@rex;right:0;font-size:2*@rex;color:@gray;
    }
  }
}
</style>
