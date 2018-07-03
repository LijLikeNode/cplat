<template>
    <div class="container page">
      <!-- <HeaderCommon>渠道分析</HeaderCommon> -->
      <SelectC :opts="selectList" @change="changeCompany" :value="companyName" @changeD="changeDate"></SelectC>
      <div class="con animated flipInX">
        <h2><i></i>当月标保</h2>
        <ul>
          <li v-for="(val,index) in sales_channel_m">
            <h2>{{val.channel_name}}</h2>
            <div class="progress-container">
              <div class="progress-bg">
                <div class="progress" :style="calcWidth(val.m_criterion_premium,'月度')"><span class="rt">{{val.m_criterion_premium}}</span></div>
              </div>
            </div>
          </li>
        </ul>
        <i>单位：万元</i>
      </div>
      <div class="con animated flipInX">
        <h2><i></i>当年标保</h2>
        <ul>
          <li v-for="(val,index) in sales_channel_y">
            <h2>{{val.channel_name}}</h2>
            <div class="progress-container">
              <div class="progress-bg">
                <div class="progress" :style="calcWidth(val.y_criterion_premium,'年度')"><span class="rt">{{val.y_criterion_premium}}</span></div>
              </div>
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
        selectList:[],
        companyName:'',
        key:'',
        date:'',
        company:{},
      }
    },
    components:{HeaderCommon,SelectC},
    mounted(){
      this.date = common.getPreDate();
      ax('dataInterface/appGetCompany.do',{}).then(res=>{
        if(res.code=='success'){
          let arr = [];
          let companyArr = res.data;
          this.company = companyArr;
          for(let val of companyArr){
            arr.push({name:val.name});
          }
          this.selectList = arr;
          this.companyName = this.selectList[0].name;
          this.key = this.company[0].code;
          this.request();
        }
      });
      
    },
    computed:{
      sales_channel_m(){
        return this.$store.state.channel_data.sales_channel_m;
      },
      sales_channel_y(){
        return this.$store.state.channel_data.sales_channel_y;
      },
      heightMBase(){
        let premuim = this.sales_channel_m;
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
        return max;
      },
      heightYBase(){
        let premuim = this.sales_channel_y;
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
        return max;
      },
    },
    methods:{
      calcWidth(val,yearOrMonth){
        if(yearOrMonth=='月度'){
          let percent = val/this.heightMBase;
          return `height:${percent*100}%`;
        }else{
          let percent = val/this.heightYBase;
          return `height:${percent*100}%`;
        }
      },
      changeCompany(val){
        this.companyName = val;
        this.getCode(val);
        this.request();
      },
      getCode(name){
        for(let val of this.company){
          val.name==name?this.key=val.code:'';
        }
      },
      changeDate(val){
        this.date = val;
        this.request();
      },
      request(){
        // console.log(this.key)
        ax('dataInterface/appQDFX.do',{affiliation_company:this.key,affiliation_date:this.date}).then(res=>{
          if(res.code=='success'){
            this.$store.state.channel_data = res.data;
          }
        })
      },
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
        background-image:linear-gradient(0deg,#FF4643,#FF966D);
      }
    }
    ul{
      border-radius:.9*@rex;box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);margin-bottom:8*@rex;height:45*@rex;padding:40*@rex 5% 0 5%;
      li{
        font-size:2.6*@rex;height:3.8*@rex;float: left;border-top:1px solid #eee;width:33%;text-align:center;position:relative;
        h2{
          height:3.7*@rex;line-height:3.7*@rex;font-weight:400;
        }
        div.progress-container{
          height:3.7*@rex;line-height:3.7*@rex;position:absolute;top:-40*@rex;height:40*@rex;width:100%;
          div.progress{
            height:10*@rex;width:8*@rex;background-image:linear-gradient(0deg,#FF4643,#FF966D);position:absolute;bottom:1px;left:50%;transform:translateX(-50%);
            .rt{
              position:absolute;top:-5*@rex;transform:translateX(-50%);
            }
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