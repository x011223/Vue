<template>
    <div id="groups">
        
    </div>
</template>

<script>
    import { getGroups } from '../../api/group'
    import { mapGetters, mapMutations } from 'vuex'
    export default {
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
        top: 3rem;
    }
</style>