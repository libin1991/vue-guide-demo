import Vue from 'vue'
import App from './App'
import router from './router'

import VueTouch from 'vue-touch'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
Vue.use(vueg, router,{
	tabs:[{
		name:'page1'
	},{
		name:'page2'
	},{
		name:'page3'
	},{
		name:'page4'
	}]
})
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
