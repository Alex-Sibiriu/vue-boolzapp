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
    // Funzione per identificare l'ultimo messaggio
    lastMsg(index) {
      const {messages} = this.contacts[index];

      if (messages.length > 0) {
        return messages[messages.length - 1].message
      } else {
        return 'Nessun messaggio'
      }
    },

    // Funzione per inviare un messaggio
    sendMsg(text, index) {
      const newMsg = {
        date: this.createDate('dd/LL/yyyy HH:mm:ss'),
        message: text,
        status: 'sent'
      }

      this.contacts[index].messages.push(newMsg);
      this.newText = '';
      
      // Risposta automatica al messaggio
      setTimeout(() => {
        const replyMsg = {
          date: this.createDate('dd/LL/yyyy HH:mm:ss'),
          message: 'Ok!',
          status: 'received'
        }

        this.contacts[index].messages.push(replyMsg);
      }, 1000);
    },

    // Funzione per aprire/chiudere il menu a tendina
    showMenu(index) {
      const allMenus = document.querySelectorAll('.dropdown-menu');

      allMenus[index].classList.toggle('d-none')
    },

    // Funzione per eliminare un messaggio
    deleteMsg(index) {
      this.contacts[this.activeChat].messages.splice(index, 1)
    },

    // Funzione per creare la data del msg
    createDate(dateStr) {
      this.newDate = DateTime.now().setLocale('it');

      return this.newDate.toFormat(dateStr)
    },
  },
  
  computed: {
    // Funzione per filtrare i contatti da mostrare
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
    
    // Funzione per mostrare la data dell'ultimo accesso di tutti i contatti (ora e minuti)
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

    // Funzione per mostrare la data dell'ultimo accesso del contatto attivo (data completa)
    accessDate() {
      return this.contacts.map(contact => {
        const filteredMessages = contact.messages.filter(message => message.status === 'received');

        if (filteredMessages.length > 0) {
          const lastReceivedMessage = filteredMessages[filteredMessages.length - 1];
          return 'Ultimo accesso: ' + lastReceivedMessage.date
        } else {
          return 'Nessun accesso registrato';
        }
      });
    },
  },

}).mount('#app')

// DARK MODE
const colorBtn = document.querySelector('.darkmode-toggle');

colorBtn.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark')
})