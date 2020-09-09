<template>
    <div class="profile-edit">
        <div class="container page-wrapped">
            <v-row>
                <v-col class="col-10 offset-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <v-card color="#142A49" class="profile-edit-card" height="750px" rounded="xl" style="overflow-y: hidden">
                        <v-card-title class="profile-edit-card-title">
                            <span>
                                <i>EDIT ACCOUNT</i>
                                <hr>
                            </span>
                        </v-card-title>
                        <v-card-text class="profile-edit-card-wrapper custom-scrollable">
                            <div class="container">
                                <v-row>
                                    <v-col style="margin-bottom: -50px" class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2">
                                        <div class="profile-edit-card-picture">
                                            <div class="profile-edit-card-section-title d-flex">
                                                <span>
                                                    <i>PROFILE PICTURE</i>
                                                </span>
                                            </div>
                                            <div class="profile-edit-card-picture-content d-flex">
                                                <div class="profile-edit-card-picture-content-image">
                                                    <v-img v-if="profile_form.profile_picture == null || profile_form.profile_picture.length == 0" :src="userProfile.profile_picture" class="justify-start" width="100px" height="100px">

                                                    </v-img>
                                                    <v-img v-else :src="form_properties.preview_url" class="justify-start" width="100px" height="100px">

                                                    </v-img>
                                                </div>
                                                <div class="profile-edit-card-picture-content-text d-flex align-end">
                                                    <div class="profile-edit-card-picture-content-text-fileinput d-flex align-end">
                                                        <v-file-input ref="profile_picture" @change="createPreview()" v-model="profile_form.profile_picture" :rules="!(profile_form.profile_picture == null || profile_form.profile_picture.length == 0) ? [form_properties.rules.image.size] : []" dark prepend-icon="mdi-camera" accept=".jpg, .jpeg, .png" label="Browse" show-size required>

                                                        </v-file-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="profile-edit-card-main">
                                            <div class="profile-edit-card-section-title d-flex">
                                                <span>
                                                    <i>MAIN INFORMATION</i>
                                                </span>
                                            </div>
                                            <div class="profile-edit-card-input">
                                                <v-text-field readonly label="Email" v-model="currentUser.email" dark>
                                                </v-text-field>
                                            </div>
                                            <div class="profile-edit-card-input">
                                                <v-text-field ref="display_name" :rules="[form_properties.rules.required, form_properties.rules.display_name.counter]" label="Display Name" counter max-length="20" v-model="profile_form.display_name" dark>
                                                </v-text-field>
                                            </div>
                                            <div class="profile-edit-card-input">
                                                <v-select ref="name_color" :rules="[form_properties.rules.required]" dark v-model="profile_form.name_color" :items="form_properties.color_select" item-text="text" item-value="value" label="Name Color"></v-select>
                                            </div>
                                            <div class="profile-edit-card-input">
                                                <v-select ref="stroke_color" :rules="[form_properties.rules.required]" dark v-model="profile_form.stroke_color" :items="form_properties.color_select" item-text="text" item-value="value" label="Profile Stroke Color"></v-select>
                                            </div>
                                        </div>
                                        <div class="profile-edit-card-password">
                                            <div class="profile-edit-card-section-title d-flex">
                                                <span>
                                                    <i>CHANGE PASSWORD</i>
                                                </span>
                                            </div>
                                            <div class="profile-edit-card-input">
                                                <v-text-field ref="password" :type="form_properties.password_show ? 'text' : 'password'" placeholder="6-15 characters password" :rules="profile_form.password != '' ? [form_properties.rules.password.pattern] : []" label="New Password" v-model="profile_form.password" dark :append-icon="form_properties.password_show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="form_properties.password_show = !form_properties.password_show">
                                                </v-text-field>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <div class="profile-edit-card-button">
                                <v-btn @click="updateProfile()" color="#F4F4F6" rounded>SAVE</v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <Footer class="profile-edit-footer"></Footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/firebase'
import Footer from '@/components/Footer.vue'

