<template>
    <div class="poll-detail">
        <div v-if="poll_data[0]" class="container page-wrapped custom-container-xl">
            <div class="poll-detail-title d-flex flex-row align-center">
                <div class="poll-detail-title-text">
                    <span>
                        {{ poll_data[0].title }}
                    </span>
                </div>
                <div class="poll-detail-title-action ml-auto">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                </div>
            </div>
            <div class="poll-detail-profile d-flex flex-row align-center">
                <div class="poll-detail-profile-image">
                    <v-img width="60px" height="60px" :style="'border: 3px solid ' + poll_data[0].user.stroke_color" :src="poll_data[0].user.profile_picture"></v-img>
                </div>
                <div class="poll-detail-profile-text ml-6">
                    <div class="poll-detail-profile-text-name">
                        <span class="poll-detail-profile-text-name-name" :style="'color: ' + poll_data[0].user.name_color">
                            {{ poll_data[0].user.display_name }}
                        </span>
                        <span class="poll-detail-profile-text-name-tag">
                            #{{ poll_data[0].user.tag }}
                        </span>
                    </div>
                    <div class="poll-detail-profile-text-rank">
                        <span>
                            {{ poll_data[0].user.title }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="poll-detail-poster">
                <v-img :src="poll_data[0].poster" width="100%" max-height="600px"></v-img>
            </div>
            <div class="poll-detail-description">
                <span>
                    {{ poll_data[0].description }}
                </span>
            </div>
            <div class="poll-detail-result">
                <div class="poll-detail-result-top">
                    <div class="poll-detail-result-top-left-square">
                        
                    </div>
                    <div class="poll-detail-result-top-right-square">
                        
                    </div>
                    <div class="poll-detail-result-app">
                        <span>
                            BEST OF ANIME INDONESIA 
                        </span>
                    </div>
                    <div class="poll-detail-result-title">
                        <span>
                            {{ poll_data[0].title }}
                        </span>
                    </div>
                    <div class="poll-detail-result-detail">
                        <span>
                            {{ poll_data[0].type }}
                        </span>
                    </div>
                </div>
                <div class="poll-detail-result-items">
                    <div v-for="(item, index) in poll_data[0].nominations" :key="index" class="poll-detail-result-items-card d-flex flex-row">
                        <div class="poll-detail-result-items-list d-flex align-center justify-center flex-column">
                            <div class="poll-detail-result-items-rank">
                                <span>
                                    {{ index + 1 }}
                                </span>
                            </div>
                            <div class="poll-detail-result-items-votes">
                                <span>
                                    {{ item.item_voted }} votes
                                </span>
                            </div>
                        </div>
                        <div class="poll-detail-result-items-text ml-auto mr-6 d-flex justify-center flex-column text-right">
                            <div class="poll-detail-result-items-title">
                                <span>
                                    <i>{{ item.title }}</i>
                                </span>
                            </div>
                            <div class="poll-detail-result-items-subtitle">
                                <span>
                                    {{ item.genre }}
                                </span>
                            </div>
                        </div>
                        <div class="poll-detail-result-items-image">
                            <v-img width="225px" height="150px" :src="item.poster">
                                <v-overlay color="#0B4066" opacity=".3" absolute>
                                    
                                </v-overlay>
                            </v-img>
                        </div>
                    </div>
                </div>
            </div>
            <div class="poll-detail-vote">
                <div class="poll-detail-vote-title section-title-wrapper d-flex">
                    <span class="section-title">
                        <i>VOTE THIS POLL</i>
                    </span>
                </div>
                <div v-if="isvoted" class="poll-detail-vote-section-subtitle section-subtitle">
                    <span>
                        Kamu sudah vote poll ini.
                    </span>
                </div>
                <div class="poll-detail-vote-input-wrapper d-flex align-center">
                    <div class="poll-detail-vote-input">
                        <v-select v-model="vote_choice" :items="poll_data[0].nominations" item-text="title" return-object label="Your Choice" dark>
                        </v-select>
                    </div>
                    <div color="#f4f4f6" class="poll-detail-vote-button ml-10">
                        <v-btn>
                            VOTE
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="poll-detail-comment">
                <div class="poll-detail-vote-title section-title-wrapper d-flex">
                    <span class="section-title">
                        <i>COMMENTS</i>
                    </span>
                </div>
                <div v-if="isvoted" class="poll-detail-vote-section-subtitle section-subtitle">
                    <span>
                        Belum ada komentar.
                    </span>
                </div>
            </div>
        </div>
        <span v-if="poll_data[0]">{{ poll_data[0].nominations }}</span>
        <div v-if="!isvoted && poll_data[0]">
            <select v-if="poll_data[0].status == 'ongoing'" v-model="vote_choice">
                <option v-for="(item, index) in poll_data[0].nominations" :key="index" :value="index">{{ item.title }}</option>
            </select>
            <v-btn @click="saveVote()">Vote</v-btn>
        </div>
    </div>
</template>

<script>
import firebase from '../../firebase'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            poll_data: [],
            isvoted: false,
            vote_choice: 0,
        }
    },
    watch: {
        poll_datas: {
            immediate: true,
            handler(){
                let time = parseInt(this.$route.params.date.split('+')[1]) / 1000000 + parseInt(this.$route.params.date.split('+')[0]) * 1000
                let date = new Date(time)
                this.$bind('poll_data', firebase.db.collection('polls').where('date_created', '==', date))
            }
        },
        isvoted: {
            immediate: true,
            async handler(){
                let data
                try {
                    data = await firebase.db.collection('users').doc(this.currentUser.uid).collection('votes').doc(this.$route.params.date).get()
                } catch (error) {
                    console.log(error)
                }
                this.isvoted = data.exists
            }
        }
    },
    methods: {
        async saveVote(){
            let time = parseInt(this.$route.params.date.split('+')[1]) / 1000000 + parseInt(this.$route.params.date.split('+')[0]) * 1000
            let date = new Date(time)
            let newExp = this.userProfile.exp + 50 * ((15 + this.poll_data[0].nominations.length) / 10)
            let nominationsData = this.poll_data[0].nominations
            let index = this.poll_data[0].nominations.findIndex((found) => {
                return found == this.vote_choice
            })
            nominationsData[index].item_voted = nominationsData[index].item_voted + 1
            nominationsData = nominationsData.sort(function(a, b){return b.item_voted - a.item_voted})
            let totalVoted = this.poll_data[0].poll_voted + 1
            try {
                await firebase.db.collection('polls').doc(this.poll_data[0]["id"]).update({ nominations: nominationsData, poll_voted: totalVoted })
                await firebase.db.collection('users').doc(this.currentUser.uid).collection('votes').doc(this.$route.params.date).set({poll: firebase.db.collection('polls').doc(this.poll_data[0]["id"]), index_voted: this.vote_choice, date_created: new Date()})
                await firebase.db.collection('users').doc(this.currentUser.uid).update({exp: newExp})
            } catch (error) {
                console.log(error)
            }
            this.isvoted = true
        },
    },
    computed: {
        ...mapState(['currentUser', 'userProfile']),
    },
}
</script>

