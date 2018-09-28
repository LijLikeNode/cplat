<template>
    <div class="container page">
      <HeaderCommon>{{$route.params.name}}</HeaderCommon>
      <SelectC :opts="selectList" @change="changeYear" :value="yearOrMonth" @changeD="changeDate"></SelectC>

      <div class="con" v-if="yearOrMonth=='月度'">
        <h2><i></i>当月机构标保排名</h2>
        <ul>
          <li v-for="(val,index) in premium_org_m" :key="$route.params.name+String(index)">
            <h2>{{val.org}}</h2>
            <div class="progress-container">
              <div class="progress-bg lf">
                <div class="progress" :style="calcWidth(val.m_criterion_premium)"></div>
              </div>
              <span class="rt">{{val.m_criterion_premium}}</span>
            </div>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>
      
      <div class="con" v-if="yearOrMonth=='年度'">
        <h2><i></i>当年机构标保排名</h2>
        <ul>
          <li v-for="(val,index) in get_premium_org_y" :key="$route.params.name+String(index)">
            <h2>{{val.org}}</h2>
            <div class="progress-container">
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
        tab_index:'',
        selectList:[{name:'年度'},{name:'月度'}],
        yearOrMonth:'月度',
        date:'',
      }
    },
    components:{HeaderCommon,SelectC},
    created(){
      this.date = common.getPreDate();
      this.request();
    },
    mounted(){
      
    },
    computed:{
      premium_org_m(){
        return this.$store.state.premiumDetail_data.premium_org_m;
      },
      get_premium_org_y(){
        return this.$store.state.premiumDetail_data.get_premium_org_y;
      },
      widthMBase(){
        let premuim = this.premium_org_m;
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
        let premuim = this.get_premium_org_y;
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
      },
    },
    methods:{
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
        this.$store.state.premiumDetail_data={};
        ax('dataInterface/appBFFXByCompany.do',{affiliation_date:this.date,affiliation_company:this.$route.params.key}).then(res=>{
          if(res.code=='success'){
            this.$store.state.premiumDetail_data = {...res.data};
          }
        });
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  padding:0 5%!important;
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
        font-size:2.4*@rex;
        // height:14.2*@rex;
        // height:14.2*@rex;

        span{
          display:inline-block;width:24%;text-align: center;
        }
        .lf{margin-left:4*@rex;}
        h2{
          height:3.7*@rex;line-height:3.7*@rex;display:inline-block;width:20%;font-size:2.6*@rex;vertical-align:top;text-align:center;
          margin-bottom:0;
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
          height:3.7*@rex;line-height:3.7*@rex;width:75%;display:inline-block;margin-top:-.2em;
          div.progress-bg{
            height:2*@rex;width:70%;background: @progressBg;position:relative;top:.9*@rex;margin-left:0;
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
