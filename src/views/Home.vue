<template>
    <div class="home">
        <div class="container custom-container-xl page-wrapped">
            <div class="banner" rounded>
                <v-row>
                    <v-col class="col-8 col-lg-10 d-flex justify-center flex-column" v-if="currentUser && userProfile">
                        <div>
                            <span class="banner-subtitle">Hello, {{ userProfile.display_name }}.</span>
                            <br>
                            <span class="banner-title">Good to see you again!</span>
                        </div>
                    </v-col>
                    <v-col class="col-8 col-lg-10 d-flex justify-center flex-column" v-else>
                        <div>
                            <span class="banner-subtitle">Welcome to</span>
                            <br>
                            <span class="banner-title">Best of Anime Indonesia</span>
                        </div>
                    </v-col>
                    <v-col class="col-4 col-lg-2 banner-image-wrap  d-flex justify-center align-center ml-auto mr-auto">
                        <img src="https://drive.google.com/uc?export=view&id=1-h3-hD4Q04DiT72qyaN8epauXoLv6wV_" width="200px">
                    </v-col>
                </v-row>
            </div>
            <div class="poll-items-special">
                <div class="poll-items-special-title section-title-wrapper">
                    <span class="section-title">
                        <i>RECOMMENDED POLL</i>
                    </span>
                </div>
                <div class="poll-items-special-slider">
                    <v-slide-group dark v-model="poll_recommended_slider" class="pa-4" show-arrows>
                        <v-slide-item v-for="(item, index) in poll_recommended" :key="index" >
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card :style="hover ? card.hover : card.non_hover" width="400px" :class=" index == 0 ? (' poll-items-special-slider-card') : ('custom-margin-left poll-items-special-slider-card')" @click="togglePollCard(item.date_created)" rounded="xl">
                                        <v-img class="white--text align-end" height="220px" :src="item.poster">
                                        </v-img>
                                        <v-card-text class="poll-items-special-slider-card-text">
                                            <div>
                                                <span v-if="hover" class="poll-items-special-slider-card-text-title"><u>{{ item.title }}</u></span>
                                                <span v-else class="poll-items-special-slider-card-text-title">{{ item.title }}</span>
                                            </div>
                                            <div class="poll-items-special-slider-card-text-description">
                                                {{ item.description }}
                                            </div>
                                            <div>
                                                <v-fade-transition>
                                                    <v-overlay v-if="hover" opacity="0.8" absolute color="#000000" class="poll-items-special-slider-card-image-overlay">
                                                        <div class="text-center">
                                                            <div class="poll-items-special-slider-card-image-overlay-title">{{ item.poll_voted }}</div>
                                                            <div class="poll-items-special-slider-card-image-overlay-subtitle">votes</div>
                                                        </div>
                                                    </v-overlay>
                                                </v-fade-transition>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-slide-item>
                    </v-slide-group>
                </div>
            </div>
            <div class="poll-items-latest">
                <div class="poll-items-latest-title section-title-wrapper d-flex">
                    <span class="section-title">
                        <i>LATEST POLL</i>
                    </span>
                    <span class="section-view-more ml-auto" @click="$router.push('/poll')">
                        <u>View more</u>
                        <v-icon dark>mdi-chevron-double-right</v-icon>
                    </span>
                </div>
                <div class="poll-items-latest-list">
                    <div v-for="(item, index) in poll_latest" :key="index">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-card @click="togglePollCard(item.date_created)" :style="hover ? card.hover : card.non_hover" class="poll-items-latest-list-card d-md-flex flex-row" rounded="xl" >
                                    <v-img class="justify-start poll-items-latest-list-card-image" :width="$vuetify.breakpoint.width < 960 ? '100%' : '200px'" :height="$vuetify.breakpoint.width < 960 ? '300px' : '150px'" :src="item.poster"></v-img>
                                    <v-card-text class="d-flex justify-center flex-column">
                                        <div class="poll-items-latest-list-card-title">
                                            <span v-if="hover"><u>{{ item.title }}</u></span>
                                            <span v-else>{{ item.title }}</span>
                                        </div>
                                        <div class="poll-items-latest-list-card-description">
                                            {{ item.description }}
                                        </div>
                                    </v-card-text>
                                    <div class="text-center d-none d-md-flex flex-column justify-center poll-items-latest-list-card-votes">
                                        <div class="poll-items-latest-list-card-votes-title">{{ item.poll_voted }}</div>
                                        <div class="poll-items-latest-list-card-votes-subtitle">votes</div>
                                    </div>
                                    <div>
                                        <v-fade-transition>
                                            <v-overlay class="poll-items-latest-list-card-image-overlay d-none d-md-flex" v-if="hover" opacity="0.8" absolute color="#000000">
                                                <div class="text-center">
                                                    <div class="poll-items-latest-list-card-image-overlay-title">{{ item.type }}</div>
                                                </div>
                                            </v-overlay>
                                        </v-fade-transition>
                                    </div>
                                </v-card>
                            </template>
                        </v-hover>
                    </div>
                </div>
            </div>
            <div class="poll-items-special-2">
                <div class="poll-items-latest-title section-title-wrapper d-flex">
                    <span class="section-title">
                        <i>POPULAR ENDED POLL</i>
                    </span>
                    <span class="section-view-more ml-auto" @click="$router.push('/poll/ended')">
                        <u>View more</u>
                        <v-icon dark>mdi-chevron-double-right</v-icon>
                    </span>
                </div>
                <div class="poll-items-special-slider">
                    <v-slide-group dark v-model="poll_ended_slider" class="pa-4" show-arrows>
                        <v-slide-item v-for="(item, index) in poll_ended" :key="index" >
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card :style="hover ? card.hover : card.non_hover" width="400px" :class=" index == 0 ? (' poll-items-special-slider-card') : ('custom-margin-left poll-items-special-slider-card')" @click="togglePollCard(item.date_created)" rounded="xl">
                                        <v-img class="white--text align-end" height="220px" :src="item.poster">
                                        </v-img>
                                        <v-card-text class="poll-items-special-slider-card-text">
                                            <div>
                                                <span v-if="hover" class="poll-items-special-slider-card-text-title"><u>{{ item.title }}</u></span>
                                                <span v-else class="poll-items-special-slider-card-text-title">{{ item.title }}</span>
                                            </div>
                                            <div class="poll-items-special-slider-card-text-description">
                                                {{ item.description }}
                                            </div>
                                            <div>
                                                <v-fade-transition>
                                                    <v-overlay v-if="hover" opacity="0.8" absolute color="#000000" class="poll-items-special-slider-card-image-overlay">
                                                        <div class="text-center">
                                                            <div class="poll-items-special-slider-card-image-overlay-title">{{ item.poll_voted }}</div>
                                                            <div class="poll-items-special-slider-card-image-overlay-subtitle">votes</div>
                                                        </div>
                                                    </v-overlay>
                                                </v-fade-transition>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-slide-item>
                    </v-slide-group>
                </div>
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase'
import { mapState } from 'vuex'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Home',
    data(){
        return {
            poll_recommended_slider: null,
            poll_ended_slider: null,
            poll_recommended: [],
            poll_latest: [],
            poll_ended: [],
            card: {
                hover: 'background: linear-gradient(294.69deg, #12253F 0%, #1A3760 100%);',
                non_hover: 'background: linear-gradient(294.69deg, rgba(18, 37, 63, 0.5) 0%, rgba(26, 55, 96, 0.5) 100%);',
            }
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile'])
    },
    async created() {
        let pollsRecommended
        let pollsLatest
        let pollsEnded
        try{
            pollsRecommended = await firebase.db.collection('polls').orderBy('poll_voted', 'desc').where('requested', '==', false).where('status', '==', 'ongoing').limit(5).get()
            pollsLatest = await firebase.db.collection('polls').orderBy('date_created', 'desc').where('requested', '==', false).where('status', '==', 'ongoing').limit(5).get()
            pollsEnded = await firebase.db.collection('polls').orderBy('poll_voted', 'desc').where('requested', '==', false).where('status', '==', 'ended').limit(5).get()
        }catch(error){
            console.log(error)
        }
        pollsRecommended.forEach((snapshot) => {
            let data = snapshot.data()
            data.description = this.substringDescription(data.description)
            this.poll_recommended.push(data)
        })
        pollsLatest.forEach((snapshot) => {
            let data = snapshot.data()
            data.description = this.substringDescription(data.description)
            this.poll_latest.push(data)
        })
        pollsEnded.forEach((snapshot) => {
            let data = snapshot.data()
            data.description = this.substringDescription(data.description)
            this.poll_ended.push(data)
        })
    },
    methods: {
        togglePollCard(date_created){
            let route = date_created.seconds + '+' + date_created.nanoseconds
            this.$router.push('/poll/detail/' + route)
        },
        substringDescription(description){
            let returnedDescription = description
            if(description.length > 50){
                returnedDescription = description.substring(0, 47)
                returnedDescription = returnedDescription + '...'
            }
            return returnedDescription
        }
    },
    components: {
        Footer
    }
}
</script>

