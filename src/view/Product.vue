<template>
    <div class="container page">
      <!-- <HeaderCommon>产品分析</HeaderCommon> -->
      <ol class="tab">
        <li :class="[{'active':tab_index==0}]" @click="evn(0)">按公司</li>
        <li :class="[{'active':tab_index==1}]" @click="evn(1)">按险种</li>
      </ol>
      <div v-if="tab_index==0">
        <SelectC :opts="selectList" @change="changeCompany" :value="companyName" @changeD="changeDate"></SelectC>
        <div class="con animated flipInX">
          <h2><i></i>当月标保前三产品</h2>
          <ul>
            <li v-for="(val,index) in sales_product_company">
              <h2>{{val.product_name}}</h2>
              <div class="progress-container">
                <div class="progress-bg">
                  <div class="progress" :style="calcHeight(val.m_criterion_premium,'月度')"><span class="rt">{{val.m_criterion_premium}}</span></div>
                </div>
              </div>
            </li>
          </ul>
          <i>单位：万元</i>
        </div>
      </div>
      
      <!-- <div class="con animated flipInX">
        <h2><i></i>当年标保</h2>
        <ul>
          <li v-for="(val,index) in sales_channel_y">
            <h2>{{val.channel_name}}</h2>
            <div class="progress-container">
              <div class="progress-bg">
                <div class="progress" :style="calcHeight(val.y_criterion_premium,'年度')"><span class="rt">{{val.y_criterion_premium}}</span></div>
              </div>
            </div>
          </li>
        </ul>
        <i>单位：万元</i>
      </div> -->



      <div v-if="tab_index==1">
        <SelectC :opts="illList" @change="changeIll" :value="illName" @changeD="changeDate"></SelectC>
        <div class="con animated flipInY">
          <h2><i></i>当月产品标保排名</h2>
          <ol class="exhibition">
            <li v-for="(val,index) in sales_product_type">
              <h2><span class="lf">{{val.product_name}}</span></h2>
              <div class="progress-container">
                <div class="progress-bg lf">
                  <div class="progress" :style="calcWidth(val.m_criterion_premium,'月度')"></div>
                </div>
                <span class="rt">{{val.m_criterion_premium}}</span>
              </div>
            </li>
          </ol>
          <i>单位：万元</i>
        </div>
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
        tab_index:0,
        selectList:[],
        illList:[{name:'重疾险'},{name:'年金险'},{name:'终身寿'},{name:'定期寿'},{name:'意外险'},{name:'其他'}],
        illName:'重疾险',
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
    watch:{
      tab_index(newVal){
        newVal==1?this.illName='重疾险':'';
        this.request();
      }
    },
    computed:{
      sales_product_company(){
        return this.$store.state.product_byCom_data.sales_product_company;
      },
      sales_product_type(){
        return this.$store.state.product_byIll_data.sales_product_type;
      },
      sales_channel_y(){
        return this.$store.state.product_byCom_data.sales_channel_y;
      },
      heightMBase(){
        let premuim
        if(this.tab_index==0){
          premuim = this.sales_product_company;
        }else{
          premuim = this.sales_product_type;
        }
        
        
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
      // heightYBase(){
      //   let premuim = this.sales_channel_y;
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
      //   return max;
      // },
      widthMBase(){
        let premuim = this.sales_product_type;
        let max;
        // console.log(premuim)
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
    methods:{
      evn(index){
        this.tab_index = index;
      },
      calcWidth(val,yearOrMonth){
        if(yearOrMonth=='月度'){
          let percent = val/this.widthMBase;
          return `width:${percent*100}%`;
        }else{
          let percent = val/this.widthYBase;
          return `width:${percent*100}%`;
        }
      },
      calcHeight(val,yearOrMonth){
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
      changeIll(val){
        this.illName = val;
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
        if(this.tab_index==0){
          ax('dataInterface/appCPFXByCompany.do',{affiliation_company:this.key,affiliation_date:this.date}).then(res=>{
            if(res.code=='success'){
              this.$store.state.product_byCom_data = res.data;
            }
          })
        }else{
          ax('dataInterface/appCPFXByProductType.do',{product_type:this.illName,affiliation_date:this.date}).then(res=>{
            if(res.code=='success'){
              this.$store.state.product_byIll_data = res.data;
            }
          })
        }
        
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
div.container{
  padding:0 5%;
  ol.tab{
    height:4.5*@rex;margin-bottom:5*@rex;
      li{
        width:50%;float:left;color:@gray;font-size:3.2*@rex;text-align:center;font-weight:bold;
        &.active{
          color:#9269F9;
        }
      }
    }
  .con{
    position:relative;margin-top:5*@rex;
    h2{
      font-size:3.1*@rex;color:#000;margin-bottom: 2*@rex;font-weight:bold;
      i{
        display:inline-block;height:2.8*@rex;width:.7*@rex;margin-right: 1.5*@rex;position: relative;top:.1em;
        background-image:linear-gradient(0deg,#745AFF,#B97AF0);
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
            height:10*@rex;width:8*@rex;background-image:linear-gradient(0deg,#745AFF,#B97AF0);position:absolute;bottom:1px;left:50%;transform:translateX(-50%);
            .rt{
              position:absolute;top:-5*@rex;transform:translateX(-50%);
            }
          }
        }
      }
    }
    ol.exhibition{
      padding-top:3.5*@rex;border-radius:.9*@rex;box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);margin-bottom:8*@rex;
      li{
        font-size:2.4*@rex;height:14.2*@rex;

        span{
          display:inline-block;width:20%;text-align: center;
        }
        .rt{
            // padding-right: 2*@rex;
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
            height:2*@rex;width:0;background-image:linear-gradient(-270deg,#745AFF,#B97AF0);
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