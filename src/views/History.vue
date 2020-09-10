<template>
    <div class="history">
        <div class="container page-wrapped">

        </div>
    </div>
</template>

<script>
import firebase from '@/firebase'
import { mapState } from 'vuex'

export default {
    name: 'History',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile'])
    },
}
</script>