export default {
    name: 'ProfileEdit',
    data() {
        return {
            profile_form: {
                profile_picture: [],
                display_name: '',
                name_color: '',
                stroke_color: '',
                password: ''
            },
            form_properties: {
                preview_url: null,
                rules: {
                    required: value => !!value || 'Required.',
                    image: {
                        size: value => !value || value.size < 500000 || 'Profile picture size should be less than 500MB!',
                    },
                    password: {
                        pattern: value => {
                            const pattern = /^[a-zA-Z]\w{5,14}$/
                            return pattern.test(value) || 'Password must alphanumeric and contains 6-15 characters.'
                        }
                    },
                    display_name: {
                        counter: value => (value.length <= 20) || 'Max 20 characters long.'
                    }
                },
                color_select: [],
                password_show: false,
            },
        }
    },
    methods: {
        async updateProfile(){
            let notFoundInvalid = true
            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.errorFound = true
                let inputValid = this.$refs[f].validate(true)
                if(!inputValid){
                    notFoundInvalid = false
                }
            })
            if(notFoundInvalid){
                let downloadUrl
                let tempForm = this.profile_form
                let tempStore = this.$store
                let tempRouter = this.$router
                let tempCurrentUser = this.currentUser
                if(!(this.profile_form['profile_picture'].length == 0 || this.profile_form['profile_picture'] == null)){
                    try {
                        let ref = await firebase.storage.ref().child('/users/' + this.currentUser.uid)
                        let task = await ref.put(this.profile_form['profile_picture'])
                        downloadUrl = await task.ref.getDownloadURL()
                    } catch (error) {
                        console.log(error)
                    }
                }
                if(tempForm.password != ''){
                    try {
                        await firebase.auth.currentUser.updatePassword(tempForm.password)
                    } catch (error) {
                        console.log(error)
                    }
                }
                let updateForm = {
                    display_name: tempForm.display_name,
                    name_color: tempForm.name_color,
                    stroke_color: tempForm.stroke_color,
                }
                if(downloadUrl){
                    updateForm.profile_picture = downloadUrl
                }
                try {
                    await firebase.db.collection('users').doc(tempCurrentUser.uid).update(updateForm)
                } catch (error) {
                    console.log(error)
                }
                tempStore.dispatch('fetchUserProfile')
                tempRouter.push('/profile')
            }
        },
        createPreview(){
            if(this.profile_form.profile_picture){
                this.form_properties.preview_url = URL.createObjectURL(this.profile_form.profile_picture)
            }
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile']),
        form(){
            return this.profile_form
        }
    },
    mounted() {
        this.profile_form.name_color = this.userProfile.name_color
        this.profile_form.stroke_color = this.userProfile.stroke_color
        this.profile_form.display_name = this.userProfile.display_name
        let colorOptions = [
            {
                text: 'Teal',
                value: '#519A9E',
                minimum_level: 1,
            },
            {
                text: 'Purple',
                value: '#8E24AA',
                minimum_level: 4,
            },
            {
                text: 'Pink',
                value: '#F48FB1',
                minimum_level: 6,
            },
            {
                text: 'Blue',
                value: '#42A5F5',
                minimum_level: 2,
            },
            {
                text: 'Green',
                value: '#558B2F',
                minimum_level: 4,
            },
            {
                text: 'Lime',
                value: '#AEEA00',
                minimum_level: 9,
            },
            {
                text: 'Orange',
                value: '#FB8C00',
                minimum_level: 5,
            },
            {
                text: 'Yellow',
                value: '#FFEE58',
                minimum_level: 3,
            },
            {
                text: 'Cyan',
                value: '#FFEE58',
                minimum_level: 8,
            },
            {
                text: 'Red',
                value: '#E53935',
                minimum_level: 10,
            },
            {
                text: 'Grey',
                value: '#78909C',
                minimum_level: 6,
            },
            {
                text: 'Indigo',
                value: '#5C6BC0',
                minimum_level: 7,
            },
        ]
        colorOptions.forEach((element) => {
            if(this.userProfile.rank >= element.minimum_level){
                this.form_properties.color_select.push(element)
            }
        })
    },
    beforeRouteLeave (to, from, next) {
        this.$store.commit('setPasswordConfirmed', false)
        next()
    },
    components: {
        Footer
    }
}
</script>

<style scoped>
    .profile-edit-card{
        padding-top: 50px;
        padding-bottom: 20px;
        margin-top: 70px;
    }

    .profile-edit-card-title{
        justify-content: center;
        margin-bottom: 35px;
    }

    .profile-edit-card-title span i{
        padding-left: 20px;
        padding-right: 20px;
    }

    .profile-edit-card-title span hr{
        border: 3px solid #519A9E;
        margin-top: 10px;
    }

    .profile-edit-card-title span{
        font-size: 40px !important;
        font-weight: 700;
    }

    .profile-edit-card-content{
        justify-content: center;
    }

    .profile-edit-card-section-title{
        font-size: 24px;
        font-weight: 700;
        z-index: 4;
        margin-bottom: 20px;
    }

    .profile-edit-card-picture{
        margin-top: -24px;
    }

    .profile-edit-card-picture-content-image .v-image{
        border-radius: 5px;
    }

    .profile-edit-card-picture-content-text{
        width: 100%;
        padding-left: 25px;
    }

    .profile-edit-card-picture-content-text-fileinput{
        width: 100%;
    }

    .profile-edit-card-main{
        margin-top: 40px;
    }

    .profile-edit-card-password{
        margin-top: 18px;
    }

    .profile-edit-card-button{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }

    .profile-edit-card-button .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31;
        padding: 20px 28px 20px 28px;
    }

    .profile-edit-footer{
        margin-top: 0px;
    }

</style>

<style>
    .custom-scrollable{
        overflow-y: scroll;
         height: 450px;
    }
</style>