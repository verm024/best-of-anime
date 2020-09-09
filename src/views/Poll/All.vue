<template>
    <div class="poll-all">
        <div class="container page-wrapped">

        </div>
        <v-btn v-if="userProfile.rank >= 5" to="/poll/new" color="success">
            <span v-if="userProfile.rank <= 9">Request poll</span>
            <span v-else>New poll</span>
        </v-btn>
        <v-autocomplete v-model="search.model" :search-input.sync="input" :items="search.items" @change="test()"></v-autocomplete>
        <div v-for="(item, index) in polls" :key="index">
            <span @click="$router.push('/poll/detail/' + item.date_created.seconds + '+' + item.date_created.nanoseconds)">{{ item.title }}</span>
        </div>
        <v-btn color="primary" @click="loadMorePoll()" v-if="polls.length < poll_counter.current - 1">loadmore</v-btn>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '../../firebase'

export default {
    name: "PollAll",
    data() {
        return {
            polls: [],
            poll_last_visible: '',
            poll_counter: 0,
            search: {
                model: null,
                search_input: null,
                items: [],
                items_date: []
            },
            input: null
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile'])
    },
    methods: {
        async loadMorePoll(){
            let data
            try {
                data = await firebase.db.collection('polls').orderBy('date_created', 'desc').startAfter(this.poll_last_visible.date_created).where('status', '==', 'ongoing').where('requested', '==', false).limit(5).get()
            } catch (error) {
                console.log(error)
            }
            data.docs.forEach((snapshot, index) => {
                this.polls.push(snapshot.data())
                if(index == data.size - 1){
                    this.poll_last_visible = snapshot.data()
                }
            })
        },
        test(){
            let temp = this.search.model
            let i = this.search.items.findIndex(function (model){
                return model == temp
            })
            let date = this.search.items_date[i]
            this.$router.push('/poll/detail/' + date.seconds + '+' + date.nanoseconds)
        }
    },
    async created(){
        let data
        this.poll_counter = await firebase.db.collection('counter').doc('poll_counter').get()
        this.poll_counter = this.poll_counter.data()
        try {
            data = await firebase.db.collection('polls').orderBy('date_created', 'desc').where('status', '==', 'ongoing').where('requested', '==', false).limit(10).get()
        } catch (error) {
            console.log(error)
        }
        data.docs.forEach((snapshot, index) => {
            this.polls.push(snapshot.data())
            if(index == data.size - 1){
                this.poll_last_visible = snapshot.data()
            }
        })
    },
    watch: {
        async input(val) {
            this.search.items = []
            this.search.items_date = []
            if(val != null && val != ''){
                let data
                try {
                    data = await firebase.db.collection('polls').orderBy('title').startAt(val).endAt(val + '\uf8ff').where('status', '==', 'ongoing').where('requested', '==', false).limit(5).get()
                } catch (error) {
                    console.log(error)
                }
                data.forEach((snapshot) => {
                    let snapshotData = snapshot.data()
                    this.search.items.push(snapshotData.title)
                    this.search.items_date.push(snapshotData.date_created)
                })
            }
        }
    },
}
</script>