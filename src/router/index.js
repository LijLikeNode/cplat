import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Market from '@/view/Market'
import Premium from '@/view/Premium'
import PremiumDetail from '@/view/PremiumDetail'
import Channel from '@/view/Channel'
import Product from '@/view/Product'
import Quality from '@/view/Quality'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{txt:'首页'}
    },
    {
      path: '/market',
      name: 'market',
      component: Market,
      meta:{txt:'市场概览'}
    },
    {
      path: '/premium',
      name: 'premium',
      component: Premium,
      meta:{txt:'保费分析'}
    },
    {
      path: '/premiumdetail/:key/:name',
      name: 'premiumdetail',
      component: PremiumDetail,
      meta:{txt:'保费分析'}
    },
    {
      path: '/channel',
      name: 'channel',
      component: Channel,
      meta:{txt:'渠道分析'}
    },
    {
      path: '/quality',
      name: 'quality',
      component: Quality,
      meta:{txt:'品质分析'}
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
      meta:{txt:'产品分析'}
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.txt) {
    document.title = to.meta.txt;
  }
  next();
});
export default router;