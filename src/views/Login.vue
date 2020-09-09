<template>
    <div class="login">
        <div class="container d-flex align-center justify-center">
            <v-row>
                <v-col class="col-10 offset-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <v-card color="#142A49" class="card-login-register" rounded="xl">
                        <v-card-title class="card-login-register-title">
                            <span>
                                <i>MEMBER LOGIN</i>
                                <hr>
                            </span>
                        </v-card-title>
                        <v-card-text class="card-login-register-content">
                            <div class="container">
                                <div class="card-login-register-content-form">
                                    <v-row class="card-login-register-content-form-email">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2">
                                            <v-text-field ref="email" :rules="[form_properties.rules.required, form_properties.rules.email.pattern]" label="Email" type="email" v-model="login_form.email" required dark>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-password">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-8 offset-xl-2">
                                            <v-text-field ref="password" :rules="[form_properties.rules.required, form_properties.rules.password.pattern]" label="Password" :type="form_properties.password_show ? 'text' : 'password'" v-model="login_form.password" required dark :append-icon="form_properties.password_show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="form_properties.password_show = !form_properties.password_show">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-remember-forget">
                                        <v-col class="col-5 offset-1 offset-sm-1 col-sm-4 offset-sm-2 col-xl-4 offset-xl-2 text-center">
                                            <v-checkbox v-model="login_form.remember" dark label="Remember me"></v-checkbox>
                                        </v-col>
                                        <v-col class="col-5 col-sm-4 col-xl-4">
                                            <div class="d-flex align-center justify-end" style="height: 100%; font-weight: 300 !important; font-size: 14px !important;">
                                                <i><u>Forget Password?</u></i>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row class="card-login-register-content-form-button">
                                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3 text-center">
                                            <v-btn @click="login()" color="#F4F4F6" rounded>Login</v-btn>
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
import fb from 'firebase'

export default {
    name: "Login",
    data() {
        return {
            login_form: {
                email: '',
                password: '',
                remember: false
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
                        counter: value => value.length <= 20 || 'Max 20 characters long.'
                    }
                }
            }
        }
    },
    methods: {
        async login(){
            let user
            let persistence
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
                if(!this.login_form.remember){
                    persistence = fb.auth.Auth.Persistence.LOCAL
                    try {
                        await firebase.auth.setPersistence(persistence)
                    } catch (error) {
                        console.log(error)
                    }
                }
                try {
                    user = await firebase.auth.signInWithEmailAndPassword(this.login_form.email, this.login_form.password)
                    user = user.user
                } catch (error) {
                    errorFound = error
                    console.log(error)
                }
                if(errorFound){
                    alert(errorFound.message)
                }
                else{
                    this.$store.commit('setCurrentUser', user)
                    this.$store.dispatch('fetchUserProfile')
                    this.$router.push('/')
                }
            }
        }
    },
    computed: {
        form(){
            return {
                email: this.email,
                password: this.password
            }
        }
    },
}
</script>

<style scoped>
    .login{
        height: calc(100vh - 64px);
    }

    .login .container{
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