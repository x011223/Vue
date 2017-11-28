<template>
    <div class="search-list" v-show="searches.length">
        <transition-group name="searchlist" tag="ul">
            <!-- <ul>             -->
                <li :key="history" class="search-history" v-for="history in searches" @click="search(history)">
                    <div class="history-content">
                        <span class="history">{{history}}</span>
                        <img class="icon-delete" src="../../base/searchbox/delete.svg" width="16" height="16" @click.stop="deleteOne(history)">
                    </div>
                </li>                     
            <!-- </ul> -->
        </transition-group>  
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
        methods: {
            search (history) {
                this.$emit('searchSelect', history)
            },
            deleteOne (history) {
                this.$emit('deleteHistory', history)
            }
        },
    }
</script>

<style scoped>
    .searchlist-enter-active, .searchlist-leave-active {
        transition: all 0.3s linear
    }
    .searchlist-enter, .searchlist-leave-to {
        transform: translateX(110%)
    }
    .search-history {
        display: flex;
        align-items: center;
        height: 32px;
    }
    .history {
        flex: 1;
        /* display: flex; */
        position: relative;
    }
    .icon-delete {
        position: absolute;
        right: 40px;
        padding-top: 4px;
    }
    .history-content {
        display: flex;
    }
</style>

