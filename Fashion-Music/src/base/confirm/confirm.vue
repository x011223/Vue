<template>
    <transition name="confirm">
        <div class="confirm" v-show="confrimFlag">
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

<style scoped>
    .confirm {
        position: fixed;       
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 998;
        background: rgba(0, 0, 0, 0.3);
    }
    .confirm-wrapper { 
        position: absolute;
        top: 36%;
        z-index: 999; 
        width: 100%;
        height: 200px;       
        border-radius: 10px;
        background: #333;
    }
    .confirm-text {
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
    }
    .btn-wrapper {
        display: flex;       
        height: 80px;
        color: rgba(255, 255, 255, 0.3);
        margin-top: 132px;
        padding-top: 12px;
        border-top: 1px solid #808080;
    }
    .btn-confirm {       
        padding-right: 80px;
    }
    .btn-cancel {
        flex: 1;
        padding-left: 80px;
    }
</style>
