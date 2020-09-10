<template>
    <div class="poll-new">
        <div class="container page-wrapped">
            <v-row>
                <v-col class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <v-card color="transparent" flat class="poll-new-card" rounded="xl">
                        <v-card-title class="poll-new-card-title">
                            <span>
                                <i>ADD NEW POLL</i>
                                <hr>
                            </span>
                        </v-card-title>
                        <v-card-text class="poll-new-card-wrapper">
                            <div class="container">
                                <v-row>
                                    <v-col style="margin-bottom: -50px" class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-8 offset-xl-2">
                                        <div class="poll-new-card-main">
                                            <div class="poll-new-card-section-title d-flex">
                                                <span>
                                                    <i>MAIN INFORMATION</i>
                                                </span>
                                            </div>
                                            <div class="poll-new-card-main-content">
                                                <div class="poll-new-card-main-picture d-flex">
                                                    <div class="poll-new-card-main-content-image">
                                                        <v-img v-if="poll_form.poll_picture == null || poll_form.poll_picture.length == 0" src="https://drive.google.com/uc?export=view&id=1eWGglGDSa82GU1lHLDY8kEXynlD3a4b_" class="justify-start" width="100px" height="100px">
                                                        </v-img>
                                                        <v-img v-else :src="form_properties.preview_url" class="justify-start" width="100px" height="100px">
                                                        </v-img>
                                                    </div>
                                                    <div class="poll-new-card-main-content-text d-flex align-end">
                                                        <div class="poll-new-card-main-content-text-fileinput d-flex align-end">
                                                            <v-file-input ref="profile_picture" @change="createPreview()" v-model="poll_form.poll_picture" :rules="!(poll_form.poll_picture == null || poll_form.poll_picture.length == 0) ? [form_properties.rules.image.size] : []" dark prepend-icon="mdi-camera" accept=".jpg, .jpeg, .png" label="Browse" show-size required>

                                                            </v-file-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="poll-new-card-main-input-wrapper">
                                                    <div class="poll-new-card-main-input">
                                                        <v-text-field ref="title" v-model="poll_form.title" :rules="[form_properties.rules.required, form_properties.rules.title.counter]" label="Title" counter max-length="50" dark>
                                                        </v-text-field>
                                                    </div>
                                                    <div class="poll-new-card-main-input">
                                                        <v-textarea single-line ref="description" v-model="poll_form.description" :rules="[form_properties.rules.required, form_properties.rules.description.counter]" label="Description" counter max-length="250" dark>
                                                        </v-textarea>
                                                    </div>
                                                    <div class="poll-new-card-main-input">
                                                        <v-select  ref="type" v-model="poll_form.type" :rules="[form_properties.rules.required]" dark :items="form_properties.type_select" item-text="text" item-value="value" label="Type"></v-select>
                                                    </div>
                                                    <div class="poll-new-card-main-input">
                                                        <v-select ref="season" v-model="poll_form.season" :rules="[form_properties.rules.required]" dark :items="form_properties.season_select" item-text="text" item-value="value" label="Season"></v-select>
                                                    </div>
                                                    <div class="poll-new-card-main-input">
                                                        <v-select ref="year" v-model="poll_form.year" :rules="[form_properties.rules.required]" dark :items="form_properties.year_select" item-text="text" item-value="value" label="Year"></v-select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="poll-new-card-detail">
                                            <div class="poll-new-card-section-title d-flex">
                                                <span>
                                                    <i>DETAILS</i>
                                                </span>
                                            </div>
                                            <div class="poll-new-card-detail-content">
                                                <v-card class="poll-new-card-detail-content-card container" color="#142A49" v-for="(item, index) in poll_form.nominations" :key="index" rounded="xl">
                                                    <v-card-text class="poll-new-card-detail-content-card-text-1">
                                                        <v-row>
                                                            <v-col class="col-2 align-center justify-start d-flex">
                                                                <span class="poll-new-card-detail-content-card-text-1-index">
                                                                    {{ index + 1 }}
                                                                </span>
                                                            </v-col>
                                                            <v-col class="col-10">
                                                                <div class="poll-new-card-detail-content-card-text-1-search">
                                                                    <div class="poll-new-card-detail-content-card-text-1-search-input">
                                                                        <v-autocomplete @change="changeSelected(index)" no-filter ref="desription" v-model="poll_form.nominations[index].model" :search-input.sync="poll_form.nominations[index].search_input" :items="poll_form.nominations[index].search_items" item-text="text" item-value="value" label="Search by Name/Title" dark>
                                                                        </v-autocomplete>
                                                                    </div>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                    <v-card-text class="poll-new-card-detail-content-card-text-2">
                                                        <v-expand-transition>
                                                            <div v-if="poll_form.type == 'anime' && item.title != ''">
                                                                <div class="poll-new-card-detail-content-card-text-title">
                                                                    <span>Information</span>
                                                                </div>
                                                                <div class="poll-new-card-detail-content-card-text-subtitle">
                                                                    <span>Anime: {{ item.title }}</span>
                                                                    <br>
                                                                    <span>Genre: {{ item.genre }}</span>
                                                                </div>
                                                            </div>
                                                        </v-expand-transition>
                                                        <v-expand-transition>
                                                            <div v-if="poll_form.type == 'manga' && item.title != ''">
                                                                <div class="poll-new-card-detail-content-card-text-title">
                                                                    <span>Information</span>
                                                                </div>
                                                                <div class="poll-new-card-detail-content-card-text-subtitle">
                                                                    <span>Anime: {{ item.title }}</span>
                                                                    <br>
                                                                    <span>Authors: {{ item.author }}</span>
                                                                </div>
                                                            </div>
                                                        </v-expand-transition>
                                                        <v-expand-transition>
                                                            <div v-if="poll_form.type == 'character' && item.name != ''">
                                                                <div class="poll-new-card-detail-content-card-text-title">
                                                                    <span>Information</span>
                                                                </div>
                                                                <div class="poll-new-card-detail-content-card-text-subtitle">
                                                                    <span>Anime: {{ item.title }}</span>
                                                                    <v-select ref="character_select" :rules="[form_properties.rules.required]" :items="poll_form.nominations[index].select_character" dark v-model="poll_form.nominations[index].name"></v-select>
                                                                </div>
                                                            </div>
                                                        </v-expand-transition>
                                                        <v-expand-transition>
                                                            <div v-if="poll_form.type == 'soundtrack' && item.title != ''">
                                                                <div class="poll-new-card-detail-content-card-text-title">
                                                                    <span>Information</span>
                                                                </div>
                                                                <div class="poll-new-card-detail-content-card-text-subtitle">
                                                                    <span>Anime: {{ item.title }}</span>
                                                                    <v-select :rules="[form_properties.rules.required]" :items="poll_form.nominations[index].select_soundtrack" dark v-model="poll_form.nominations[index].song"></v-select>
                                                                    <v-expand-transition>
                                                                        <v-text-field ref="song_select" v-if="poll_form.nominations[index].song == 'Manual Input Song'" placeholder="Song Title" :rules="[form_properties.rules.required]" dark v-model="poll_form.nominations[index].song_manual"></v-text-field>
                                                                    </v-expand-transition>
                                                                    <v-expand-transition>
                                                                        <v-text-field ref="singer_select" v-if="poll_form.nominations[index].song == 'Manual Input Song'" placeholder="Singer" :rules="[form_properties.rules.required]" dark v-model="poll_form.nominations[index].singer_manual"></v-text-field>
                                                                    </v-expand-transition>
                                                                </div>
                                                            </div>
                                                        </v-expand-transition>
                                                        <v-expand-transition>
                                                            <div v-if="poll_form.type == 'couple' && item.title != ''">
                                                                <div class="poll-new-card-detail-content-card-text-title">
                                                                    <span>Information</span>
                                                                </div>
                                                                <div class="poll-new-card-detail-content-card-text-subtitle">
                                                                    <span>Anime: {{ item.title }}</span>
                                                                    <v-select ref="couple_1_select" :rules="[form_properties.rules.required]" :items="poll_form.nominations[index].select_couple" dark v-model="poll_form.nominations[index].couple_1"></v-select>
                                                                    <v-select ref="couple_2_select" :rules="[form_properties.rules.required]" :items="poll_form.nominations[index].select_couple" dark v-model="poll_form.nominations[index].couple_2"></v-select>
                                                                </div>
                                                            </div>
                                                        </v-expand-transition>
                                                    </v-card-text>
                                                    <v-card-actions class="d-flex justify-end poll-new-card-detail-button">
                                                        <v-expand-transition>
                                                            <div v-if="index == poll_form.nominations.length - 1" class="poll-new-card-detail-button-add">
                                                                <v-btn color="#F4F4F6" text @click="addNominationItem()">
                                                                    Add More
                                                                </v-btn>
                                                            </div>
                                                        </v-expand-transition>
                                                        <v-expand-transition>
                                                            <div v-if="poll_form.nominations.length > 2" class="poll-new-card-detail-button-delete ml-2">
                                                                <v-btn color="transparent" text @click="deleteNominationItem(index)">
                                                                    Delete
                                                                </v-btn>
                                                            </div>
                                                        </v-expand-transition>
                                                    </v-card-actions>
                                                </v-card>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <div class="poll-new-card-button">
                                <v-btn v-if="userProfile.rank <= 9" @click="addPost(true)" color="#F4F4F6" rounded>Request</v-btn>
                                <v-btn v-else @click="addPost(false)" color="#F4F4F6" rounded>Add</v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-dialog v-model="add_preloader" width="250px" persistent >
            <v-card rounded="xl" class="add-preloader-card" color="#13252F">
                <v-card-text>
                    <v-row class="justify-center">
                        <v-col class="col-12 text-center">
                            <span v-if="add_preloader_running" class="headline white--text">Please wait...</span>
                            <span v-if="add_preloader_finish" class="headline white--text">Success!</span>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <Footer class="poll-new-footer"></Footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/firebase'
