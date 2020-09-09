<template>
    <div class="confirm-password">
        <div class="container page-wrapped">
            <div class="confirm-password-wrapper text-center">
                <div class="confirm-password-title section-title-wrapper">
                    <span class="section-title">
                        <i>CONFIRM PASSWORD</i>
                    </span>
                </div>
                <div class="confirm-password-input">
                    <v-row>
                        <v-col class="col-8 offset-2 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4">
                            <v-text-field ref="password" dark label="Password" v-model="password" :rules="[rules.required, rules.password.pattern]" :type="password_show ? 'text' : 'password'" :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="password_show = !password_show"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="confirm-password-button">
                        <v-col class="col-10 offset-1 offset-sm-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3 text-center">
                            <v-btn @click="confirmPassword()" required rounded color="#F4F4F6">Confirm</v-btn>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
        <Footer class="confirm-password-footer"></Footer>
    </div>
</template>

<script>
import firebase from '@/firebase'
import fb from 'firebase'
import { mapState } from 'vuex'
import Footer from '@/components/Footer.vue'

export default {
    data(){
        return {
            password: '',
            password_show: false,
            rules: {
                required: value => !!value || 'Required.',
                password: {
                    pattern: value => {
                        const pattern = /^[a-zA-Z]\w{5,14}$/
                        return pattern.test(value) || 'Password must alphanumeric and contains 6-15 characters.'
                    }
                }
            }
        }
    },
    methods: {
        async confirmPassword(){
            let notFoundInvalid = true
            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.errorFound = true
                let inputValid = this.$refs[f].validate(true)
                if(!inputValid){
                    notFoundInvalid = false
                }
            })
            if(notFoundInvalid){
                let credential = fb.auth.EmailAuthProvider.credential(
                    this.currentUser.email,
                    this.password
                )
                let confirmed
                try {
                    confirmed = await firebase.auth.currentUser.reauthenticateWithCredential(credential)
                } catch (error) {
                    console.log(error)
                }
                if(confirmed){
                    this.$store.commit('setPasswordConfirmed', true)
                    this.$router.push('/profile/edit')
                }
                else{
                    alert('Password tidak sesuai!')
                }
            }
        }
    },
    computed: {
        ...mapState(['currentUser']),
        form(){
            return {password: this.password}
        }
    },
    components: {
        Footer
    },
    beforeEnter: (to, from, next) => {
        if(this.$store.state.passwordConfirmed){
            next('/profile/edit')
        }
        else{
            next()
        }
    }
}
</script>

<style scoped>
    .confirm-password-button .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31;
        padding: 20px 28px 20px 28px;
        margin-top: 25px;
    }

    .confirm-password-wrapper{
        margin-top: 150px;
    }

    .confirm-password-input{
        margin-top: 50px;
    }

    .confirm-password-footer{
        margin-top: -363px;
    }
</style>

<style >
    .confirm-password .confirm-password-input .v-input__append-inner{
        opacity: .5;
        transition: ease-in-out .3s;
    }

    .confirm-password  .confirm-password-input .v-input--is-focused .v-input__append-inner{
        opacity: 1;
    }
</style>