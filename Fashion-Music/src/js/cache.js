
        
        import storage from 'good-storage'
import { insertSong } from '../store/actions';

        // 记录的搜索历史
        const Search_Key = '__search'
        // 记录搜索记录的最大数量
        const Search_Max_Length = 15

        // 播放历史记录
        const Play_Key = '__play'
        const Play_Max_Length = 200
        
        const Fav_Key = '__Fav'
        const Fav_Max_Length = 2000

        // 插入历史到最前  
        // compare  判断历史是否在记录中
        function insertHistory (arr, val, compare, maxLen) {
            // 取出历史在记录中的索引
            const index = arr.findIndex(compare)
            if (index === 0) {
                return
            }
            if (index > 0) {
                // 将之前的记录删除
                arr.splice(index, 1)
            }
            // 将新的历史纪录在最前
            arr.unshift(val)
            if (maxLen && index > maxLen) {
                // 记录数量超出最大值 将最后一个删除
                arr.pop()
            }
        }

        function deleteArr (arr, compare) {
            const index = arr.findIndex(compare) 
            if (index > -1) {
                arr.splice(index, 1)
            }
        }
        export function saveSearch (query) {
            // 已经记录的搜索历史 默认空
            let searches = storage.get(Search_Key, [])   
            insertHistory (searches, query, (item) => {
                return item === query
            }, Search_Max_Length)
            storage.set(Search_Key, searches)
            return searches
        }
        export function loadSearch () {
            return storage.get(Search_Key, [])
        }

        export function deleteSearch (query) {
            let searches = storage.get(Search_Key, [])
            deleteArr (searches, (item) => {
                return item === query
            })   
            storage.set(Search_Key, searches)
            return searches
        }

        export function clearHistory () {
            storage.clear(Search_Key)
            return []
        }

        export function savePlay (play) {
            let plays = storage.get(Play_Key, [])   
            insertHistory (plays, play, (item) => {
                return item.id === play.id
            }, Play_Max_Length)
            storage.set(Play_Key, plays)
            return plays
        }

        export function loadPlay () {
            return storage.get(Play_Key, [])
        }

        export function saveFavorite (song) {
            let favorites = storage.get(Fav_Key, [])
            insertSong (favorites, song, (item) => {
                return song.id === item.id
            }, Fav_Max_Length)
            storage.set(Fav_Key, favorites)
            return favorites
        }
 
        export function deleteFavorite (song) {
            let favorites = storage.get(Fav_Key, [])
            deleteArr(favorites, (item) => {
                return song.id === item.id
            })
            storage.set(Fav_Key, favorites)
            return favorites
        }

        export function loadFavorite () {
            return storage.get(Fav_Key, [])
        }