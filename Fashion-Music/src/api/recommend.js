import jsonp from '../js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
import {options1} from './config'

//获取推荐页
export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

// 获取歌单列表
export function getDiscList () {
    const url = '/api/getDiscList'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
            params: data
        }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取歌单歌曲列表
export function getDiscSong (disstid) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'    
    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        needNewCode: 0,
        // accessed_favbase: 0,
        // accessed_plaza_cache: 1,
        // cdnum: 1,
        // realcdnum: 1,
        hostUin: 0,
        needNewCode: 0,
    })
    return jsonp(url, data, options1)
}

export function getCdinfo () {
    const url = '/api/getCdinfo'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        accessed_favbase: 0,
        accessed_plaza_cache: 1,
        cdnum: 1,
        realcdnum: 1,
        format: 'json',
        g_tk: 1928093487
    })
    return axios.get(url, {
            params: data
        }).then((res) => {
                return Promise.resolve(res.cdlist)
    })
}