<style scoped>
    .banner{
        background: linear-gradient(268.27deg, #1C3536 0%, #062337 100%);
        box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.25);
        margin-top: 75px;
        padding: 0 5% 0 5%;
        border-radius: 30px;
    }

    .banner-subtitle{
        font-size: 20px;
        font-weight: 400;
    }

    .banner-title{
        font-size: 30px;
        color: #519A9E;
        font-weight: 700;
    }

    .banner-image-wrap{
        padding: 0 !important;
    }

    .poll-items-special{
        margin-top: 100px;
    }

    .poll-items-special-2{
        margin-top: 160px;
    }

    .poll-items-special-title{
        margin-bottom: 35px;
    }

    .poll-items-special-slider-card-text{
        padding: 20px 32px;
    }

    .poll-items-special-slider-card-text-title, .poll-items-special-slider-card-text-title u{
        transition: ease-in-out .3s;
        font-size: 16px;
        color: #519A9E;
        font-weight: 600;
    }

    .poll-items-special-slider-card-text-description, .poll-items-latest-list-card-description{
        font-size: 14px;
        font-weight: 300;
        margin-top: 5px;
    }

    .poll-items-special-slider-card-image-overlay-title{
        font-size: 32px;
        font-weight: 700;
    }

    .poll-items-special-slider-card-image-overlay-subtitle{
        font-size: 16px;
        font-weight: 300;
        line-height: 35px;
    }

    .poll-items-latest{
        margin-top: 270px;
        position: relative;
    }
    
    .poll-items-latest::before{
        content: '';
        background: #09121E;
        position: absolute;
        width: 10000000000px;
        height: 1100px;
        margin-left: -100000px;
        margin-top: -75px;
        overflow: hidden;
    }

    .poll-items-latest-title{
        margin-bottom: 35px;
    }

    .poll-items-latest-list-card{
        margin-bottom: 30px;
        box-shadow: 2px 4px 30px #09121E;
        cursor: pointer;
        overflow: hidden;
    }

    .poll-items-latest-list-card-image{
        border-top-right-radius: 0 !important;
        border-bottom-left-radius: 0;
    }

    .poll-items-latest-list-card-title span, .poll-items-latest-list-card-title u{
        transition: ease-in-out .3s;
        font-size: 18px;
        color: #519A9E;
        font-weight: 600;
    }

    .poll-items-latest-list-card-description, .poll-items-latest-list-card-title{
        margin-left: 20px;
    }

    .poll-items-latest-list-card-image-overlay-title{
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0;
    }

    .poll-items-latest-list-card-votes{
        width: 250px;
    }

    .poll-items-latest-list-card-votes-title{
        font-size: 32px;
        font-weight: 700;
    }

    .poll-items-latest-list-card-votes-subtitle{
        font-size: 16px;
        font-weight: 300;
        margin-top: -5px;
    }

    .custom-margin-left{
        margin-left: 25px;
    }
