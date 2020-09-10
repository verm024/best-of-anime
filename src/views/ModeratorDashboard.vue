<template>
    <div class="moderator-dashboard">
        <div class="container page-wrapped">
            
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase'

export default {
    name: 'Moderator Dashboard',
    data() {
        return {
            polls: []
        }
    },
    async created(){
        let data
        try {
            data = await firebase.db.collection('polls').where('requested', '==', true).orderBy('date_created', 'desc').get()
        } catch (error) {
            console.log(error)
        }
    }
}
</script>