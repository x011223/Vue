<template>
    <div class="search-list" v-show="searches.length">
        <ul>
            <li class="search-history" v-for="history in searches">
                <span class="history">{{history}}</span>
                <span class="iconfont">
                    <i class="icon-clear"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            searches: {
                type: Array,
                default: []
            },
        },
    }
</script>

<style scoped>
    .search-history {
        display: flex;
        align-items: center;
        height: 40px;
    }
    .history {
        flex: 1;
    }
</style>

