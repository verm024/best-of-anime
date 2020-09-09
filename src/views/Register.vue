<template>
    <div class="register">
        <div class="container d-flex align-center justify-center">
            <v-row>
                <v-col class="col-10 offset-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <v-card color="#142A49" class="card-login-register" rounded="xl">
                        <v-card-title class="card-login-register-title">
                            <span>
                                <i>SIGN UP</i>
                                <hr>
                            </span>
                        </v-card-title>
                        <v-card-text class="card-login-register-content">
                            <div class="container">
                                <div class="card-login-register-content-form">
                                    <v-row class="card-login-register-content-form-email">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2">
                                            <v-text-field ref="email" label="Email" :rules="[form_properties.rules.required, form_properties.rules.email.pattern]" type="email" v-model="register_form.email" required dark>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-password">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2">
                                            <v-text-field ref="password" label="Password" :rules="[form_properties.rules.required, form_properties.rules.password.pattern]" :type="form_properties.password_show ? 'text' : 'password'" v-model="register_form.password" required dark :append-icon="form_properties.password_show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="form_properties.password_show = !form_properties.password_show">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-display-name">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2">
                                            <v-text-field ref="display_name" label="Display Name" :rules="[form_properties.rules.required, form_properties.rules.display_name.counter]" type="text" v-model="register_form.display_name" required dark counter max-length="20">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-remember-forget">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2 text-center">
                                            <v-checkbox ref="policy_agree" :rules="[form_properties.rules.required]" v-model="register_form.policy_agree" dark label="I agree to the Terms of Service"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-button">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3 text-center">
                                            <v-btn @click="register()" color="#F4F4F6" rounded>Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase'

export default {
    name: 'Register',
    data() {
        return {
            register_form: {
                email: '',
                display_name: '',
                password: '',
                policy_agree: false
            },
            form_properties: {
                password_show: false,
                rules: {
                    required: value => !!value || 'Required.',
                    email: {
                        pattern: value => {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(value) || 'Invalid e-mail.'
                        }
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
                }
            }
        }
    },
    methods: {
        async register(){
            let errorFound = null
            let notFoundInvalid = true
            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.errorFound = true
                let inputValid = this.$refs[f].validate(true)
                if(!inputValid){
                    notFoundInvalid = false
                }
            })
            if(notFoundInvalid){
                let user
                let userData = {
                    display_name: this.register_form.display_name,
                    role: 'user',
                    rank: 1,
                    title: 'Citizen',
                    status: 'Active',
                    name_color: '#519A9E',
                    stroke_color: '#519A9E',
                    tag: Math.floor(99999 + Math.random() * 9999999),
                    email: this.register_form.email,
                    profile_picture: await firebase.storage.ref('user.png').getDownloadURL(),
                    exp: 0,
                    vip: false,
                    date_created: new Date()
                }
                try {
                    user = await firebase.auth.createUserWithEmailAndPassword(this.register_form.email, this.register_form.password)
                    user = user.user
                    if(user.uid){
                        await firebase.db.collection('users').doc(user.uid).set(userData)
                    }
                } catch (error) {
                    console.log(error)
                    errorFound = error
                }
                if(!errorFound){
                    this.$store.commit('setCurrentUser', user)
                    this.$store.dispatch('fetchUserProfile')
                    this.$router.push('/')
                }
                else{
                    alert(errorFound.message)
                }
            }
        }
    },
    computed: {
        form(){
            return this.register_form
        }
    },
}
</script>

<style scoped>
    .register{
        height: calc(100vh - 64px);
    }

    .register .container{
        height: 100%;
    }

    .card-login-register{
        padding-top: 50px;
        padding-bottom: 20px;
    }

    .card-login-register-title{
        justify-content: center;
    }

    .card-login-register-title span i{
        padding-left: 20px;
        padding-right: 20px;
    }

    .card-login-register-title span hr{
        border: 3px solid #519A9E;
        margin-top: 10px;
    }

    .card-login-register-content{
        justify-content: center;
    }

    .card-login-register-content-form-email{
        margin-top: 12px;
    }


    .card-login-register-content-form-password{
        margin-top: -12px;
    }

    .card-login-register-content-form-display-name{
        margin-top: -12px;
    }

    .card-login-register-content-form-remember-forget{
        margin-top: -24px;
    }

    .card-login-register-content-form-button .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31;
        padding: 22px 32px 22px 32px;
    }
</style>

<style>
    .card-login-register-content-form-password .v-input__append-inner{
        opacity: .5;
        transition: ease-in-out .3s;
    }

    .card-login-register-content-form-password .v-input--is-focused .v-input__append-inner{
        opacity: 1;
    }
    
    .card-login-register-title span{
        font-size: 40px !important;
        font-weight: 700;
    }
    
    .card-login-register-content-form-remember-forget .v-label{
        font-size: 14px !important;
        font-weight: 300 !important;
    }

    .card-login-register-content-form-remember-forget .v-input{
        opacity: .8 !important;
        transition: ease-in-out .3s;
    }

    .card-login-register-content-form-remember-forget .v-input--is-label-active{
        opacity: 1 !important;
    }
</style>