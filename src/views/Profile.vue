<template>
    <div class="profile">
        <div class="container custom-container-xl page-wrapped">
            <div class="profile-card-wrapper d-flex align-center">
                <v-row>
                    <v-col class="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-card class="profile-card text-center" v-bind="attrs" v-on="on" rounded="xl" @click="$router.push('/confirmpassword')">
                                    <v-img class="ml-auto mr-auto profile-card-image" :style="'border: 4px solid ' + userProfile.stroke_color + ';'" :src="userProfile.profile_picture" lazy-src="https://drive.google.com/uc?export=view&id=1J2L9goqwU52ScQfjzX6N3tUI6sYu74vC" width="100px" height="100px">

                                    </v-img>
                                    <v-card-text>
                                        <div class="profile-card-name" :style="'color: ' + userProfile.name_color + ';'">
                                            {{ userProfile.display_name }}
                                        </div>
                                        <div class="profile-card-title">
                                            {{ userProfile.title }} <v-icon size="14px" class="ml-1 pb-1" dark>mdi-pencil</v-icon>
                                        </div>
                                        <div class="profile-card-rank">
                                            {{ userProfile.rank }}
                                        </div>
                                        <div class="profile-card-exp">
                                            {{ userProfile.exp }} EXP
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </template>
                            <span>Click to edit profile  <v-icon size="16px" class="ml-1 pb-1" dark>mdi-pencil</v-icon></span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </div>
            <div class="unlockable text-center">
                <div class="unlockable-title section-title-wrapper">
                    <span class="section-title">
                        <i>UNLOCKABLES</i>
                    </span>
                </div>
                <div class="unlockable-item">
                    <v-row>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#8E24AA" class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 4" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv4</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Purple
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#F48FB1"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 6" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv6</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Pink
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#42A5F5"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 2" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv2</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Blue
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#558B2F"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 4" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv4</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Green
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#AEEA00"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 9" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv9</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Lime
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#FB8C00"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 5" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv5</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Orange
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#FFEE58"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 3" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv3</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Yellow
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#80DEEA"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 8" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv8</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Cyan
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#519A9E"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 1" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv1</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Teal
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#E53935"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 10" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv10</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Red
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#78909C"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 6" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv6</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Grey
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#5C6BC0"  class="unlockable-item-tile ml-auto mr-auto" height="85px" width="85px">
                                <v-overlay v-if="userProfile.rank < 7" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv7</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Indigo
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#F4F4F6"  class="unlockable-item-tile ml-auto mr-auto d-flex justify-center align-center" height="85px" width="85px">
                                <v-icon class="unlockable-item-tile-icon">
                                    mdi-message-bulleted
                                </v-icon>
                                <v-overlay v-if="userProfile.rank < 3" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv3</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Comment
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#F4F4F6"  class="unlockable-item-tile ml-auto mr-auto d-flex justify-center align-center" height="85px" width="85px">
                                <v-icon class="unlockable-item-tile-icon">
                                    mdi-briefcase-check
                                </v-icon>
                                <v-overlay v-if="userProfile.rank < 7" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv7</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Request Poll
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#F4F4F6"  class="unlockable-item-tile ml-auto mr-auto d-flex justify-center align-center" height="85px" width="85px">
                                <v-icon class="unlockable-item-tile-icon">
                                    mdi-plus-circle
                                </v-icon>
                                <v-overlay v-if="userProfile.rank < 9" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv9</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Create Poll
                            </div>
                        </v-col>
                        <v-col class="col-12 col-sm-6 col-md-3">
                            <v-card rounded="xl" color="#F4F4F6"  class="unlockable-item-tile ml-auto mr-auto d-flex justify-center align-center" height="85px" width="85px">
                                <v-icon class="unlockable-item-tile-icon">
                                    mdi-vote
                                </v-icon>
                                <v-overlay v-if="userProfile.rank < 5" opacity="0.8" absolute color="#000000" class="unlockable-item-tile-overlay">
                                    <div class="text-center">
                                        <div class="unlockable-item-tile-overlay-title">Lv5</div>
                                    </div>
                                </v-overlay>
                            </v-card>
                            <div class="unlockable-item-text">
                                Special Vote
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <Footer class="profile-footer"></Footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '../firebase'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Profile',
    data() {
        return {
            temp_name_color: '#64DD17',
            temp_stroke_color: '#F57F17'
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile']),
    },
    components: {
        Footer
    }
}
</script>

<style scoped>
    .profile-card-wrapper{
        margin-top: 100px;
        margin-bottom: 75px;
    }

    .profile-card{
        background: linear-gradient(294.69deg, rgba(18, 37, 63, 0.75) 0%, rgba(26, 55, 96, 0.75) 100%);
        padding-top: 50px;
        padding-bottom: 30px;
        cursor: pointer;
    }

    .profile-card-image{
        border-radius: 100px !important;
    }

    .profile-card-name{
        font-size: 30px;
        font-weight: 700;
        margin-top: 10px;
    }

    .profile-card-title{
        font-size: 16px;
        font-weight: 400;
        opacity: .7;
        margin-top: 15px;
    }

    .profile-card-rank{
        margin-top: 30px;
        font-weight: 700;
        border: 3px solid #519A9E;
        border-radius: 100px;
        padding: 5px;
        width: 40px;
        margin-left: auto;
        margin-right: auto;
    }

    .profile-card-exp{
        margin-top: 15px;
        font-weight: 600;
        letter-spacing: 0;
        font-size: 16px;
    }

    .unlockable-title{
        margin-bottom: 65px;
    }

    .unlockable-item-tile{
        border: 4px solid #f4f4f6 !important;
        box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.25);
    }

    .unlockable-item-text{
        font-size: 16px;
        font-weight: 300;
        margin-bottom: 20px;
        margin-top: 10px;
    }

    .unlockable-item-tile-icon{
        color: #519A9E;
        font-size: 32px;
    }

    .unlockable-item-tile-overlay-title{
        font-size: 20px;
        font-weight: 400;
    }

    .profile-footer{
        margin-top: 125px;
    }
</style>