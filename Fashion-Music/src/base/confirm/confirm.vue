<template>
    <transition name="confirm">
        <div class="confirm" v-show="confrimFlag" @click.stop>
            <div class="confirm-wrapper">
                <div class="confirm-text">{{text}}</div>
                <div class="btn-wrapper">                
                    <div class="btn-cancel" @click="confirmCancel">{{btnCancel}}</div>
                    <div class="btn-confirm" @click="confirmConfirm">{{btnConfirm}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
                confrimFlag: false
            }
        },
        props: {
            text: {
                type: String,
                default: ''
            },
            btnConfirm: {
                type: String,
                default: '确认'
            },
            btnCancel: {
                type: String,
                default: '取消'
            }
        },
        methods: {
            confirmShow () {
                this.confrimFlag = true
            },
            confirmHide () {
                this.confrimFlag = false
            },
            confirmCancel () {
                this.confirmHide()
                this.$emit('cancel')
            },
            confirmConfirm () {
                this.confirmHide()
                this.$emit('confirmConfirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    .confirm {
        position: fixed;       
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 998;
        .confirm-wrapper { 
            position: absolute;
            top: 36%;
            z-index: 999; 
            width: 100%;
            height: 200px;       
            border-radius: 10px;
            background: $background-color-warning;
            .confirm-text {
                text-align: center;
                color: $color-text-confirm;
                margin-top: 60px;
            }
            .btn-wrapper {
                display: flex;       
                height: 80px;
                color: $color-text-confirm;
                margin-top: 72px;
                padding-top: 12px;
                border-top: 1px solid #808080;
                .btn-confirm {       
                    padding-right: 80px;
                }
                .btn-cancel {
                    flex: 1;
                    padding-left: 80px;
                }
            }
        }
    }
    .confirm-enter-active,  {
        animation: confirm-fadein
    }
    .confirm-leave-active {
        animation: confirm-fadeout
    }
    .confirm-enter, .confirm-leave-to {
        transform: translate3d(0, 100%, 0)
    }
    @keyframes confirm-fadein {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    @keyframes confirm-fadeout {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
</style>
