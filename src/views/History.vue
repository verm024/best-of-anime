<template>
    <div class="history">
        <div class="container page-wrapped">
            <v-row>
                <v-col class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <v-card color="transparent" class="history-card" flat>
                        <v-card-title class="history-card-title">
                            <span>
                                <i>HISTORY</i>
                                <hr>
                            </span>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="history-content">
                <v-col class="col-10 offset-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div class="history-votes">
                        <div v-if="votes.length == 0" class="history-section-title d-flex">
                            <span>
                                <i>YOUR VOTES</i>
                            </span>
                        </div>
                        <div v-else class="history-section-title history-margin-bottom d-flex">
                            <span>
                                <i>YOUR VOTES</i>
                            </span>
                        </div>
                        <div v-if="votes.length == 0" class="history-section-subtitle">
                            <span>
                                Nothing to show...
                            </span>
                        </div>
                        <v-card v-for="(item, index) in votes" :key="index" color="#142A49" class="history-card" rounded="xl" style="overflow-y: hidden">
                            <v-card-text class="d-flex">
                                <div class="history-card-info-image">
                                    <v-img :src="item.poll.poster" class="justify-start" width="150px" height="150px">

                                    </v-img>
                                </div>
                                <div class="history-card-info-text d-flex flex-column justify-center">
                                    <div class="history-card-info-text-title d-flex align-end">
                                        <span>
                                            {{ item.poll.title }}
                                        </span>
                                    </div>
                                    <div class="history-card-info-text-subtitle d-flex align-end">
                                        <span v-if="item.poll.type == 'anime'">
                                            {{ item.poll.nominations[item.index_voted].title }}
                                        </span>
                                        <span v-else-if="item.poll.type == 'manga'">
                                            {{ item.poll.nominations[item.index_voted].title }}
                                        </span>
                                        <span v-else-if="item.poll.type == 'character'">
                                            {{ item.poll.nominations[item.index_voted].name }}
                                        </span>
                                        <span v-else-if="item.poll.type == 'couple'">
                                            {{ item.poll.nominations[item.index_voted].couple_1 }} x {{ item.poll.nominations[item.index_voted].couple_2 }}
                                        </span>
                                        <span v-else-if="item.poll.type == 'soundtrack'">
                                            {{ item.poll.nominations[item.index_voted].song }}
                                        </span>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                        <div v-if="votes.length != 0" class="history-votes-hint">
                            <span>Kami hanya akan menampilkan maksimal 10 vote terakhir.</span>
                        </div>
                    </div>
                    <div class="history-polls">
                        <div v-if="polls.length == 0" class="history-section-title d-flex">
                            <span>
                                <i>INITIATED POLLS</i>
                            </span>
                        </div>
                        <div v-else class="history-section-title history-margin-bottom d-flex">
                            <span>
                                <i>INITIATED POLLS</i>
                            </span>
                        </div>
                        <div v-if="polls.length == 0" class="history-section-subtitle">
                            <span>
                                Nothing to show...
                            </span>
                        </div>
                        <v-card v-for="(item, index) in polls" :key="index" color="#142A49" class="history-card" rounded="xl" style="overflow-y: hidden">
                            <v-card-text class="d-flex">
                                <div class="history-card-info-image">
                                    <v-img :src="item.poll.poster" class="justify-start" width="150px" height="150px">

                                    </v-img>
                                </div>
                                <div class="history-card-info-text d-flex flex-column justify-center">
                                    <div class="history-card-info-text-title d-flex align-end">
                                        <span>
                                            {{ item.poll.title }}
                                        </span>
                                    </div>
                                    <div class="history-card-info-text-subtitle d-flex align-end" >
                                        <span style="text-transform: capitalize">
                                            {{ item.poll.status }}
                                        </span>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                        <div v-if="!loading" class="history-load">
                            <v-btn color="#f4f4f6" rounded @click="loadMorePoll()" v-if="!load_polls_last">load more</v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-dialog v-model="loading" width="250px" persistent >
                <v-card rounded="xl" class="history-preloader-card" color="#13252F">
                    <v-card-text>
                        <v-row class="justify-center">
                            <v-col class="col-12 text-center">
                                <span class="headline white--text">Loading polls...</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <Footer class="footer-history"></Footer>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase'
