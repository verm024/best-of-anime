<template>
    <div class="moderator-dashboard">
        <div class="container page-wrapped custom-container-xl-2">
            <v-row>
                <v-col class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <v-card color="transparent" class="moderator-dashboard-card" flat>
                        <v-card-title class="moderator-dashboard-card-title">
                            <span>
                                <i>MODERATOR PLACE</i>
                                <hr>
                            </span>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <div class="moderator-dashboard-request">
                <div class="moderator-dashboard-section-title d-flex">
                    <span>
                        <i>REQUESTED</i>
                    </span>
                </div>
                <div v-if="polls_requested.length == 0" class="moderator-dashboard-section-subtitle">
                    <span>
                        Nothing to show...
                    </span>
                </div>
                <div class="moderator-dashboard-list moderator-dashboard-request d-flex flex-column">
                    <div v-for="(item, index) in polls_requested" :key="index" class="moderator-dashboard-list-item">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <div class="moderator-dashboard-list-item-content d-flex flex-row align-start" @click="goToPollPageFromList(item.date_created, 'requested')">
                                    <div class="moderator-dashboard-list-item-content-image">
                                        <v-img :src="item.poster" :height="$vuetify.breakpoint.width < 960 ? '150px' : '200px'" :width="$vuetify.breakpoint.width < 960 ? '150px' : '200px'">
                                        </v-img>
                                    </div>
                                    <div class="moderator-dashboard-list-item-content-text ml-6 ml-md-10">
                                        <div v-if="!hover" class="moderator-dashboard-list-item-content-text-title">
                                            <span>{{ item.title }}</span>
                                        </div>
                                        <div v-else class="moderator-dashboard-list-item-content-text-title-hover">
                                            <span>{{ item.title }}</span>
                                        </div>
                                        <div class="moderator-dashboard-list-item-content-text-description">
                                            <span>{{ item.description }}</span>
                                        </div>
                                        <div class="moderator-dashboard-list-item-content-text-type">
                                            <span>{{ item.type }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </v-hover>
                        <hr>
                    </div>
                </div>
            </div>
            <div class="moderator-dashboard-reject">
                <div class="moderator-dashboard-section-title d-flex">
                    <span>
                        <i>REJECTED</i>
                    </span>
                </div>
                <div v-if="polls_rejected.length == 0" class="moderator-dashboard-section-subtitle">
                    <span>
                        Nothing to show...
                    </span>
                </div>
                <div class="moderator-dashboard-list moderator-dashboard-reject d-flex flex-column">
                    <div v-for="(item, index) in polls_rejected" :key="index" class="moderator-dashboard-list-item">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <div class="moderator-dashboard-list-item-content d-flex flex-row align-start" @click="goToPollPageFromList(item.date_created, 'rejected')">
                                    <div class="moderator-dashboard-list-item-content-image">
                                        <v-img :src="item.poster" :height="$vuetify.breakpoint.width < 960 ? '150px' : '200px'" :width="$vuetify.breakpoint.width < 960 ? '150px' : '200px'">
                                        </v-img>
                                    </div>
                                    <div class="moderator-dashboard-list-item-content-text ml-6 ml-md-10">
                                        <div v-if="!hover" class="moderator-dashboard-list-item-content-text-title">
                                            <span>{{ item.title }}</span>
                                        </div>
                                        <div v-else class="moderator-dashboard-list-item-content-text-title-hover">
                                            <span>{{ item.title }}</span>
                                        </div>
                                        <div class="moderator-dashboard-list-item-content-text-description">
                                            <span>{{ item.description }}</span>
                                        </div>
                                        <div class="moderator-dashboard-list-item-content-text-type">
                                            <span>{{ item.type }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </v-hover>
                        <hr>
                    </div>
                </div>
                <div v-if="!loading" class="moderator-dashboard-load">
                    <v-btn color="#f4f4f6" rounded @click="loadMorePoll('rejected')" v-if="polls_rejected.length < poll_counter.rejected - 1">load more</v-btn>
                </div>
            </div>
            <div :class="(polls_rejected.length < poll_counter.rejected - 1) ? 'moderator-dashboard-cancel moderator-dashboard-custom-margin-top' : 'moderator-dashboard-cancel'">
                <div class="moderator-dashboard-section-title d-flex">
                    <span>
                        <i>CANCELED</i>
                    </span>
                </div>
                <div v-if="polls_canceled.length == 0" class="moderator-dashboard-section-subtitle">
                    <span>
                        Nothing to show...
                    </span>
                </div>
                <div class="moderator-dashboard-list moderator-dashboard-cancel d-flex flex-column">
                    <div v-for="(item, index) in polls_canceled" :key="index" class="moderator-dashboard-list-item">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <div class="moderator-dashboard-list-item-content d-flex flex-row align-start" @click="goToPollPageFromList(item.date_created, 'canceled')">
                                    <div class="moderator-dashboard-list-item-content-image">
                                        <v-img :src="item.poster" :height="$vuetify.breakpoint.width < 960 ? '150px' : '200px'" :width="$vuetify.breakpoint.width < 960 ? '150px' : '200px'">
                                        </v-img>
                                    </div>
                                    <div class="moderator-dashboard-list-item-content-text ml-6 ml-md-10">
                                        <div v-if="!hover" class="moderator-dashboard-list-item-content-text-title">
                                            <span>{{ item.title }}</span>
                                        </div>
                                        <div v-else class="moderator-dashboard-list-item-content-text-title-hover">
                                            <span>{{ item.title }}</span>
                                        </div>
                                        <div class="moderator-dashboard-list-item-content-text-description">
                                            <span>{{ item.description }}</span>
                                        </div>
                                        <div class="moderator-dashboard-list-item-content-text-type">
                                            <span>{{ item.type }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </v-hover>
                        <hr>
                    </div>
                </div>
                <div v-if="!loading" class="moderator-dashboard-load">
                    <v-btn color="#f4f4f6" rounded @click="loadMorePoll('canceled')" v-if="polls_canceled.length < poll_counter.canceled - 1">load more</v-btn>
                </div>
            </div>
            <v-dialog v-model="loading" width="250px" persistent >
                <v-card rounded="xl" class="moderator-dashboard-preloader-card" color="#13252F">
                    <v-card-text>
                        <v-row class="justify-center">
                            <v-col class="col-12 text-center">
                                <span class="headline white--text">Loading polls...</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <Footer class="footer-moderator-dashboard"></Footer>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase'
import Footer from '@/components/Footer.vue'

export default {
    name: 'ModeratorDashboard',
    data() {
        return {
            polls_requested: [],
            polls_rejected: [],
            polls_canceled: [],
            poll_rejected_last_visible: '',
            poll_canceled_last_visible: '',
            poll_counter: 0,
            loading: false
        }
    },
    async created(){
        this.loading = true
        let dataRequested
        let dataRejected
        let dataCanceled
        let pollCounter = await firebase.db.collection('counter').doc('poll_counter').get()
        this.poll_counter = pollCounter.data()
        try {
            dataRequested = await firebase.db.collection('polls').where('requested', '==', true).orderBy('date_created', 'asc').get()
            dataRejected = await firebase.db.collection('polls').where('requested', '==', false).where('status', '==', 'rejected').orderBy('date_created', 'desc').limit(5).get()
            dataCanceled = await firebase.db.collection('polls').where('requested', '==', false).where('status', '==', 'canceled').orderBy('date_created', 'desc').limit(5).get()
        } catch (error) {
            console.log(error)
        }
        dataRequested.docs.forEach((snapshot) => {
            this.polls_requested.push(snapshot.data())
        })
        dataRejected.docs.forEach((snapshot, index) => {
            this.polls_rejected.push(snapshot.data())
            if(index == dataRejected.size - 1){
                this.poll_rejected_last_visible = snapshot.data()
            }
        })
        dataCanceled.docs.forEach((snapshot, index) => {
            this.polls_canceled.push(snapshot.data())
            if(index == dataCanceled.size - 1){
                this.poll_canceled_last_visible = snapshot.data()
            }
        })
        this.loading = false
    },
    methods: {
        async loadMorePoll(status){
            let data
            try {
                if(status == 'rejected'){
                    data = await firebase.db.collection('polls').where('requested', '==', false).where('status', '==', status).orderBy('date_created', 'desc').startAfter(this.poll_rejected_last_visible.date_created).limit(5).get()
                }
                else{
                    data = await firebase.db.collection('polls').where('requested', '==', false).where('status', '==', status).orderBy('date_created', 'desc').startAfter(this.poll_canceled_last_visible.date_created).limit(5).get()
                }
                
            } catch (error) {
                console.log(error)
            }
            if(status == 'rejected'){
                data.docs.forEach((snapshot, index) => {
                    this.polls_rejected.push(snapshot.data())
                    if(index == data.size - 1){
                        this.poll_rejected_last_visible = snapshot.data()
                    }
                })
            }
            else{
                data.docs.forEach((snapshot, index) => {
                    this.polls_canceled.push(snapshot.data())
                    if(index == data.size - 1){
                        this.poll_canceled_last_visible = snapshot.data()
                    }
                })
            }
        },
        goToPollPageFromList(date, status){
            this.$router.push('/poll/' + status + '/' + date.seconds + '+' + date.nanoseconds)
        }
    },
    components: {
        Footer
    }
}
</script>

<style scoped>
    .moderator-dashboard-card-title{
        justify-content: center;
        margin-bottom: 35px;
        margin-top: 50px;
    }

    .moderator-dashboard-card-title span i{
        padding-left: 20px;
        padding-right: 20px;
    }

    .moderator-dashboard-card-title span hr{
        border: 3px solid #519A9E;
        margin-top: 10px;
    }

    .moderator-dashboard-card-title span{
        font-size: 40px !important;
        font-weight: 700;
    }

    .moderator-dashboard-section-title{
        font-size: 24px;
        font-weight: 700;
        z-index: 4;
    }

    .moderator-dashboard-section-subtitle{
        opacity: .8;
    }

    .moderator-dashboard-list{
        margin-top: 50px;
        width: 100%;
    }

    .moderator-dashboard-list-item{
        margin-bottom: 60px;
        width: 100%;
    }

    .moderator-dashboard-list-item hr{
        opacity: .8;
    }

    .moderator-dashboard-list-item-content{
        margin-bottom: 40px;
        padding-left: 30px;
        padding-right: 30px;
        cursor: pointer;
    }

    .moderator-dashboard-list-item-content-text{
        margin-top: 30px;
    }

    .moderator-dashboard-list-item-content-text-title, .moderator-dashboard-list-item-content-text-title-hover{
        margin-bottom: 5px;
    }

    .moderator-dashboard-list-item-content-text-title-hover span{
        color: #519A9E;
        text-decoration: underline;
        font-size: 18px;
        font-weight: 700;
        transition: ease-in-out .2s;
    }

    .moderator-dashboard-list-item-content-text-title span{
        font-size: 18px;
        font-weight: 700;
        transition: ease-in-out .2s;
    }

    .moderator-dashboard-list-item-content-text-description{
        margin-bottom: 25px;
        max-height: 96px;
        overflow: auto;
    }

    .moderator-dashboard-list-item-content-text-description span{
        font-size: 14px;
        font-weight: 400;
    }

    .moderator-dashboard-list-item-content-text-type span{
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0;
        width: auto;
        background: #519A9E;
        border-radius: 23px;
        padding: 6px 14px 6px 14px;
        text-transform: uppercase;
    }

    .moderator-dashboard-load{
        width: 100%;
        text-align: center;
    }

    .moderator-dashboard-load .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31 !important;
        padding: 20px 28px 20px 28px;
    }

    .footer-moderator-dashboard{
        margin-top: 125px;
    }

    .moderator-dashboard-preloader-card{
        padding-top: 20px;
    }

    .moderator-dashboard-custom-margin-top{
        margin-top: 60px;
    }
</style>