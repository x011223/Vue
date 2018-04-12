
    import {getSongVkey} from '../api/singer'
    import {getLyrics} from '../api/lyric'
    import {ERR_OK} from '../api/config'
    import {Base64} from 'js-base64'

    export default class Song {
        constructor({id, mid, singer, name, album, duration, image, url}) {
            this.id = id
            this.mid = mid
            this.singer = singer
            this.name = name
            this.album = album
            this.duration = duration
            this.image = image
            this.url = url
        }
        // 获得歌词
        getLyrics () {
            if (this.lyric) {
                return Promise.resolve(this.lyric)
            }
            return new Promise((resolve, reject) => {
                getLyrics (this.mid).then((res) => {
                    if (res.retcode === ERR_OK) {
                        this.lyric = Base64.decode(res.lyric)
                        resolve(this.lyric)
                    } else {
                        // 无歌词
                        reject('no lysic')
                    }
                })
            })
        }
    }
    
    export function creatSongs (musicData) {
        return getSongVkey(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
                // const vkey = res.data.items[0].vkey
                const v = res.data.items["0"]
                return new Song({
                    id: musicData.songid,
                    mid: musicData.songmid,
                    singer: filterSinger(musicData.singer),
                    name: musicData.songname,
                    album: musicData.albumname,
                    duration: musicData.interval,
                    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
                    // url: `https://dl.stream.qqmusic.qq.com/C400${musicData.songid}.m4a?vkey=${vkey}&guid=6520805900&uin=0&fromtag=66`
                    url: `https://dl.stream.qqmusic.qq.com/${v.filename}?vkey=${v.vkey}&guid=3222376640&uin=0&fromtag=66`
                })
            }
        })
    }
    export function filterSinger (singer) {
        let ret = []
        if (!singer) {
            return ''
        }
        singer.forEach((s) => {
            ret.push(s.name)
        })
        return ret.join('/')
    }