import { mapState } from 'vuex'
import Footer from '@/components/Footer.vue'

export default {
    name: 'History',
    data() {
        return {
            votes: [],
            polls: [],
            poll_last_visible: '',
            load_polls_last: false,
            loading: false
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile'])
    },
    async created(){
        this.loading = true
        let dataVotes
        let dataPolls
        try {
            dataVotes = await firebase.db.collection('users').doc(this.currentUser.uid).collection('votes').orderBy('date_created', 'desc').limit(10).get()
            dataPolls = await firebase.db.collection('users').doc(this.currentUser.uid).collection('polls').orderBy('date_created', 'desc').limit(10).get()
        } catch (error) {
            console.log(error)
        }
        dataVotes.docs.forEach(async (snapshot, index) => {
            this.votes.push(snapshot.data())
            let poll = await this.votes[index].poll.get()
            this.votes[index].poll = poll.data()
        })
        if(dataPolls.size < 5){
            this.load_polls_last = true
        }
        dataPolls.docs.forEach(async (snapshot, index) => {
            this.polls.push(snapshot.data())
            let poll = await this.polls[index].poll.get()
            this.polls[index].poll = poll.data()
            if(index == dataPolls.size - 1){
                this.poll_last_visible = snapshot.data()
            }
        })
        this.loading = false
    },
    methods: {
        async loadMorePoll(){
            let data
            try {
                data = await firebase.db.collection('users').doc(this.currentUser.uid).collection('polls').orderBy('date_created', 'desc').startAfter(this.poll_last_visible.date_created).limit(5).get()
            } catch (error) {
                console.log(error)
            }
            if(data.size < 5){
                this.load_polls_last = true
            }
            data.docs.forEach(async (snapshot, index) => {
                this.polls.push(snapshot.data())
                let poll = await this.polls[index].poll.get()
                this.polls[index].poll = poll.data()
                if(index == data.size - 1){
                    this.poll_last_visible = snapshot.data()
                }
            })
        }
    },
    components: {
        Footer
    }
}
</script>

<style scoped>
    .history-margin-bottom{
        margin-bottom: 25px;
    }

    .history-card{
        padding: 12px 16px;
    }

    .history-content{
        margin-top: -30px;
    }

    .history-section-title{
        font-size: 24px;
        font-weight: 700;
        z-index: 4;
    }

    .history-card-title{
        justify-content: center;
        margin-bottom: 35px;
        margin-top: 50px;
    }

    .history-card-title span i{
        padding-left: 20px;
        padding-right: 20px;
    }

    .history-card-title span hr{
        border: 3px solid #519A9E;
        margin-top: 10px;
    }

    .history-card-title span{
        font-size: 40px !important;
        font-weight: 700;
    }

    .history-card-info-image .v-image{
        border-radius: 5px;
        border: 4px solid #f4f4f6;
    }

    .history-card-info-text{
        margin-left: 30px;
    }

    .history-card-info-text-title{
        margin-bottom: 5px;
    }

    .history-card-info-text-title span{
        font-size: 18px;
        font-weight: 700;
    }
    
    .history-card-info-text-subtitle{
        font-size: 14px;
        font-weight: 400;
        opacity: .8;
    }

    .history-votes-hint{
        font-size: 14px;
        width: 100%;
        text-align: center;
        margin-top: 15px;
    }
    
    .history-load{
        width: 100%;
        text-align: center;
        margin-top: 45px;
    }

    .history-load .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31 !important;
        padding: 20px 28px 20px 28px;
    }

    .history-section-subtitle{
        opacity: .8;
    }

    .history-polls{
        margin-top: 60px;
    }

    .history-preloader-card{
        padding-top: 20px;
    }

    .footer-history{
        margin-top: 100px;
    }
</style>