import axios from 'axios'
import jikan from 'jikan-nodejs'

import Footer from '@/components/Footer.vue'

export default {
    name: 'PollNew',
    data() {
        return {
            poll_form: {
                title: '',
                description: '',
                type: 'anime',
                season: 'Spring',
                year: '2020',
                nominations: [
                    {
                        title: '',
                        poster: '',
                        name: '',
                        url: '',
                        genre: '',
                        song: '',
                        author: '',
                        item_voted: 0,
                        model: null,
                        search_items: [],
                        search_input: null,
                        select_soundtrack: [],
                        select_character: [],
                        song_manual: '',
                        singer_manual: ''
                    },
                    {
                        title: '',
                        name: '',
                        poster: '',
                        song: '',
                        url: '',
                        genre: '',
                        author: '',
                        item_voted: 0,
                        model: null,
                        search_items: [],
                        search_input: null,
                        select_soundtrack: [],
                        select_character: [],
                        song_manual: '',
                        singer_manual: ''
                    },
                ],
                poll_picture: []
            },
            form_properties: {
                preview_url: null,
                rules: {
                    required: value => !!value || 'Required.',
                    image: {
                        size: value => !value || value.size < 500000 || 'Profile picture size should be less than 500MB!',
                    },
                    title: {
                        counter: value => (value.length <= 50) || 'Max 50 characters long.'
                    },
                    description: {
                        counter: value => (value.length <= 250) || 'Max 250 characters long.'
                    }
                },
                type_select: [
                    {
                        text: 'Anime',
                        value: 'anime'
                    },
                    {
                        text: 'Manga',
                        value: 'manga'
                    },
                    {
                        text: 'Character',
                        value: 'character'
                    },
                    {
                        text: 'Couple',
                        value: 'couple'
                    },
                    {
                        text: 'Official Soundtrack',
                        value: 'soundtrack'
                    }
                ],
                season_select: [
                    {
                        text: 'Spring',
                        value: 'Spring'
                    },
                    {
                        text: 'Summer',
                        value: 'Summer'
                    },
                    {
                        text: 'Fall',
                        value: 'Fall'
                    },
                    {
                        text: 'Winter',
                        value: 'Winter'
                    },
                    {
                        text: 'All Season',
                        value: 'all'
                    },
                ],
                year_select: [
                    {
                        text: '2010',
                        value: '2010'
                    },
                    {
                        text: '2011',
                        value: '2011'
                    },
                    {
                        text: '2012',
                        value: '2012'
                    },
                    {
                        text: '2013',
                        value: '2013'
                    },
                    {
                        text: '2014',
                        value: '2014'
                    },
                    {
                        text: '2015',
                        value: '2015'
                    },
                    {
                        text: '2016',
                        value: '2016'
                    },
                    {
                        text: '2017',
                        value: '2017'
                    },
                    {
                        text: '2018',
                        value: '2018'
                    },
                    {
                        text: '2019',
                        value: '2019'
                    },
                    {
                        text: '2020',
                        value: '2020'
                    },
                    {
                        text: '2021',
                        value: '2021'
                    },
                    {
                        text: '2022',
                        value: '2022'
                    },
                    {
                        text: '2023',
                        value: '2023'
                    },
                    {
                        text: 'All Year',
                        value: 'all'
                    },
                ]
            },
            poll_counter: [],
            add_preloader: false,
            add_preloader_running: true,
            add_preloader_finish: false
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser']),
        watchSearchInput(){
            return this.poll_form.nominations.map(form => form.search_input)
        },
        watchType(){
            return this.poll_form.type
        },
        form(){
            return {
                title: '',
                description: '',
                type: '',
                season: '',
                year: '',
                character_select: '',
                song_select: '',
                singer_select: '',
                couple_1_select: '',
                couple_2_select: ''
            }
        }
    },
    methods: {
        addNominationItem(){
            this.poll_form.nominations.push({
                title: '',
                poster: '',
                url: '',
                genre: '',
                song: '',
                author: '',
                name: '',
                couple_1: '',
                couple_2: '',
                item_voted: 0,
                model: null,
                search_items: [],
                search_input: null,
                select_soundtrack: [],
                select_couple: [],
                select_character: [],
                song_manual: '',
                singer_manual: ''
            })
        },
        deleteNominationItem(index){
            this.poll_form.nominations.splice(index, 1)
        },
        async addPost(requested){
            let notFoundInvalid = true
            Object.keys(this.form).forEach(f => {
                let inputValid
                if (!this.form[f]) this.errorFound = true
                if(this.$refs[f]){
                    if((f == 'character_select' || f == 'song_select' || f == 'singer_select' || f == 'couple_1_select' || f == 'couple_2_select')){
                        this.$refs[f].forEach((element, index) => {
                            inputValid = element.validate(true)
                        })
                    }
                    else{
                        inputValid = this.$refs[f].validate(true)
                    }
                    if(!inputValid){
                        notFoundInvalid = false
                    }
                }
            })
            if(notFoundInvalid){
                this.add_preloader = true
                this.add_preloader_running = true
                let nominations = []
                this.poll_form.nominations.forEach((element, index) => {
                    if(this.poll_form.type == 'anime'){
                        nominations[index] = {
                            title: element.title,
                            poster: element.poster,
                            genre: element.genre,
                            item_voted: 0
                        }
                    }
                    else if(this.poll_form.type == 'manga'){
                        nominations[index] = {
                            title: element.title,
                            poster: element.poster,
                            genre: element.genre,
                            author: element.author,
                            item_voted: 0
                        }
                    }
                    else if(this.poll_form.type == 'character'){
                        nominations[index] = {
                            name: element.name,
                            poster: element.poster,
                            title: element.title,
                            item_voted: 0
                        }
                    }
                    else if(this.poll_form.type == 'couple'){
                        nominations[index] = {
                            poster: element.poster,
                            title: element.title,
                            couple_1: element.couple_1,
                            couple_2: element.couple_2,
                            item_voted: 0
                        }
                    }
                    else if(this.poll_form.type == 'soundtrack'){
                        let soundtrack = ''
                        if(element.song == 'Manual Input Song'){
                            soundtrack = element.song_manual + ' by ' + element.singer_manual
                        }
                        else{
                            soundtrack = element.song
                        }
                        nominations[index] = {
                            poster: element.poster,
                            title: element.title,
                            song: soundtrack,
                            item_voted: 0
                        }
                    }
                })
                let dateCreated = new Date()
                let poll_data = {
                    title: this.poll_form.title,
                    description: this.poll_form.description,
                    type: this.poll_form.type,
                    nominations: nominations,
                    status: 'ongoing',
                    poster: 'https://drive.google.com/uc?export=view&id=1eWGglGDSa82GU1lHLDY8kEXynlD3a4b_',
                    user: firebase.db.collection('users').doc(this.currentUser.uid),
                    date_created: dateCreated,
                    requested: requested,
                    poll_voted: 0
                }
                let uploadedData
                try {
                    uploadedData = await firebase.db.collection('polls').add(poll_data)
                    if(status != 'requested'){
                        await firebase.db.collection('counter').doc('poll_counter').set({ current: this.poll_counter.current + 1, active: this.poll_counter.active + 1 })
                    }
                } catch (error) {
                    console.log(error)
                }
                if(!(this.poll_form['poll_picture'].length == 0 || this.poll_form['poll_picture'] == null || this.poll_form['poll_picture'] == undefined )){
                    let downloadUrl
                    try {
                        let ref = await firebase.storage.ref().child('/polls/' + uploadedData.id)
                        let task = await ref.put(this.poll_form['poll_picture'])
                        downloadUrl = await task.ref.getDownloadURL()
                    } catch (error) {
                        console.log(error)
                    }
                    try {
                        await firebase.db.collection('polls').doc(uploadedData.id).update({poster: downloadUrl})
                        await firebase.db.collection('users').doc(this.currentUser.uid).collection('polls').doc(uploadedData.id).set({poll: firebase.db.collection('polls').doc(uploadedData.id), date_created: dateCreated})
                    } catch (error) {
                        console.log(error)
                    }
                }
                this.add_preloader_running = false
                this.add_preloader_finish = true
                setTimeout(() => {
                    this.$router.push('/poll/ongoing')
                }, 3000)
            }
        },
        createPreview(){
            if(this.poll_form.poll_picture){
                this.form_properties.preview_url = URL.createObjectURL(this.poll_form.poll_picture)
            }
        },
        async changeSelected(index){
            let type = this.poll_form.type
            let item = this.poll_form.nominations[index]
            if(type == 'anime'){
                let information = await jikan.anime.mainInformation(item.model)
                item.title = information.title
                item.poster = information.image_url
                item.genre = ''
                information.genres.forEach((element, informationIndex) => {
                    item.genre = item.genre + element.name
                    if(informationIndex < information.genres.length - 1){
                        item.genre = item.genre + ', '
                    }
                })
                item.premiered = information.premiered
            }
            else if(type == 'manga'){
                let information = await jikan.manga.mainInformation(item.model)
                item.title = information.title
                item.poster = information.image_url
                item.genre = ''
                item.author = ''
                information.genres.forEach((element, informationIndex) => {
                    item.genre = item.genre + element.name
                    if(informationIndex < information.genres.length - 1){
                        item.genre = item.genre + ', '
                    }
                })
                information.authors.forEach((element, informationIndex) => {
                    element.name = element.name.split(', ').join(' ')
                    item.author = item.author + element.name
                    if(informationIndex < information.authors.length - 1){
                        item.author = item.author + ', '
                    }
                })
            }
            else if(type == 'character'){
                // let baseURL = 'https://api.jikan.moe/v3/character/'
                // let data = []
                // item.name = ''
                // item.anime = ''
                // item.poster = ''
                // try {
                //     data = await axios.get(baseURL + item.model)
                // } catch (error) {
                //     console.log(error)
                // }
                // data = data.data
                // if(data){
                //     item.name = data.name
                //     if(data.animeography[0]){
                //         item.anime = data.animeography[0].name
                //     }
                //     item.poster = data.image_url
                // }
                // else{
                //     this.changeSelected(index)
                // }
                let searchData = item.model.split('+_+_+')
                let information = await jikan.anime.charactersAndStaff(searchData[1])
                item.title = searchData[0]
                item.select_character = []
                information.characters.forEach((element, informationIndex) => {
                    item.select_character.push(element.name)
                })
            }
            else if(type == 'couple'){
                let searchData = item.model.split('+_+_+')
                let information = await jikan.anime.charactersAndStaff(searchData[1])
                item.title = searchData[0]
                item.select_couple = []
                information.characters.forEach((element, informationIndex) => {
                    item.select_couple.push(element.name)
                })
            }
            else if(type == 'soundtrack'){
                let information = await jikan.anime.mainInformation(item.model)
                item.title = information.title
                item.poster = information.image_url
                item.select_soundtrack = []
                information.opening_themes.forEach((element, informationIndex) => {
                    item.select_soundtrack.push(element)
                })
                information.ending_themes.forEach((element, informationIndex) => {
                    item.select_soundtrack.push(element)
                })
                item.select_soundtrack.push('Manual Input Song')
            }
        }
    },
    firestore: {
        poll_counter: firebase.db.collection('counter').doc('poll_counter')
    },
    watch: {
        async watchSearchInput(val, oldVal){
            let changedIndex
            val.forEach((element, index) => {
                if(element != oldVal[index]){
                    changedIndex = index
                }
            });
            if(val[changedIndex] != null && val[changedIndex] != ''){
            this.poll_form.nominations[changedIndex].search_items = []
                let data
                let baseURL = 'https://api.jikan.moe/v3'
                if(this.poll_form.type == 'anime'){
                    let data = []
                    let errorFound = false
                    try {
                        data = await axios.get(baseURL + '/search/anime?q=' + val[changedIndex] + '&limit=10')
                    } catch (error) {
                        console.log(error)
                        errorFound = true
                    }
                    if(!errorFound){
                        data.data.results.forEach((element) => {
                            let temp = {
                                text: element.title,
                                value: element.mal_id
                            }
                            this.poll_form.nominations[changedIndex].search_items.push(temp)
                        })
                    }
                }
                else if(this.poll_form.type == 'manga'){
                    let data = []
                    let errorFound = false
                    try {
                        data = await axios.get(baseURL + '/search/manga?q=' + val[changedIndex] + '&limit=10')
                    } catch (error) {
                        console.log(error)
                        errorFound = true
                    }
                    if(!errorFound){
                        data.data.results.forEach((element) => {
                            let temp = {
                                text: element.title,
                                value: element.mal_id
                            }
                            this.poll_form.nominations[changedIndex].search_items.push(temp)
                        })
                    }
                }
                else if(this.poll_form.type == 'character'){
                    // let data = []
                    // let errorFound = false
                    // try {
                    //     data = await axios.get(baseURL + '/search/character?q=' + val[changedIndex] + '&limit=10')
                    // } catch (error) {
                    //     console.log(error)
                    //     errorFound = true
                    // }
                    // if(!errorFound){
                    //     data.data.results.forEach((element) => {
                    //         let anime = ''
                    //         if(element.anime.length != 0){
                    //             anime = element.anime[0].name
                    //         }
                    //         else{
                    //             anime = element.manga[0].name
                    //         }
                    //         let temp = {
                    //             text: element.name + ' (' + anime + ')',
                    //             value: element.mal_id,
                    //         }
                    //         this.poll_form.nominations[changedIndex].search_items.push(temp)
                    //     })
                    // }
                    let data = []
                    let errorFound = false
                    try {
                        data = await axios.get(baseURL + '/search/anime?q=' + val[changedIndex] + '&limit=10')
                    } catch (error) {
                        console.log(error)
                        errorFound = true
                    }
                    if(!errorFound){
                        data.data.results.forEach((element) => {
                            let temp = {
                                text: element.title,
                                value: element.title + '+_+_+' + element.mal_id
                            }
                            this.poll_form.nominations[changedIndex].search_items.push(temp)
                        })
                    }
                }
                else if(this.poll_form.type == 'couple'){
                    let data = []
                    let errorFound = false
                    try {
                        data = await axios.get(baseURL + '/search/anime?q=' + val[changedIndex] + '&limit=10')
                    } catch (error) {
                        console.log(error)
                        errorFound = true
                    }
                    if(!errorFound){
                        data.data.results.forEach((element) => {
                            let temp = {
                                text: element.title,
                                value: element.title + '+_+_+' + element.mal_id
                            }
                            this.poll_form.nominations[changedIndex].search_items.push(temp)
                        })
                    }
                }
                else if(this.poll_form.type == 'soundtrack'){
                    let data = []
                    let errorFound = false
                    try {
                        data = await axios.get(baseURL + '/search/anime?q=' + val[changedIndex] + '&limit=10')
                    } catch (error) {
                        console.log(error)
                        errorFound = true
                    }
                    if(!errorFound){
                        data.data.results.forEach((element) => {
                            let temp = {
                                text: element.title,
                                value: element.mal_id
                            }
                            this.poll_form.nominations[changedIndex].search_items.push(temp)
                        })
                    }
                }
            }
        },
        async watchType(val){
            if(val == 'character' || val == 'couple'){
                alert('Character and Couple are currently under development, you may experience some errors!')
            }
        }
    },
    components: {
        Footer
    }
}
</script>

<style scoped>
    .poll-new-card-title{
        justify-content: center;
        margin-bottom: 50px;
        margin-top: 50px;
    }

    .poll-new-card-title span i{
        padding-left: 20px;
        padding-right: 20px;
    }

    .poll-new-card-title span hr{
        border: 3px solid #519A9E;
        margin-top: 10px;
    }

    .poll-new-card-title span{
        font-size: 40px !important;
        font-weight: 700;
    }

    .poll-new-card-section-title{
        font-size: 24px;
        font-weight: 700;
        z-index: 4;
        margin-bottom: 35px;
    }

    .poll-new-card-main{
        margin-top: -24px;
    }

    .poll-new-card-main-content-image .v-image{
        border-radius: 5px;
    }

    .poll-new-card-main-content-text{
        width: 100%;
        padding-left: 25px;
    }

    .poll-new-card-main-content-text-fileinput{
        width: 100%;
    }

    .poll-new-card-detail{
        margin-top: 35px;
    }

    .poll-new-card-detail-content-card{
        padding: 10px 50px 20px 50px;
        margin-bottom: 25px;
    }

    .poll-new-card-detail-content-card-text-1-index{
        font-size: 24px;
        font-weight: 700;
    }

    .poll-new-card-detail-content-card-text-1-search{
        margin-left: -12px;
    }

    .poll-new-card-detail-content-card-text-title{
        margin-bottom: 5px;
    }

    .poll-new-card-detail-content-card-text-2{
        margin-top: -24px;
        margin-bottom: 20px;
    }

    .poll-new-card-detail-content-card-text-subtitle .v-input{
        margin-top: -12px;
    }

    .poll-new-card-detail-content-card-text-title span{
        font-size: 16px;
        color: #f4f4f6;
        font-weight: 600;
    }

    .poll-new-card-detail-content-card-text-subtitle span{
        font-size: 14px;
        opacity: .8;
    }

    .poll-new-card-detail-button{
        margin-top: -12px !important;
    }

    .poll-new-card-detail-button-delete{
        display: flex;
        justify-content: flex-end;
    }
    
    .poll-new-card-detail-button-add .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31 !important;
        padding: 8px 16px 8px 16px;
        font-size: 12px;
        background: #f4f4f6;
    }

    .poll-new-card-detail-button-add{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    
    .poll-new-card-detail-button-delete .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #f4f4f6 !important;
        padding: 8px 16px 8px 16px;
        font-size: 12px;
        border: 2px solid #f4f4f6;
    }

    .poll-new-card-button{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top:35px;
    }

    .poll-new-card-button .v-btn{
        font-weight: 600;
        letter-spacing: 0;
        color: #0E1D31;
        padding: 20px 28px 20px 28px;
    }

    .poll-new-footer{
        margin-top: 100px;
    }

    .add-preloader-card{
        padding-top: 20px;
    }
</style>