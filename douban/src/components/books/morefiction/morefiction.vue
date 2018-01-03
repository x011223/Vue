<template>
    <div id="morebooks">
        <!-- <div class="morebooks-title"> -->
        <span>虚幻类</span>
        <!-- </div>    -->
        <list-view :List="FictionBooks" :isMore="true"></list-view>
    </div>
</template>

<script>
    import { ListMixin } from '../../../assets/js/mixins'

    const Count = 99
    export default {
        mixins: [ ListMixin ],
        created () {
            this._getFiction()
        }
    }
</script>

<style lang="scss" scoped>
    #moremovies {
        span {
            display: block;
            margin: 1rem 0 1rem;
            font: {
                size: .75rem;
                weight: 700;
            }
        }
    }
</style>
