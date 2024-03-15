import { contacts } from "./contacts.js";

const { createApp } = Vue;
const { DateTime } = luxon;

createApp({

  data() {
    return {
      contacts,
      activeChat: 0,
      newText: '',
      contactSrc: '',
      newDate: '',
    }
  },

  methods: {
    lastMsg(index, property) {
      const {messages} = this.contacts[index];

      if (messages.length > 0) {
        return messages[messages.length - 1][property]
      } else {
        return 'Nessun messaggio'
      }
    },

    sendMsg(text, index) {
      const newMsg = {
        date: this.createDate('dd/LL/yyyy HH:mm:ss'),
        message: text,
        status: 'sent'
      }

      
      this.contacts[index].messages.push(newMsg);
      this.newText = '';
      
      setTimeout(() => {
        const replyMsg = {
          date: this.createDate('dd/LL/yyyy HH:mm:ss'),
          message: 'Ok!',
          status: 'received'
        }

        this.contacts[index].messages.push(replyMsg);
      }, 1000);
    },

    showMenu(index) {
      const allMenus = document.querySelectorAll('.dropdown-menu');

      allMenus[index].classList.toggle('d-none')
    },

    deleteMsg(index) {
      this.contacts[this.activeChat].messages.splice(index, 1)
    },

    createDate(dateStr) {
      this.newDate = DateTime.now().setLocale('it');

      return this.newDate.toFormat(dateStr)
    },
  },
  
  computed: {
    contactFiltered() {
      this.contacts.forEach(contact => {
        if (contact.name.toLowerCase().includes(this.contactSrc.toLowerCase())) {
          contact.visible = true
        } else {
          contact.visible = false
        }
      });
      
      return this.contacts
    },
    
    minAccessDate() {
      return this.contacts.map(contact => {
        const filteredMessages = contact.messages.filter(message => message.status === 'received');

        if (filteredMessages.length > 0) {
          const lastReceivedMessage = filteredMessages[filteredMessages.length - 1];
          const dateParts = lastReceivedMessage.date.split(' ');
          const timeParts = dateParts[1].split(':');
          
          return `${timeParts[0]}:${timeParts[1]}`;
        } else {
          return '';
        }
      });
    },

    accessDate() {
      return this.contacts.map(contact => {
        const filteredMessages = contact.messages.filter(message => message.status === 'received');

        if (filteredMessages.length > 0) {
          const lastReceivedMessage = filteredMessages[filteredMessages.length - 1];
          return lastReceivedMessage.date
        } else {
          return '';
        }
      });
    },
  },

  mounted() {
    console.log(this.minAccessDate);
  },

}).mount('#app')

// DARK MODE
const colorBtn = document.querySelector('.darkmode-toggle');

colorBtn.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark')
})