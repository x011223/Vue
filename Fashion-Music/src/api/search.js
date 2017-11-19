

        import jsonp from '../js/jsonp'
        import {commonParams, options} from './config'

        // 获得热搜数据
        export function getHotSearch () {
            const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
            const data = Object.assign({}, commonParams, {
                platform: 'h5',
                needNewCode: 1,
            })
            return jsonp(url, data, options)
        }
        
        // 获取搜索建议数据 zhida表示是否搜索歌手
        export function search (query, page, zhida, perpage) {
            const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
            const data = Object.assign({}, commonParams, {
                w: query,
                p: page,
                uin: 0,
                platform: 'h5',
                needNewCode: 1,
                zhidaqu: 1,
                catZhida: zhida ? 1 : 0,
                t: 0,
                flag: 1,
                ie: 'utf-8',
                sem: 1,
                aggr: 0,
                perpage,
                n: perpage,
                remoteplace: 'txt.mqq.all'
            })
            return jsonp (url, data, options)
        }