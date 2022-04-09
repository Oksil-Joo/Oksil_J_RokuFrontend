<template>
<section class="LoginCon">
        <h3 class="users-headline text-center">Who's Watching?</h3>

        <section class="users-container">
            <User class="user-panel"
                v-for="user in users"
                :key="user.id"
                :user="user"
            ></User>
        </section>
        
    </section>
</template>
<script>
import User from "@/components/User.vue"

export default {
    name: 'TheUsersView',

    props: {
        loggedin: Boolean,
        role: Number
    },

    created() {
        console.log('auth:', this.loggedin);

        fetch('/users/getall')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.users = data;
            })
        .catch(err => console.error(err));
    },

    data() {
        return {
            users: []
        }
        
    },

    components: {
        User
    }
}
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
</style>