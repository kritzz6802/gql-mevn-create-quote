<template>
<p v-if="error">Something went wrong...</p>
<p v-if="loading">Loading...</p>
<div v-else class="container my-container">
    <blockquote v-for="q in result.quotes" :key="q">
        <h6>{{ q.name }}</h6>
        <!-- <span v-for="n in q" :key="n"></span>-->
        <router-link :to="`/profile/${q.by._id}`">
            <p class="right-align">~ {{q.by.fname}}</p>
        </router-link>
    </blockquote>
</div>
</template>

<script>
// import axios from 'axios';
// import {useRoute} from 'vue-router';
import gql from 'graphql-tag'
import {
    useQuery
} from '@vue/apollo-composable'
const CHARACTERS_QUERY = gql `
query
    {
    quotes{
        name
        by{
        _id
         fname
        }
     }
 }
`
export default {
    name: 'homePage',
    // data() {
    //     return {
    //         items: [],
    //         query: `
    //         query
    //         {
    //            quotes{
    //               name
    //               by{
    //                  fname
    //               }
    //            }
    //         }`
    //     }
    // },
    // mounted() {
    //     axios.post('http://localhost:4000/', {
    //         query: this.query
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(response => {
    //         this.items = response.data.data.quotes;
    //         // console.log(response.data.data.quotes);
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }
    setup() {

        const {
            result,
            loading,
            error
        } = useQuery(CHARACTERS_QUERY);
        // console.log(result)
        return {
            result,
            loading,
            error
        }
    }
}
</script>
