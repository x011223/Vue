<template>
    <div id="classifygroup">
        <group-item :Groups="this.GroupMore"></group-item>
        
         <!-- 123 -->
    </div>
</template>

<script>
    import GroupItem from '../groupitem/groupitem'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            GroupItem,
        },
        computed: {
            ...mapGetters([
                'GroupMore'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #classifygroup {
        @include MovieAndBookItemPosition;
        // background: #0000ff;
    }
</style>
