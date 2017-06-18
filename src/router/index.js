import Vue from 'vue'
import Router from 'vue-router'
import guide from '@/components/guide'
import guide1 from '@/components/guide1'
import guide2 from '@/components/guide2'
import guide3 from '@/components/guide3'
import guide4 from '@/components/guide4'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/guide',
        name: 'guide',
        component: guide,
        children: [{
        	name:'default',
        	path:'',
        	component:guide1
        },{
        	name:'page1',
            path: '1',
            component: guide1
        }, {
        	name:'page2',
            path: '2',
            component: guide2
        }, {
        	name:'page3',
            path: '3',
            component: guide3
        }, {
        	name:'page4',
            path: '4',
            component: guide4
        }]
    }]
})
