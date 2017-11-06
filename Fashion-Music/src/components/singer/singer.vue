<template>
    <div class="singer">
        <list-view></list-view>
    </div>
</template>

<style scoped>
    .singer {
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
    }
</style>

<script>
    import listView from '../../base/listview/listview.vue'

    import {getSingerList} from '../../api/singer'
    import {ERR_OK} from '../../api/config'

    const Hot_Name = '热门'
    const Hot_Singers_len = 10
    // const Avat = 'https://y.gtimg.cn/music/photo_new/T001R150x150M000'

    export default {
        data () {
            return {
                singers: []
            }
        },
        created () {
            this._getSingers()
        },
        components: {
            listView,
        },
        methods: {
            _getSingers () {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this._dealSingers(res.data.list)
                        console.log(this.singers)                      
                    }
                })
            },
            _dealSingers (list) {
                let map = {
                    hot: {
                        title: Hot_Name,
                        items: []
                    }
                }               
                list.forEach((item, index) => {
                    //前十个歌手填入hot
                    if (index < Hot_Singers_len) {
                        //初始化hot 中的items
                        map.hot.items.push({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name,
                            avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                            // avatar: `Avat + ${item.Fsinger_mid} + '.jpg?max_age=2592000'`
                        })
                    }
                    const key = item.Findex
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }                   
                    map[key].items.push({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,    
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`               
                    })
                });
                // console.log(map)
                //处理得到的map 将其转换成有序列表
                //热门
                let hot = []
                //热门之下
                let ret = []
                for (let key in map) {
                    //每个元素
                    let val = map [key] 
                    if (val.title.match(/[a-zA-Z]/)) {
                        //得到 10 位以后的歌手
                        ret.push(val)
                    }   else if (val.title === Hot_Name)  {
                        //得到 10 位以前 即热门歌手
                        hot.push(val)
                    }
                }
                ret.sort((a, b) => {
                    //对得到的结果排序
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            },
        }
    }
</script>
