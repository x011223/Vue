<template>
    <div class="play-progress" ref="playProgress" @click="progressClick">
        <div class="progress-bar">
            <!-- 进度条偏移位置 -->
            <div class="progress" ref="progress"></div>
            <!-- 当前播放进度按钮所在位置 -->
            <div class="pro-btn_wrapper" ref="btnWrapper" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchmove" @touchend="progressTouchEnd">
                <div class="pro-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {prefixStyle} from '../../js/dom'

    const transform = prefixStyle('transform')
    const BtnWidth = 16
    export default {
        props: {
            // 播放进度百分比
            playsPercent: {
                type: Number,
                default: 0
            },
        },
        watch: {
            // 监测播放进度
            playsPercent (newPercent) {
                if (newPercent >= 0 && !this.touch.initiated) {
                    // 进度条宽度
                    const barWidth = this.$refs.playProgress.clientWidth - BtnWidth
                    // 已播放宽度
                    const offsetWidth = newPercent * barWidth
                    // 进度条偏移量
                    this._deltaBtn(offsetWidth)
                }
            }
        },
        created () {
            this.touch = {}
        },
        methods: {
            progressTouchStart (e) {
                this.touch.initiated = true
                this.touch.startX = e.touches[0].pageX
                this.touch.left = this.$refs.progress.clientWidth
            },
            progressTouchmove (e) {
                if (!this.touch.initiated) {
                    return
                }
                const deltaX = e.touches[0].pageX - this.touch.startX
                const offsetWidth = Math.min(this.$refs.playProgress.clientWidth - BtnWidth, Math.max(0, this.touch.left + deltaX))
                this._deltaBtn(offsetWidth)
            },
            progressTouchEnd () {
                // this._triggerPercrent()
                this.touch.initiated = false
                this._triggerPercrent()
            },
            progressClick (e) {
                this._deltaBtn(e.offsetX)
                this._triggerPercrent()
            },
            _deltaBtn (offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`
                this.$refs.btnWrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
            },
            _triggerPercrent () {
                // 改变播放进度
                const barWidth = this.$refs.playProgress.clientWidth - BtnWidth
                const percent = this.$refs.progress.clientWidth / barWidth
                // 派发事件: 触摸完成,播放进度改变
                this.$emit('percentChange', percent)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    .play-progress {
        height: 30px;
        .progress-bar {
            position: relative;
            top: 13px;
            height: 4px;
            background: $background-color-fuceng;
            .progress {
                position: absolute;
                height: 100%;
                background: $color-text-title-dark;
            }
            .pro-btn_wrapper {
                position: absolute;
                left: -8px;
                top: -13px;
                width: $height-big;
                height: $height-big;
                .pro-btn {
                    position: relative;
                    top: 7px;
                    left: 7px;
                    box-sizing: border-box;
                    width: $height-small-s;
                    height: $height-small-s;
                    border: 3px solid $background-color-compare;
                    border-radius: 50%;
                    background: $color-text-title-dark;
                }
            }
        }
    }
</style>

