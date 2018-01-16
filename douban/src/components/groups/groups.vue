<template>
    <div id="groups">
        <div class="group-movie">
            <group-item :Groups="this.GroupOfMovie"></group-item>
        </div>
        <div class="group-book">
            <group-item :Groups="this.GroupOfBook"></group-item>
        </div>
        <div class="group-book">
            <group-item :Groups="this.GroupOfMusic"></group-item>
        </div>
        <div class="group-book">
            <group-item :Groups="this.GroupOfNew"></group-item>
        </div>
        <div class="group-book">
            <group-item :Groups="this.GroupOfSameCity"></group-item>
        </div>
        <div class="group-book">
            <group-item :Groups="this.GroupOfWorkPlace"></group-item>
        </div>
    </div>
</template>

<script>
    import GroupItem from '../../base/groupitem/groupitem'
    import { GroupMixin } from '../../assets/js/mixins'
    export default {
        mixins: [ GroupMixin ],
        components: {
            GroupItem,
        },
        created () {
            this._getGroups()
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #groups {
        position: fixed;
        top: 1.67rem;
        left: 0;
        right: 0;
        .group-movie {
            .group-more {
                display: block;
                text-align: center;
                font: {
                    size: $font-size-b;
                    weight: $font-weight-b;
                }
                color: $color-theme;
                padding-bottom: 1rem;
                border-bottom: $border-browsing;
            }
        }
    }
</style>