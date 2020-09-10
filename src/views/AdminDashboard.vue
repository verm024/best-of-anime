<template>
    <div class="admin-dashboard">
        <div class="container page-wrapped">
             <v-row>
                <v-col class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <v-card color="transparent" class="admin-dashboard-card" flat>
                        <v-card-title class="admin-dashboard-card-title">
                            <span>
                                <i>ADMIN PLACE</i>
                                <hr>
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <div class="admin-dashboard-card-input">
                                <v-autocomplete clearable label="Search by Email" no-filter v-model="search_model" :search-input.sync="search" :items="search_items" dark @change="searchItemClick"></v-autocomplete>
                            </div>
                            <v-card color="#142A49" class="admin-dashboard-card-info" rounded="xl">
                                <v-card-text v-if="search_item_data" class="d-flex">
                                    <div class="admin-dashboard-card-info-image">
                                        <v-img :src="search_item_data.profile_picture" class="justify-start" width="100px" height="100px">

                                        </v-img>
                                    </div>
                                    <div class="admin-dashboard-card-info-text d-flex flex-column justify-center">
                                        <div class="admin-dashboard-card-info-text-name d-flex align-end">
                                            <span class="admin-dashboard-card-info-text-name-name">
                                                {{ search_item_data.display_name }}
                                            </span>
                                            <span class="admin-dashboard-card-info-text-name-tag">
                                                &nbsp; #{{ search_item_data.tag }}
                                            </span>
                                        </div>
                                        <div class="admin-dashboard-card-info-text-email d-flex align-end">
                                            <span>
                                                {{ search_item_data.email }}
                                            </span>
                                        </div>
                                        <div class="admin-dashboard-card-info-text-action d-flex align-end">
                                            <v-menu transition="slide-y-transition" offset-y rounded="0">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="#F4F4F6" v-bind="attrs" v-on="on">
                                                        <span class="mr-3">{{ search_item_data.status }}</span>
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list v-if="search_item_data.rank < 11" >
                                                    <v-list-item v-for="(item, index) in status_items" :key="index" @click="changeStatus(item)">
                                                        <v-list-item-title>{{ item }}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                                <v-list v-else>
                                                    <v-list-item v-for="(item, index) in status_items_admin_moderator" :key="index" @click="changeStatus(item)">
                                                        <v-list-item-title>{{ item }}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                    </v-card>
                </v-col>
             </v-row>
        </div>
        <Footer class="footer-admin-dashboard"></Footer>
    </div>
</template>

<script>
import firebase from '@/firebase'
import { mapState } from 'vuex'
import Footer from '@/components/Footer.vue'

export default {
    name: 'AdminDashboard',
    data() {
        return {
            users: [],
            search_items: [],
            search_model: '',
            search: null,
            search_item_data: null,
            status_items: ['Active', 'Warn 1', 'Warn 2', 'Warn 3', 'Banned'],
            status_items_admin_moderator: ['Active']
        }
    },
    async created() {
        let data = await firebase.db.collection('users').orderBy('rank', 'desc').where('rank','<', '11').limit(20).get()
        data.forEach((snapshot) => {
            this.users.push(snapshot.data())
        })
        this.search_item_data = this.userProfile
    },
    methods: {
        async searchItemClick(){
            let data
            try {
                data = await firebase.db.collection('users').where('email', '==', this.search_model).get()
            } catch (error) {
                console.log(error)
            }
            data.forEach((snapshot) => {
                this.search_item_data = snapshot.data()
            })
        },
        async changeStatus(status){
            if(status != this.search_item_data.status){
                try {
                    await firebase.db.collection('users').doc(this.currentUser.uid).update({status: status})
                } catch (error) {
                    console.log(error)
                }
                this.search_item_data.status = status
            }
        }
    },
    watch: {
        async search(val){
            this.search_items = []
            let data
            try {
                data = await firebase.db.collection('users').orderBy('email').startAt(val).endAt(val + '\uf8ff').get()
            } catch (error) {
                console.log(error)
            }
            data.forEach((snapshot) => {
                let snapshotData = snapshot.data()
                this.search_items.push(snapshotData.email)
            })
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser'])
    },
    components: {
        Footer
    }
}
</script>

<style scoped>

    .admin-dashboard-card-title{
        justify-content: center;
        margin-bottom: 35px;
        margin-top: 50px;
    }

    .admin-dashboard-card-title span i{
        padding-left: 20px;
        padding-right: 20px;
    }

    .admin-dashboard-card-title span hr{
        border: 3px solid #519A9E;
        margin-top: 10px;
    }

    .admin-dashboard-card-title span{
        font-size: 40px !important;
        font-weight: 700;
    }

    .admin-dashboard-card-input{
        margin-bottom: 20px;
    }

    .admin-dashboard-card-info{
        padding: 30px 30px;
        overflow-x: auto;
    }

    .admin-dashboard-card-info-image .v-image{
        border-radius: 5px;
        border: 4px solid #f4f4f6;
    }

    .admin-dashboard-card-info-text{
        margin-left: 30px;
    }
    .admin-dashboard-card-info-text-name{
        margin-bottom: 5px;
    }

    .admin-dashboard-card-info-text-name-name{
        font-size: 20px;
        font-weight: 700;
    }

    .admin-dashboard-card-info-text-name-tag{
        font-size: 14px;
        font-weight: 400;
        opacity: .8;
    }

    .admin-dashboard-card-info-text-email{
        font-size: 14px;
        font-weight: 400;
        opacity: .8;
        margin-bottom: 15px;
    }

    .admin-dashboard-card-info-text-action .v-btn span{
        color: #0E1D31;
        font-weight: 600;
        letter-spacing: 0;
    }

    .footer-admin-dashboard{
        margin-top: -363px;
    }
</style>