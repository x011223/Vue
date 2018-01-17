

        import ListView from '../../base/listview/listview'
        import InBottom from '../../base/inbottom/inbottom'

        import { mapGetters, mapMutations } from 'vuex'
        import { getHotMovies, getFreeMovies, getNewMovies } from '../../api/movie'
        import { getFiction, getUnFiction, getBookStore } from '../../api/books'
        
        import { getRecommend, setRecommendDate } from '../../api/main'
        export const ListMixin = {
            components: {
                ListView,
                InBottom,
            },
            data () {
                 return {
                    listHot: [],
                    listFree: [],
                    listNew: [],
                    listRecommend: [],
                    listFiction: [],
                    listUnFiction: [],
                    listBookStore: [],
                    storeHeader: [],
                    recommendDate: '',
                 }   
            },
            methods: {
                //  影院热映 列表
                _getHotMovies () {
                    getHotMovies(this.Count).then((res) => {  
                        // this.HotMovies = res.subject_collection_items 
                        this.listHot = res.subject_collection_items  
                        this.getHotMovies(this.listHot)
                    })
                    this.setIsMore(false)
                },
                // 免费 在线 观看
                _getFreeMovies () {
                    getFreeMovies(this.Count).then((res) => {
                        // this.FreeMovies = res.subject_collection_items
                        this.listFree = res.subject_collection_items
                        this.getFreeMovies(this.listFree)
                    })
                    this.setIsMore(false)
                },
                // 新片速递
                _getNewMovies () {
                    getNewMovies(this.Count).then((res) => {
                        // this.NewMovies = res.subject_collection_items
                        this.listNew = res.subject_collection_items
                        this.getNewMovies(this.listNew)
                    })
                    this.setIsMore(false)
                },
                // 主页 热门文章
                _getRecommend () {
                    getRecommend().then((res) => {
                        this.listRecommend = res.recommend_feeds
                        this.getRecommend(this.listRecommend)
                        this.recommendDate = res.date   
                        this.setRecommendDate(this.recommendDate) 
                        console.log(this.RecommendFeed)        
                    })
                    this.setIsMore(false)
                },
                // 虚幻类图书
                _getFiction () {
                    getFiction(this.Count).then((res) => {
                        this.listFiction = res.subject_collection_items
                        this.getFiction(this.listFiction)
                    })
                    this.setIsMore(false)
                },
                // 非虚幻类图书
                _getUnFiction () {
                    getUnFiction(this.Count).then((res) => {
                        this.listUnFiction = res.subject_collection_items
                        this.getUnFiction(this.listUnFiction)
                    })
                    this.setIsMore(false)
                },
                _getBookStore () {
                    getBookStore(this.Count).then((res) => {
                        this.listBookStore = res.subject_collection_items
                        this.storeHeader = res.header
                    })
                    this.setIsMore(false)
                },
                ...mapMutations({
                    getHotMovies: 'get_HotMovies',
                    getFreeMovies: 'get_FreeMovies',
                    getNewMovies: 'get_NewMovies',
                    getRecommend: 'get_RecommendFeed',
                    getFiction: 'get_FictionBooks',
                    getUnFiction: 'get_UnFictionBooks',
                    setIsMore: 'set_IsMore',
                    getStoreHeader: 'get_StoreHeader',
                    setRecommendDate: 'set_RecommendDate',
                    getArrayRecommend: 'get_ArrayRecommend',
                    getRecommendBefore: 'get_RecommendBefore',
                })
            },
            computed: {
                Count () {
                    return this.isMore ? 69 : 9
                },
                ...mapGetters ([
                    'HotMovies',
                    'FreeMovies',
                    'NewMovies',
                    'UnFictionBooks',
                    'FictionBooks',
                    'RecommendFeed',
                    'isMore',
                    'StoreHeader',
                    'RecommendDate',
                    'RecommendBefore',
                    'ArrayRecommend',
                ]),           
            }
        }

        import { getGroups, getTagGroups, getGroupItem } from '../../api/group'

        export const GroupMixin = {
            data () {
                return {
                    groupOfMovie: {},
                    groupOfBook: {},
                    groupOfMusic: {},
                    groupOfNew: {},
                    groupOfSameCity: {},
                    groupOfWorkPlace: {},
                    groupItem: {},
                    listGroupMore: {}
                }
            },
            methods: {
                _getGroups () {
                    if (this.groupOfMovie === this.GroupOfMovie) {
                        return
                    }
                    getGroups().then((res) => {
                        this.groupOfMovie = res.rec_groups[0].classified_groups[0]
                        this.groupOfBook = res.rec_groups[0].classified_groups[1]
                        this.groupOfMusic = res.rec_groups[0].classified_groups[2]
                        this.groupOfNew = res.rec_groups[0].classified_groups[3]
                        this.groupOfSameCity = res.rec_groups[0].classified_groups[4]
                        this.groupOfWorkPlace = res.rec_groups[0].classified_groups[5]
                        this.setGroupOfMovie(this.groupOfMovie)
                        this.setGroupOfBook(this.groupOfBook)
                        this.setGroupOfMusic(this.groupOfMusic)
                        this.setGroupOfNew(this.groupOfNew)
                        this.setGroupOfSameCity(this.groupOfSameCity)
                        this.setGroupOfWorkPlace(this.groupOfWorkPlace)
                    }) 
                },
                ...mapMutations ({
                    setGroupOfMovie: 'set_GroupOfMovie',
                    setGroupOfBook: 'set_GroupOfBook',
                    setGroupOfNew: 'set_GroupOfNew',
                    setGroupOfSameCity: 'set_GroupOfSameCity',
                    setGroupOfMusic: 'set_GroupOfMusic',
                    setGroupOfWorkPlace: 'set_GroupOfWorkPlace',
                    setGroupItem: 'set_GroupItem',
                    setGroupMore: 'set_GroupMore',
                })
            },
            created () {
                this._getGroups()
            },
            computed: {
                ...mapGetters ([
                    'GroupOfMovie',
                    'GroupOfMusic',
                    'GroupOfBook',
                    'GroupOfNew',
                    'GroupOfSameCity',
                    'GroupOfWorkPlace',
                    'GroupItem',
                    'GroupMore'
                ])
            }
        }