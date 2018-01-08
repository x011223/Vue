import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/main'
import Movies from '@/components/movies/movies'
    import MoreHot from '@/components/movies/morehot/morehot'
        import Movie from '@/base/movie/movie'
    import MoreFree from '@/components/movies/morefree/morefree'
    import MoreNew from '@/components/movies/morenew/morenew'
import Books from '@/components/books/books'
    import MoreFiction from '@/components/books/morefiction/morefiction'
    import MoreUnFiction from '@/components/books/moreunfiction/moreunfiction'
import BroadCast from '@/components/broadcast/broadcast'
import Groups from '@/components/groups/groups'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/main', component: Main },
        { path: '/movies', component: Movies, children: [
            { path: ':id', component: Movie}
        ] },
            { path: '/moreHot', component: MoreHot, children: [
                { path: ':id', component: Movie}
            ] },
            { path: '/moreFree', component: MoreFree, children: [
                { path: ':id', component: Movie}
            ] },
            { path: '/moreNew', component: MoreNew, children: [
                { path: ':id', component: Movie}
            ] },
        { path: '/books', component: Books },
            { path: '/moreFiction', component: MoreFiction },
            { path: '/moreUnFiction', component: MoreUnFiction },
        { path: '/broadcast', component: BroadCast },  
        { path: '/groups', component: Groups },
    ]
})