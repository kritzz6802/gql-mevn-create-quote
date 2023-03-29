<template>
<div class="container my-container">
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <p v-else v-for="character in result.characters.results" :key="character.id">
        {{ character.name }}
    </p>
</div>
</template>

<script>
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
                     fname
                  }
               }
            }
`
export default {
    name: 'homePage',
    setup() {
        const {
            result,
            loading,
            error
        } = useQuery(CHARACTERS_QUERY);
        return {
            result,
            loading,
            error
        }
    }

}
</script>
