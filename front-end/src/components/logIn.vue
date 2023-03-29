<template>
<div class="container my-container">
    <h3>Login!!</h3>

    <form action="" @submit.prevent="getData()">
        <input type="email" placeholder="email" v-model="form.email" required>
        <input type="password" placeholder="password" v-model="form.password" required>
        <router-link to="/signup">
            <p>Don't have an account ?</p>
        </router-link>
        <button type="submit" class="btn #673ab7 deep-purple">Login</button>
        <p>{{ form }}</p>
    </form>
</div>
</template>


<script>
import {
    request
} from 'graphql-request';
import router from '../router.js'
export default {
    name: 'logIn',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            endpoint: 'http://localhost:4000/graphql',
            mutation: `
              mutation createuser($user:UserSigninInput!){
                signinUser(userSignin:$user) {
                    token
                  }
                }`
        }
    },
    methods: {
        async getData() {
            try {
                const {
                    email,
                    password
                } = this.form;
                const variables = {
                    user: {
                        email,
                        password
                    }
                }
                const data = await request(this.endpoint, this.mutation, variables);
                console.log(data);

                if (data && data.signinUser && data.signinUser.token) {
                    // login successful, save token to local storage
                    localStorage.setItem('token', data.signinUser.token);
                    alert('login successfully!! 🥳🥳');
                    router.push('/')
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
