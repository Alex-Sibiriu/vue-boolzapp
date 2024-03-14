import { contacts } from "./contacts.js";

const { createApp } = Vue;

createApp({

  data() {
    return {
      contacts,
    }
  },

  methods: {
    
  },

  mounted() {
    console.log('anna');
  }

}).mount('#app')