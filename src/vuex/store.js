import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	market_data : {},
	premium_data : {},
	premiumDetail_data : {},
	channel_data : {},
	product_byCom_data : {},
	product_byIll_data : {},
	quality_data : {},
}
const mutations = {
	add(state,n={a:1}){
		// state.count += n.a;
	},
	struc(state){
		// state.count--;
	}
}
const getters = {
	//在getter里面不要使用箭头函数
	// num : function(state){
	// 	return state.num += 10;
	// }
}
const actions = {
	// addPlus(context){//context代表了整个store
	// 	setTimeout(() => {
	// 		context.commit('add',{a:2})
	// 	}, 3000)
	// }
}
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})