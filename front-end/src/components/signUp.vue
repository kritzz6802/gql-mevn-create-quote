<template>
<div class="container my-container">
    <h3>SignUp!!</h3>
    <form @submit.prevent="submitForm">
        <p v-if="err" class="red card-pane1">{{ err.response.errors[0].message }}</p>
        <p v-if="info" class="green card-pane1">{{info.signupUser.fname}} you are successfully Signup </p>
        <div>
            <input type="text" placeholder="fname" name="fname" v-model="form.fname" required>
            <input type="text" placeholder="lname" name="lname" v-model="form.lname" required>
            <input type="email" placeholder="email" name="email" v-model="form.email" required>
            <input type="password" placeholder="password" name="password" v-model="form.password" required>
            <router-link to="/login">
                <p>Already have an account ?</p>
            </router-link>
            <button type="submit" class="btn #673ab7 deep-purple">SignUp</button>
            <!-- <p>{{ form }}</p> -->
        </div>
    </form>
</div>
</template>

<script>
import {
    request
} from 'graphql-request'

export default {
    name: 'SignUp',
    data() {
        return {
            form: {
                fname: '',
                lname: '',
                email: '',
                password: '',

            },
            err: '',
            info: '',
            endpoint: 'http://localhost:4000/graphql',
            mutation: `
          mutation($user: UserInput!) {
            signupUser(userNew: $user) {
              fname
              lname
              email
            }
          }
        `
        }
    },

    methods: {
        async submitForm() {
            try {
                const {
                    fname,
                    lname,
                    email,
                    password
                } = this.form
                const variables = {
                    user: {
                        fname,
                        lname,
                        email,
                        password
                    }
                }
                const data = await request(this.endpoint, this.mutation, variables)
                this.info = data;
                this.err = null;
                console.log(this.info)
                this.clearForm()
                return data;

                // alert('SignUp successfully!! 🥳🥳')
            } catch (error) {
                this.err = error
                this.info = null;
                this.clearForm()
                console.log(this.err)
                return this.err;
            }
        },
        clearForm() {
            // reset the form inputs to empty strings
            this.form.fname = ''
            this.form.lname = ''
            this.form.email = ''
            this.form.password = ''
        }
    }
}
</script>
