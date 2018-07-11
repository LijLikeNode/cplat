<template>
    <div class="container page">
      <!-- <HeaderCommon>保费分析</HeaderCommon> -->
      <SelectC :opts="selectList" @change="changeYear" :value="yearOrMonth" @changeD="changeDate"></SelectC>

      <div class="con animated flipInX" v-if="yearOrMonth=='月度'">
        <h2><i></i>当月标保</h2>
        <ul>
          <li v-for="(val,index) in premium_m">
            <h2>
              <!-- <span class="lf">{{val.name}}</span> -->
              <span class="rt" @click="to_detail(val.affiliation_company,val.name)">详情></span>
            </h2>
            <div class="progress-container">
              <span>{{val.name}}</span>
              <div class="progress-bg lf">
                <div class="progress" :style="calcWidth(val.m_criterion_premium)"></div>
              </div>
              <span class="rt">{{val.m_criterion_premium}}</span>
            </div>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>
      
      <div class="con animated flipInY" v-if="yearOrMonth=='年度'">
        <h2><i></i>当年标保</h2>
        <ul>
          <li v-for="(val,index) in premium_y">
            <h2>
              <!-- <span class="lf">{{val.name}}</span> -->
              <span class="rt" @click="to_detail(val.affiliation_company,val.name)">详情></span>
            </h2>
            <div class="progress-container">
              <span>{{val.name}}</span>
              <div class="progress-bg lf">
                <div class="progress" :style="calcWidth(val.y_criterion_premium)"></div>
              </div>
              <span class="rt">{{val.y_criterion_premium}}</span>
            </div>
          </li>
        </ul>
        <i>单位：万元</i>
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
        // tab_index:'',
        selectList:[{name:'年度'},{name:'月度'}],
        yearOrMonth:'月度',
        date:'',
      }
    },
    components:{HeaderCommon,SelectC},
    mounted(){
      // console.log(this.widthMBase)
      this.date = common.getPreDate();
    },
    computed:{
      premium_m(){
        return this.$store.state.premium_data.premium_m;
      },
      premium_y(){
        return this.$store.state.premium_data.premium_y;
      },
      widthMBase(){
        let premuim = this.premium_m;
        let max;
        for(let i in premuim){
          if(max){
            if(premuim[i].m_criterion_premium>max){
              max = premuim[i].m_criterion_premium;
            }
          }else{
            max = premuim[i].m_criterion_premium;
          }
        }
        max/=0.8;
        // console.log(max);
        return max;
      },
      widthYBase(){
        let premuim = this.premium_y;
        let max;
        for(let i in premuim){
          if(max){
            if(premuim[i].y_criterion_premium>max){
              max = premuim[i].y_criterion_premium;
            }
          }else{
            max = premuim[i].y_criterion_premium;
          }
        }
        max/=0.8;
        // console.log(max);
        return max;
      },
    },
    watch:{
      date:{
        handler(newVal){
          this.request();
        },
        immediate:true
      },
    },
    methods:{
      to_detail(key,name){
        // console.log(key,name);
        this.$router.push(`/premiumdetail/${key}/${name}`);
      },
      calcWidth(val){
        if(this.yearOrMonth=='月度'){
          let percent = val/this.widthMBase;
          return `width:${percent*100}%`;
        }else{
          let percent = val/this.widthYBase;
          return `width:${percent*100}%`;
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
        ax('dataInterface/appBFFX.do',{affiliation_date:this.date}).then(res=>{
          if(res.code=='success'){
            this.$store.state.premium_data = res.data;
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
      
      li{
        font-size:2.4*@rex;height:16.2*@rex;box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);margin-bottom:5*@rex;padding-top:3.5*@rex;border-radius:.9*@rex;

        span{
          display:inline-block;width:20%;text-align: center;
        }
        .lf{margin-left:4*@rex;}
        h2{
          height:3.7*@rex;line-height:3.7*@rex;margin-bottom:.5em;
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
          span{
            float: left;width:20%;
          }
          div.progress-bg{
            height:2*@rex;width:54%;background: @progressBg;position:relative;top:.9*@rex;margin-left: 0;
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
