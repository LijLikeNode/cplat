<template>
    <div class="header">
        <img class="back" src="../assets/img/left.png" @click="go_back()">
        <slot>会员登录</slot>
        <!-- <img class="home" name="btn_home" v-if='can_gohome' src="../assets/images/home.png" alt="" @click="changeUrl"> -->
    </div>
</template>
<script>
    export default {
        name: 'headercommon',
        data(){
            return { tabIndex: 0, cIndex: -1 };
        },
        props:['goUrl','canGoHome'],
        computed:{
            can_gohome(){
                return this.canGoHome==false?false:true;
            }
        },
        mounted(){
            // console.log(this.goUrl!='')
        },
        methods: {
            changeTab(n,m){
                this.tabIndex = n;
                this.cIndex = m !== undefined ? m : -1;
            },
            changeUrl:function () {
                this.$router.push('/');
            },
            go_back(){
                window.history.go(-1);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import url(../assets/css/main.less);
    *{margin:0;padding:0;}
    h1{
        font-weight: normal;
    }
    a{text-decoration: none;}
    .header{
        width:100%;height:12.8*@rex;line-height:12.8*@rex;position:relative;text-align:center;background:#ffffff;color:@black;font-weight:bold;margin:0;padding:0;font-size:3.4*@rex;
        img.back{width: 1.4*@rex;position: absolute;left:0;top:4.5*@rex;}
    }
</style>
