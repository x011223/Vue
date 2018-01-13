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
    import { getGroups } from '../../api/group'
    import { mapGetters, mapMutations } from 'vuex'
    import GroupItem from '../../base/groupitem/groupitem'
    export default {
        components: {
            GroupItem,
        },
        data () {
            return {
                groupOfMovie: {},
                groupOfBook: {},
                groupOfMusic: {},
                groupOfNew: {},
                groupOfSameCity: {},
                groupOfWorkPlace: {},
            }
        },
        methods: {
            _getGroups () {
                getGroups().then((res) => {
                    this.groupOfMovie = res.rec_groups[0].classified_groups[0]
                    this.groupOfBook = res.rec_groups[0].classified_groups[1]
                    this.groupOfMusic = res.rec_groups[0].classified_groups[2]
                    this.groupOfNew = res.rec_groups[0].classified_groups[3]
                    this.groupOfSameCity = res.rec_groups[0].classified_groups[4]
                    this.groupOfWorkPlace = res.rec_groups[0].classified_groups[5]
                    console.log(res.rec_groups[0].classified_groups)
                    this.setGroupOfMovie(this.groupOfMovie)
                    this.setGroupOfBook(this.groupOfBook)
                    this.setGroupOfMusic(this.groupOfMusic)
                    this.setGroupOfNew(this.groupOfNew)
                    this.setGroupOfSameCity(this.groupOfSameCity)
                    this.setGroupOfWorkPlace(this.groupOfWorkPlace)
                }) 
            },
            ...mapMutations ({
                setGroupOfMovie: 'set_GroupOfMovie',
                setGroupOfBook: 'set_GroupOfBook',
                setGroupOfNew: 'set_GroupOfNew',
                setGroupOfSameCity: 'set_GroupOfSameCity',
                setGroupOfMusic: 'set_GroupOfMusic',
                setGroupOfWorkPlace: 'set_GroupOfWorkPlace',
            })
        },
        created () {
            this._getGroups()
        },
        computed: {
            ...mapGetters ([
                'GroupOfMovie',
                'GroupOfMusic',
                'GroupOfBook',
                'GroupOfNew',
                'GroupOfSameCity',
                'GroupOfWorkPlace',
            ])
        }
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
    }
</style>