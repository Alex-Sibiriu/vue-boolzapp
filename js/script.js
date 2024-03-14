import { contacts } from "./contacts.js";

const { createApp } = Vue;

createApp({

  data() {
    return {
      contacts,
      activeChat: 0,
    }
  },

  methods: {
    lastMsg(index) {
      const {messages} = this.contacts[index];

      return messages[messages.length - 1].message
    }
  },


  mounted() {
    
  }

}).mount('#app')