<style scoped>

    .poll-detail-profile-image .v-image{
        border-radius: 100px;
    }

    .poll-detail-title{
        margin-top: 75px;
        margin-bottom: 20px;
    }

    .poll-detail-title-text span{
        font-weight: 700;
        font-size: 28px;
    }

    .poll-detail-profile{
        margin-bottom: 30px;
    }

    .poll-detail-profile-text-name-name{
        font-size: 20px;
        font-weight: 600;
    }

    .poll-detail-profile-text-name-tag{
        font-size: 14px;
        font-weight: 400;
        opacity: .8;
    }

    .poll-detail-profile-text-rank{
        font-size: 14px;
        font-weight: 400;
    }

    .poll-detail-poster{
        margin-bottom: 20px;
    }

    .poll-detail-poster .v-image{
        border-radius: 10px;
    }

    .poll-detail-description{
        margin-bottom: 60px;
    }

    .poll-detail-description span{
        font-size: 16px;
        font-weight: 500;
        text-align: justify;
    }
    
    .poll-detail-result{
        padding: 24px 24px 8px 24px;
        border: 4px solid rgba(244, 244, 246, 0.6);
        overflow: hidden;
        background: #050910;
    }

    .poll-detail-result-top-left-square{
        width: 150px;
        height: 150px;
        background: #1B3436;
        margin-top: -40px;
        margin-inline-end: auto;
        right: 0;
        margin-right: 0;
    }

    .poll-detail-result-top-right-square{
        width: 150px;
        height: 150px;
        background: #1B3436;
        margin-left: auto;
        margin-top: -40px;
        margin-inline-end: auto;
        right: 0;
        margin-right: 0;
        margin-top: -150px;
    }

    .poll-detail-result-top{
        margin: -24px -24px 0 -24px;
        background: #122330;
        text-align: center;
        padding-top: 40px;
        padding-bottom: 40px;
        margin-bottom: 24px;
    }

    .poll-detail-result-app{
        margin-top: -110px;
    }

    .poll-detail-result-app span{
        font-size: 28px;
        font-weight: 700;
    }

    .poll-detail-result-title span{
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        color: #519A9E;
    }

    .poll-detail-result-detail{
        font-size: 14px;
        font-weight: 400;
        opacity: .8;
        text-transform: capitalize;
    }

    .poll-detail-result-items-card{
        background: #11233D;
        margin-bottom: 16px;
    }

    .poll-detail-result-items-list{
        background: #13252F;
        width: 150px;
        height: 150px;
    }

    .poll-detail-result-items-rank{
        font-size: 36px;
        font-weight: 700;
    }

    .poll-detail-result-items-votes{
        font-size: 14px;
        font-weight: 400;
        opacity: .8;
    }

    .poll-detail-result-items-title span i{
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 700;
    }

    .poll-detail-result-items-subtitle span{
        text-transform: capitalize;
        font-size: 16px;
        font-weight: 400;
        opacity: .8;
    }

    .poll-detail-vote-input{
        width: 50%;
    }

    .poll-detail-vote-button .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31 !important;
        padding: 20px 28px 20px 28px;
    }
    
</style>