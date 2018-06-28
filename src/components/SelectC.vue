<template>
    <div class="container">
        <input class="selects" :value="value" readonly="readonly" ref="ss" @input="$emit('input', $event.target.value)"><b class="first"></b>
        <yd-datetime type="month" v-model="date" class="selects" ref="datetime" :callback="change" :startDate="startDate" :endDate="endDate"></yd-datetime><b @click="$refs.datetime.open();"></b>
    </div>
</template>
<script>
    export default {
        name: 'selects',
        data(){
            return {
                date:'',
                startDate:'2018-05-01',
                endDate:'2018-06-30',
            };
        },
        props:['opts','value'],
        computed:{
            
        },
        watch:{
            opts(newVal,oldVal){
                // 更新滚轮
                let m=$(this.$refs.ss).data('mPicker').updateData(this.opts);
            },
        },
        mounted(){
            this.date = common.getpreDateAll();
            this.endDate = common.getTodayDate();



            // let date = new Date();
            // let seperator1 = "-";
            // let year = date.getFullYear();
            // let preMonth = date.getMonth();
            // let month = date.getMonth() + 1;
            // let strDate = date.getDate();
            // if (month >= 1 && month <= 9) {
            //     month = "0" + month;
            // }
            // if (strDate >= 0 && strDate <= 9) {
            //     strDate = "0" + strDate;
            // }
            // this.endDate = String(year) + String(seperator1) + String(month);
            // this.date = String(year) + String(seperator1) + String(preMonth);
            console.log(this.date,this.endDate)
            let fs=Math.ceil($(window).width()*0.037*2.4),el=$(this.$refs.ss),_this=this;
                this.mpk=el.mPicker({
                    level:1,
                    dataJson:this.opts,
                    // data1:this.opts,
                    Linkage:false,
                    rows:6,
                    height: fs,
                    idDefault:true,
                    header:'<div class="mPicker-header">'+(_this.title || '请选择')+'</div>',
                    confirm:function(){
                        //console.log(el.data('value1'));
                        _this.$emit('change',el.val(),el.data('value1'),el.data('id1'));
                    },
                    cancel:function(){
                        //console.info($('.select-value3').data('id1'));
                    }
                });
            // }
            
            // console.log(el)
            let sty='<style id="mpickfix">body .mPicker-content li{line-height:'+fs+'px;}</style>';
            if($('#mpickfix').length==0) $('head').append(sty);

            $('.mPicker-mask').off('click touchend').on('click touchend',function(){
                $(this).addClass('hide');
                $('.mPicker-main').addClass('down');
                setTimeout(()=>{
                    $('.mPicker').addClass('hide');
                $('.mPicker-main').remove();
            },500);
            });
        },
        methods: {
            change(){
                this.$emit('changeD',this.date);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url(../assets/css/main.less);
div.container{
    position:relative;height:7*@rex;
    .selects{
        position:absolute;width:26.6*@rex;height:7*@rex;line-height: 7*@rex;border-radius:1*@rex;box-shadow:0 1.2*@rex 2*@rex 0 rgba(0,0,0,0.07);border-radius:10px;text-align:center;font-weight: bold;outline: none;border:none;font-size:3*@rex;
        &:first-child{
            left:2*@rex;
        }
        &:nth-child(3){
            right:2*@rex;
        }
        +b{
             position:absolute;width:0;height:0;border:.9*@rex solid transparent;border-top:.9*@rex solid #989BAA;top:3.3*@rex;right:4*@rex;
             &.first{
                left:24*@rex;
             }
        }
    }
} 
</style>
