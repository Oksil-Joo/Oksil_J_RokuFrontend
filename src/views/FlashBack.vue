<template>
    <section class="FlashBackCon">
        <h3>Welcome {{first_name}}!</h3>

        <!-- custom movie components go here in a grid container - show the current selection -->
        <section class="movie-container">
           
            <!-- movie player component -->
            <MoviePlayer
                @loadnew="reloadPlayer"
                :movies_trailer="currentMovie.movies_trailer"
            ></MoviePlayer>

             <!-- custom movie article component for the text data -->
            <MovieData
                :movies_title="currentMovie.movies_title"
                :movies_storyline="currentMovie.movies_storyline"
                :movies_runtime="currentMovie.movies_runtime"
                :movies_year="currentMovie.movies_year"
            ></MovieData>
        </section>

        <!-- show the list of movies retrieved - in a grid -->
        <!-- TODO - could show these in a filtered row by genre -->
        <section class="movie-thumbs">
            <MovieThumb
                v-for="movie in movies"
                :key="movie.movies_id"
                :thumb="movie.movies_cover"
                @click="setCurrentMovie(movie)"
            ></MovieThumb>
        </section>        
    </section>    
</template>

<script>
import MovieData from "@/components/MovieData.vue";
import MoviePlayer from "@/components/MoviePlayer.vue";
import MovieThumb from "@/components/MovieThumb.vue";

export default {
    name: "TheFlashBack",

    props: {
        first_name: String,
        role: Number,
        permissions: Number,
        avatar: String,
        loggedin: Boolean
    }, 

    created() {

        let currentUser = {
            first_name: this.first_name,
            role: this.role,
            permissions: this.permissions,
            avatar: this.avatar
        }

    if (window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

        fetch('/movies')
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // store the movies in Vue instance              
                this.movies = data[0];

                // pick a random movie 
                this.currentMovie = data[0][Math.floor(Math.random() * data[0].length)];
            })
        .catch(error => console.error(error));
    },

    data() {
        return {
            movies: [],
            currentMovie: {}
        }
    },

    methods: {
        setCurrentMovie(movie) {
            this.currentMovie = movie;
        },

        reloadPlayer() {
            this.setCurrentMovie(this.movies[Math.floor(Math.random() * this.movies.length - 1)]);
        }
    },

    components: {
        MovieData,
        MoviePlayer,
        MovieThumb
    }
}
</script>

<style lang="scss">
    @import "@/assets/sass/homepage.scss";
    @import "@/assets/sass/main.scss";
</style>