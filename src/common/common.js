const common = {};

// common.noShare = ()=>{
// 	if (typeof WeixinJSBridge == "undefined"){
// 	  if( document.addEventListener ){
// 	      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
// 	  }else if (document.attachEvent){
// 	      document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
// 	      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
// 	  }
// 	}else{
// 	  onBridgeReady();
// 	}
// }
//获取当天日期
common.getpreDateAll = ()=>{
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth();
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = String(year) + String(seperator1) + String(month) + String(seperator1) + String(strDate);
    return currentdate;
}
common.getTodayDate = ()=>{
	let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = String(year) + String(seperator1) + String(month) + String(seperator1) + String(strDate);
    return currentdate;
}
common.getPreDate = ()=>{
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth();
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = String(year) + String(seperator1) + String(month);
    return currentdate;
}
common.getCurDate = () =>{
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = String(year) + String(seperator1) + String(month);
    return currentdate;
}

common.getRequest = () => {
  let after = window.location.hash.split("?")[1];
  let theRequest = new Object();
  if (after) {
    let strs = after.split("&");
    for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    return theRequest;
  }
}
export default common;