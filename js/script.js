import { contacts } from "./contacts.js";
import { emojiArray } from "./emoji.js";

const { createApp } = Vue;
const { DateTime } = luxon;

createApp({

  data() {
    return {
      contacts,
      activeChat: 0,
      newText: '',
      editedText: '',
      contactSrc: '',
      newDate: '',
      randomReply: [
                    'Come va oggi?',
                    'Che cosa stai facendo di bello?',
                    'Hai piani per stasera?',
                    'Hai visto l\'ultimo episodio di quella serie?',
                    'Che ne dici di organizzare qualcosa questo weekend?',
                    'Mi racconti cosa è successo di interessante?',
                    'Hai qualche suggerimento su cosa fare questo pomeriggio?',
                    'Ti va di fare una passeggiata insieme?',
                    'Mi mancano le nostre chiacchierate, dobbiamo vederci presto!',
                    'Sei libero per una chiacchierata telefonica più tardi?'
                  ],

      emojiArray,
      isShowEmoji: false,
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
      if (text.length > 0) {
        const newMsg = {
          date: this.createDate('dd/LL/yyyy HH:mm:ss'),
          message: text,
          status: 'sent'
        }

        this.contacts[index].messages.push(newMsg);
        this.scrollChatToBottom();
        this.newText = '';
      
        // Risposta automatica al messaggio
        setTimeout(() => {
          const randomN = Math.floor(Math.random() * this.randomReply.length)
          console.log(randomN);

          const replyMsg = {
            date: this.createDate('dd/LL/yyyy HH:mm:ss'),
            message: this.randomReply[randomN],
            status: 'received'
          }
          
          this.contacts[index].messages.push(replyMsg);
          this.scrollChatToBottom()
        }, 1000);
      }
    },

    // Funzione per aprire/chiudere il menu a tendina
    showMenu(index) {
      const allMenus = document.querySelectorAll('.dropdown-menu');

      allMenus.forEach(element => {
        if (element !== allMenus[index]) {
          element.classList.add('d-none')
        }
      });
      
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

    // Funzione per inserire le emoji nel testo
    showEmoji(emoji) {
      this.newText += this.convertUnicodeToEmoji(emoji.code) 
    },

    // Funzione per convertire il codice dell'emoji in un unicode leggibile in html
    convertUnicodeToEmoji(unicode) {
      return String.fromCodePoint(parseInt(unicode.replace('&#x', ''), 16));
    },

    // Funzione di autoscroll
    scrollChatToBottom() {
      const chatBox = document.querySelector('.msg-box')
      chatBox.scrollTop = chatBox.scrollHeight;
    },

    // Funzione per mostrare l'input di modifica messaggio
    showEditor(index) {
      const allInputMsg = document.querySelectorAll('.input-msg');
      const allTxtMsg = document.querySelectorAll('.text-msg');

      allInputMsg.forEach(element => {
        if (element !== allInputMsg[index]) {
          element.classList.add('d-none')
        }
      })

      allInputMsg[index].classList.toggle('d-none');
      allTxtMsg[index].classList.toggle('d-none');

      this.editedText = this.contacts[this.activeChat].messages[index].message;
    },

    // Funzione per modificare un messaggio
    editeMsg2(index) {
      const allInputMsg = document.querySelectorAll('.input-msg');
      const allTxtMsg = document.querySelectorAll('.text-msg');
      
      if (this.editedText !== '') {
        this.contacts[this.activeChat].messages[index].message = this.editedText;
        this.contacts[this.activeChat].messages[index].date = 'Modificato il ' + this.createDate('dd/LL/yyyy HH:mm:ss');

        allInputMsg[index].classList.toggle('d-none');
        allTxtMsg[index].classList.toggle('d-none');
      }
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
      const filteredMessages = this.contacts[this.activeChat].messages.filter(message => message.status === 'received');

      if (filteredMessages.length > 0) {
        const lastReceivedMessage = filteredMessages[filteredMessages.length - 1];
        return 'Ultimo accesso: ' + lastReceivedMessage.date
      } else {
        return 'Nessun accesso registrato';
      }
    },
  },

}).mount('#app')

// DARK MODE
const colorBtn = document.querySelector('.darkmode-toggle');

colorBtn.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark')
})