</style>

<style>
    .custom-container-xl{
        width: 76%;
        margin-left: 12%;
        font-size: 20px;
        font-weight: 400;
    }

    .section-title{
        border-bottom: 4px solid #519A9E;
        font-size: 24px;
        font-weight: 700;
    }

    .section-title, .section-view-more{
        z-index: 4;
    }

    .section-view-more u{
        font-size: 14px;
        font-weight: 300;
        color: #f4f4f6;
        cursor: pointer;
        letter-spacing: 1px;
    }

    .section-view-more .v-icon{
        color: #519A9E;
        cursor: pointer;
    }

    .home .v-slide-group{
        padding: 0 !important;
    }

    .home .v-slide-group__next{
        position: absolute;
        width: 50%;
        z-index: 4;
        margin-left: 50%;
        justify-content: start;
        margin-top: 360px;
    }

    .home .v-slide-group__prev{
        position: absolute;
        width: 50%;
        z-index: 4;
        justify-content: flex-end;
        margin-top: 360px;
    }

    .home .v-slide-group__next i{
        transition: ease-in-out .3s;
        padding: 12px;
        margin-left: 20px;
        height: 100%;
        border: 2px solid #519A9E;
        border-radius: 100px;
    }

    .home .v-slide-group__prev--disabled i, .home .v-slide-group__next--disabled i{
        opacity: .5;
    }

    .home .v-slide-group__prev i{
        padding: 12px;
        margin-right: 20px;
        height: 100%;
        border: 2px solid #519A9E;
        border-radius: 100px;
        transition: ease-in-out .3s;
    }

    .home .v-overlay.poll-items-special-slider-card-image-overlay{
        height: 220px;
        width: 400px;
        border-top-left-radius: 23px;
        border-top-right-radius: 23px;
    }

    .home .v-overlay.poll-items-latest-list-card-image-overlay{
        border-top-left-radius: 23px;
        border-bottom-left-radius: 23px;
        border-bottom-right-radius: 0;
        width: 200px;
    }

    @media screen and (device-width: 960px){
        .home .v-overlay.poll-items-latest-list-card-image-overlay{
            border-top-left-radius: 23px;
            border-top-right-radius: 23px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            width: 100% !important;
            height: 150px;
        }

        .poll-items-latest-list-card-image{
            border-top-right-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
    }
</style>