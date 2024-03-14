import { contacts } from "./contacts.js";

const { createApp } = Vue;

createApp({

  data() {
    return {
      contacts,
      activeChat: 0,
      newText: '',
    }
  },

  methods: {
    lastMsg(index) {
      const {messages} = this.contacts[index];

      return messages[messages.length - 1].message
    },

    sendMsg(text, index) {
      const newMsg = {
        date: '10/01/2020 15:30:55',
        message: this.newText,
        status: 'sent'
      }

      const replyMsg = {
        date: '10/01/2020 15:30:55',
        message: 'Ok!',
        status: 'received'
      }

      this.contacts[index].messages.push(newMsg);

      setTimeout(() => {
        this.contacts[index].messages.push(replyMsg)
      }, 1000);

      this.newText = ''
    }
  },


  mounted() {
    
  }

}).mount('#app')