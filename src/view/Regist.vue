<template>
    <div class="page">
      <h1>注册</h1>
      <ul>
        <li class="tel">
          <span>+86</span><input type="text" v-model="mobile" placeholder="请输入手机号">
        </li>
        <li class="picCode">
          <input type="text" v-model="imgCode" placeholder="请输入图片验证码"><span><img :src="imgBase64Src" alt=""/></span>
        </li>
        <li class="msgCode">
          <input type="text" v-model="msgCode" placeholder="请输入短信验证码"><span class="rt" @click="sendMsgCode">{{sendcode}}</span>
        </li>
      </ul>
      <button id="registBtn" @click="regist" :class="[{'bgGreen':canRegist}]">注册</button>
    </div>
  
</template>
<script>

export default {
    name: 'regist',
    data(){
      return {
        sendcode:'发送验证码',
        imgBase64Src:'',
        mobile:'',
        imgCode:'',
        msgCode:'',
        timer:'',
      }
    },
    mounted(){
      this.getImg();
    },
    computed:{
      openid(){
        return common.getRequest().openid;
      },
      canRegist(){
        let cc = false;
        if(this.mobile!=''&&this.imgCode!=''&&this.msgCode!='') cc = true;
        return cc;
      },
    },
    methods:{
      evn(x){//点击跳转
        
      },
      getImg(){
        this.imgBase64Src = baseUrl+'user/appRci.do?openid='+this.openid;
      },
      sendMsgCode(){
        this.checkInfo();
      },
      checkInfo(){
        if(typeof(this.sendcode)=="number"){
          return;
        }
        if(!this.mobile){
          popalert.fade('请输入手机号');
          return;
        }
        if(!(/^1[345789][0-9]{9}$/.test(this.mobile))){
          popalert.fade('请输入正确的手机号');
          return;
        }
        if(!this.imgCode){
          popalert.fade('请输入图片验证码');
          return;
        }
        this.request();
      },
      request(){
        let data = {
          phone:this.mobile,
          imgCode:this.imgCode,
          openid:this.openid
        }
        ax('user/appSendPhoneCode.do',data).then(res=>{
          res.code=='success'?this.startCount():'';
        })
      },
      startCount(){
        this.sendcode = 60;
        this.timer = setInterval(()=>{
          if(this.sendcode>0) this.sendcode--;
          else this.sendcode = '发送验证码';
        },1000);
      },
      regist(){
        if(this.canRegist){
          let data = {
            phone:this.mobile,
            code:this.msgCode,
            openid:this.openid
          }
          ax('user/appUserSave.do',data).then(res=>{
            if(res.code=='success'){
              popalert.fade(res.msg);
              setTimeout(()=>{
                this.$router.push('/');
              },3000);
            }else{
              clearInterval(this.timer);
              this.sendcode = '发送验证码';
              popalert.fade(res.msg);
            }
          });
        }        
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);

div.page{
  padding: 10% 10%;
  h1{
    font-size: 5*@rex;font-weight: bold;height: 12*@rex;line-height: 12*@rex;
  }
  input{
    border: none ;outline: none;font-size:3*@rex; 
  }
  ul{
    margin-top:4*@rex;
    li{
      height:10*@rex;line-height:10*@rex;border-bottom: 1px solid @bggray;
      &.tel{
        span{
          margin-right: 5*@rex;
        }
      }
      &.msgCode{
        span{
          color:#4a90e2;width:5.7em;text-align: center;
        }
      }
      &.picCode{
        span{
          float: right;width:5.7em;overflow: hidden;
          img{
            width:6em;
          }
        }
      }
    }
  }
  #registBtn{
    width: 100%;background:#e6e6e6;border:none;color:@white;height:9*@rex;margin-top:13*@rex;border-radius:9*@rex;outline:none;
    &.bgGreen{
      background:#31c27c;
    }
  }
}

</style>
