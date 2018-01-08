<template>
    <div class="song-list">
        <ul>
            <li @click="selectSong(song, index)" v-for="(song, index) in songs" class="song">
                <div class="rankcss iconfont" v-show="rankStyle">
                    <span :class="getRankStyle(index)">{{getRankText(index)}}</span>
                </div>
                <div class="song-content">  
                    <div class="song-image">
                        <img v-lazy="song.image" width="36" height="36">
                    </div>                   
                    <div class="song-text">
                        <h2 class="song-name">{{song.name}}</h2>
                        <p class="song-desc">{{getSongDesc(song)}}</p>
                    </div> 
                </div>            
            </li>
        </ul>
    </div>
</template>

<script>
    import {getSongVkey} from '../../api/singer'
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
            rankStyle: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            getSongDesc (song) {
                return `${song.album}`
            },
            selectSong(song, index) {
                // 点击时 分发事件
                this.$emit('select', song, index)           
            },
            getRankStyle (index) {
                if (index < 3) {
                    return `icon${index}`
                } else {
                    return 'rankText'
                }
            },
            getRankText(index) {
                if (index > 2) {
                    return index + 1
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import './rankfont/iconfont.css';
    @import '../../sass/style.scss';
    @import '../../sass/mixin.scss';
    li {
        list-style: none;
    }
    .song-list {
        width: 100%;
        background: $background-color-list;
        
        ul {
            margin-bottom: -1rem;
            .song {
                height: $height-big-xx;
                padding-top: 1rem;
                .rankcss {
                    display: inline-block;
                    width: 25px;
                    vertical-align: top;
                    text-align: center;
                    font-size: $font-size-X;
                    margin-left: 2rem;
                    color: rgb(169, 169, 169);
                }
                .song-content {
                    display: inline-block;
                    .song-image {
                        padding-left: 32px;
                        display: inline-block;
                        vertical-align: top;
                    }               
                    .song-text {
                        margin: {
                            top: -0.2rem; 
                            left: 1rem;   
                        }           
                        flex-direction: column;
                        display: flex;
                        display: inline-block;
                        .song-name {
                            flex: 1;
                            font: {
                                size: $font-size-b;
                                weight: $font-weight-s;
                            }
                            color: $color-text-name;
                            padding: {
                                bottom: 0.5rem;
                            }
                            @include lineFlow($width: 195px);
                        }
                        .song-desc {
                            font: {
                                size: $font-size-n;
                                weight: $font-weight-s;
                                color: $color-text-desc;                                          
                            }
                            @include lineFlow($width: 195px);             
                        }
                    }
                }
                .icon0, .icon1, .icon2 {
                    font-size: 32px;
                    margin-top: 0.5rem;
                }
                .icon0 {
                    color: #ffd700;
                }
                .icon1 {
                    color: #c0c0c0;
                }
                .icon2 {
                    color: #ff331e;
                }
            }
        }
    }







    // .song-list {
    //     width: 100%;
    //     background: $background-color-list;
    //     ul {
    //         .song {
    //             .song-image {
    //                 padding-left: 1.2rem;
    //                 margin-top: 0.8rem;
    //             }
    //             .song-content {
    //                 display: flex;
    //                 padding-left: 0.5rem;
    //                 margin-top: 0.5rem;
    //                 .rankcss {
    //                     display: inline-block;
    //                     width: 25px;
    //                     text-align: center;
    //                     font-size: $font-size-x;
    //                     border-right: 2px solid #51a8ff;
    //                     border-radius: 10px;
    //                     margin-top: 0.5rem;
    //                     padding: {
    //                         top: 4px;
    //                         right: 12px;
    //                     }
    //                 }
    //                 .icon0, .icon1, .icon2 {
    //                     font-size: 32px;
    //                     margin-top: 0.5rem;
    //                 }
    //                 .icon0 {
    //                     color: #ffd700;
    //                 }
    //                 .icon1 {
    //                     color: #c0c0c0;
    //                 }
    //                 .icon2 {
    //                     color: #ff331e;
    //                 }
    //                 .song-name {
    //                     flex: 1;
    //                     font-weight: $font-weight-s;
    //                     font-size: $font-size-b;
    //                     color: $color-text-name;
    //                     @include lineFlow($width: 100%);
    //                 }
    //                 .song-desc {
    //                     position: absolute;
    //                     padding-top: 1.9rem;
    //                     font-weight: $font-weight-s;
    //                     font-size: $font-size-n;
    //                     color: $color-text-desc;
    //                     @include lineFlow($width: 100%);
    //                 }
    //             }
    //         }
    //     }
    // }
</style>
