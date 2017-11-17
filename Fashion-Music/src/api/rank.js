 
 
        import jsonp from '../jsonp'
        import {commonParams, options} from './config'

        export function getTopList () {
            const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
            const data = Object.assign({}, commonParams, {
                platform: 'h5',
                needNewCode: 1,
                // _: 1510893479745,
                // format: 'json',
                // uin: 0,
                // notice: 0,
            })
            return jsonp(url, data, options)
        }

        export function getToplistSongs (topid) {
            const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
            const data = Object.assign({}, commonParams, {
                topid,
                platform: 'h5',
                needNewCode: 1,
                page: 'detail',
                tpl: 3,
                type: 'top'
            })
            return jsonp(url, data, options)
        }