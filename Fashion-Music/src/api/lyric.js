
        // 歌词接口 及相关数据
        import {commonParams} from './config'
        import axios from 'axios'
        export function getLyrics (mid) {
            const url = '/api/lyric'
            const data = Object.assign({}, commonParams, {
                songmid: mid,
                platform: 'yqq',
                hostUin: 0,
                needNewCode: 0,
                categoryId: 10000000,
                pcachetime: +new Date(),
                format: 'json'
            })
            return axios.get(url, {
                params: data
            }).then((res) => {
                return Promise.resolve(res.data)
            })
        }