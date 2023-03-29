<template>
    <div class="container my-container">
        <h3>Create Quote!!</h3>
        <form action="" @submit.prevent="getData()">
            <input type="text" name="quote" placeholder="write your quote here..." v-model="form.quote" required>
            <button type="submit" class="btn #673ab7 deep-purple">Create Quote</button>
            <p>{{ form }}</p>
        </form>
    </div>
</template>

<script>
import { request} from 'graphql-request';

export default {
  name: 'createQuote',
  data() {
    return {
      form: {
        quote: ''
      },
      endpoint: 'http://localhost:4000/graphql',
      mutation: `
        mutation CreateQuote($name: String) {
          quote:createQuote(name: $name)
        }
      `,
      headers:  localStorage.getItem('token')
    }
  },
  methods: {
    async getData() {
      const { quote } = this.form;
      const variables = { name:quote };
      const options = { authorization: this.headers};
      try {
        const data = await request(this.endpoint, this.mutation, variables,options);
        console.log(data);
        alert('create your Quote successfully!! ');
      } catch (error) {
        console.error(error);
        alert('Error creating Quote!');
      }
    }
  }
}
</script>