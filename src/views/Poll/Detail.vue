<template>
    <div class="poll-detail">
        <div class="container page-wrapped">

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
            vote_choice: 0
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
            let nominationsData = this.poll_data[0].nominations
            nominationsData[this.vote_choice].item_voted = nominationsData[this.vote_choice].item_voted + 1
            let totalVoted = this.poll_data[0].poll_voted + 1
            let newExp = this.userProfile.exp + 50 * ((15 + this.poll_data[0].nominations.length) / 10)
            try {
                await firebase.db.collection('users').doc(this.currentUser.uid).collection('votes').doc(this.$route.params.date).set({poll: firebase.db.collection('polls').doc(this.poll_data[0]["id"]), index_voted: this.vote_choice, date_created: new Date()})
                await firebase.db.collection('polls').doc(this.poll_data[0]["id"]).update({ nominations: nominationsData, poll_voted: totalVoted })
                await firebase.db.collection('users').doc(this.currentUser.uid).update({exp: newExp})
            } catch (error) {
                console.log(error)
            }
            this.isvoted = true
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile']),
    },
}
</script>