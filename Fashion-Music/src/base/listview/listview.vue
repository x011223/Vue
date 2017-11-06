<template>
    <Scroll class="listview" :data="data">
        <ul>
            <li v-for="group in data" class="list-group">
                <h2 class="list-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="item-name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </Scroll>
</template>

<script>
    import Scroll from '../scroll/scroll.vue'

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        components: {
            Scroll,
        }
    }
</script>

<style scoped>
    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(7, 17, 27, 0.4)
    }
    .list-group {
        padding-bottom: 30px;
    }
    .list-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: #5a5a5a;
        background: #e3e3e3;
    }
    .list-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .item-name {
        margin-left: 20px;
        color: #00a4a4;
        font-size: medium;
    }
</style>


