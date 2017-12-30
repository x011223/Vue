import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/main'
import Movies from '@/components/movies/movies'
    import MoreHot from '@/components/movies/morehot/morehot'
    import MoreComing from '@/components/movies/morecoming/morecoming'
    import MoreTop from '@/components/movies/moretop/moretop'
import Books from '@/components/books/books'
import BroadCast from '@/components/broadcast/broadcast'
import Groups from '@/components/groups/groups'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/main', component: Main },
        { path: '/movies', component: Movies },
            { path: '/moreHot', component: MoreHot },
            { path: 'moreComing', component: MoreComing },
            { path: 'moreTop', component: MoreTop },
        { path: '/books', component: Books },
        { path: '/broadcast', component: BroadCast },  
        { path: '/groups', component: Groups },
    ]
})