<template>
    <div class="poll-all">
        <div class="container page-wrapped custom-container-xl-2">
            <div class="poll-all-search-add d-flex align-end">
                <div class="poll-all-search">
                    <v-autocomplete hide-details dark v-model="search.model" label="Search Poll by Title" :search-input.sync="input" :items="search.items" @change="goToPollPage()"></v-autocomplete>
                </div>
                <div class="poll-all-add ml-6">
                    <v-btn v-if="userProfile.rank >= 5" to="/newpoll" color="#f4f4f6">
                        <span v-if="userProfile.rank <= 9">Request poll</span>
                        <span v-else>New poll</span>
                    </v-btn>
                </div>
            </div>
            <div class="poll-all-list">
                <div v-for="(item, index) in polls" :key="index" class="poll-all-list-item">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                            <div class="poll-all-list-item-content d-flex flex-row align-start" @click="goToPollPageFromList(item.date_created)">
                                <div class="poll-all-list-item-content-image">
                                    <v-img :src="item.poster" :height="$vuetify.breakpoint.width < 960 ? '150px' : '200px'" :width="$vuetify.breakpoint.width < 960 ? '150px' : '200px'">
                                    </v-img>
                                </div>
                                <div class="poll-all-list-item-content-text ml-6 ml-md-10">
                                    <div v-if="!hover" class="poll-all-list-item-content-text-title">
                                        <span>{{ item.title }}</span>
                                    </div>
                                    <div v-else class="poll-all-list-item-content-text-title-hover">
                                        <span>{{ item.title }}</span>
                                    </div>
                                    <div class="poll-all-list-item-content-text-description">
                                        <span>{{ item.description }}</span>
                                    </div>
                                    <div class="poll-all-list-item-content-text-type">
                                        <span>{{ item.type }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-hover>
                    <hr>
                </div>
            </div>
            <div class="poll-all-load" v-if="!load_preloader">
                <v-btn color="#f4f4f6" rounded @click="loadMorePoll()" v-if="$route.params.status == 'ongoing' && polls.length < poll_counter.active - 1">load more</v-btn>
                <v-btn color="#f4f4f6" rounded @click="loadMorePoll()" v-if="$route.params.status == 'ended' && polls.length < poll_counter.ended - 1">load more</v-btn>
            </div>
            <v-dialog v-model="load_preloader" width="250px" persistent >
                <v-card rounded="xl" class="poll-all-preloader-card" color="#13252F">
                    <v-card-text>
                        <v-row class="justify-center">
                            <v-col class="col-12 text-center">
                                <span class="headline white--text">Loading polls...</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <Footer v-if="!load_preloader" class="footer-poll-all"></Footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/firebase'
import Footer from '@/components/Footer.vue'

export default {
    name: "PollAll",
    data() {
        return {
            polls: [],
            poll_last_visible: '',
            poll_counter: 0,
            search: {
                model: null,
                search_input: null,
                items: [],
                items_date: []
            },
            input: null,
            load_preloader: false,
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile'])
    },
    methods: {
        async loadMorePoll(){
            let data
            try {
                if(this.$route.params.status == 'ongoing'){
                    data = await firebase.db.collection('polls').orderBy('date_created', 'desc').startAfter(this.poll_last_visible.date_created).where('status', '==', 'ongoing').where('requested', '==', false).limit(5).get()
                }
                else{
                    data = await firebase.db.collection('polls').orderBy('date_created', 'desc').startAfter(this.poll_last_visible.date_created).where('status', '==', 'ended').where('requested', '==', false).limit(5).get()
                }
            } catch (error) {
                console.log(error)
            }
            data.docs.forEach((snapshot, index) => {
                this.polls.push(snapshot.data())
                if(index == data.size - 1){
                    this.poll_last_visible = snapshot.data()
                }
            })
        },
        goToPollPage(){
            let temp = this.search.model
            let i = this.search.items.findIndex(function (model){
                return model == temp
            })
            let date = this.search.items_date[i]
            this.$router.push('/poll/detail/' + date.seconds + '+' + date.nanoseconds)
        },
        goToPollPageFromList(date){
            this.$router.push('/poll/detail/' + date.seconds + '+' + date.nanoseconds)
        }
    },
    async created(){
        this.load_preloader = true
        let data
        this.poll_counter = await firebase.db.collection('counter').doc('poll_counter').get()
        this.poll_counter = this.poll_counter.data()
        try {
            if(this.$route.params.status == 'ongoing'){
                data = await firebase.db.collection('polls').orderBy('date_created', 'desc').where('status', '==', 'ongoing').where('requested', '==', false).limit(10).get()
            }
            else if(this.$route.params.status == 'ended'){
                data = await firebase.db.collection('polls').orderBy('date_created', 'desc').where('status', '==', 'ended').where('requested', '==', false).limit(10).get()
            }
        } catch (error) {
            console.log(error)
        }
        data.docs.forEach((snapshot, index) => {
            this.polls.push(snapshot.data())
            if(index == data.size - 1){
                this.poll_last_visible = snapshot.data()
            }
        })
        this.load_preloader = false
    },
    watch: {
        async input(val) {
            this.search.items = []
            this.search.items_date = []
            if(val != null && val != ''){
                let data
                try {
                    if(this.$route.params.status == 'ongoing'){
                        data = await firebase.db.collection('polls').orderBy('title').startAt(val).endAt(val + '\uf8ff').where('status', '==', 'ongoing').where('requested', '==', false).limit(10).get()
                    }
                    else if(this.$route.params.status == 'ended'){
                        data = await firebase.db.collection('polls').orderBy('title').startAt(val).endAt(val + '\uf8ff').where('status', '==', 'ended').where('requested', '==', false).limit(10).get()
                    }
                } catch (error) {
                    console.log(error)
                }
                data.forEach((snapshot) => {
                    let snapshotData = snapshot.data()
                    this.search.items.push(snapshotData.title)
                    this.search.items_date.push(snapshotData.date_created)
                })
            }
        }
    },
    components: {
        Footer
    },
    beforeRouteEnter (to, from, next) {
        if(to.params.status == 'ongoing' || to.params.status == 'ended'){
            next()
        }
        else{
            next('/unauthorized')
        }
    }
}
</script>

<style scoped>
    .poll-all-search-add{
        margin-top: 50px;
    }

    .poll-all-search{
        width: 100%;
    }

    .poll-all-add .v-btn{
        padding: 20px 28px 20px 28px;
    }

    .poll-all-add .v-btn span{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31 !important;
    }

    .poll-all-list{
        margin-top: 75px;
    }

    .poll-all-list-item{
        margin-bottom: 60px;
    }

    .poll-all-list-item hr{
        opacity: .8;
    }

    .poll-all-list-item-content{
        margin-bottom: 40px;
        padding-left: 30px;
        padding-right: 30px;
        cursor: pointer;
    }

    .poll-all-list-item-content-text{
        margin-top: 30px;
    }

    .poll-all-list-item-content-text-title, .poll-all-list-item-content-text-title-hover{
        margin-bottom: 5px;
    }

    .poll-all-list-item-content-text-title-hover span{
        color: #519A9E;
        text-decoration: underline;
        font-size: 18px;
        font-weight: 700;
        transition: ease-in-out .2s;
    }

    .poll-all-list-item-content-text-title span{
        font-size: 18px;
        font-weight: 700;
        transition: ease-in-out .2s;
    }

    .poll-all-list-item-content-text-description{
        margin-bottom: 25px;
        max-height: 96px;
        overflow: auto;
    }

    .poll-all-list-item-content-text-description span{
        font-size: 14px;
        font-weight: 400;
    }

    .poll-all-list-item-content-text-type span{
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0;
        width: auto;
        background: #519A9E;
        border-radius: 23px;
        padding: 6px 14px 6px 14px;
        text-transform: uppercase;
    }

    .poll-all-load{
        width: 100%;
        text-align: center;
        margin-top: 75px;
    }

    .poll-all-load .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31 !important;
        padding: 20px 28px 20px 28px;
    }

    .footer-poll-all{
        margin-top: 125px;
    }

    .poll-all-preloader-card{
        padding-top: 20px;
    }
    
</style>

<style>
    .custom-container-xl-2{
        width: 90% !important;
    }

    @media screen and (min-width: 1904px){
        .custom-container-xl-2{
            width: 76% !important;
        }
    }
</style>