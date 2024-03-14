import { contacts } from "./contacts.js";

const { createApp } = Vue;

createApp({

  data() {
    return {
      contacts,
      activeChat: 0,
      newText: '',
      contactSrc: '',

    }
  },

  methods: {
    lastMsg(index) {
      const {messages} = this.contacts[index];

      if (messages.length > 0) {
        return messages[messages.length - 1].message
      } else {
        return 'Nessun messaggio'
      }
    },

    sendMsg(text, index) {
      const newMsg = {
        date: '10/01/2020 15:30:55',
        message: text,
        status: 'sent'
      }

      const replyMsg = {
        date: '10/01/2020 15:30:55',
        message: 'Ok!',
        status: 'received'
      }

      this.contacts[index].messages.push(newMsg);
      this.newText = '';

      setTimeout(() => {
        this.contacts[index].messages.push(replyMsg)
      }, 1000);
    },

    showMenu(index) {
      const allMenus = document.querySelectorAll('.dropdown-menu');

      allMenus[index].classList.toggle('d-none')
    },

    deleteMsg(index) {
      this.contacts[this.activeChat].messages.splice(index, 1)
    }
  },

  computed: {
    contactFiltered() {
      return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.contactSrc.toLowerCase()))
    }
  }

}).mount('#app')