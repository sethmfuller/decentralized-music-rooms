<template>
  <div :class="`create-room-button ${isOpen ? 'open' : 'closed'}`" >
    <span v-show="!isOpen" @click="open" class="button-name">Create Room</span>
    <div v-show="isOpen" class="open-container">
      <div class="input-container">
        <input ref="roomNameInput" 
          type="text" 
          v-model="roomName" 
          @keydown.enter="submit" 
          @keydown.esc="close" 
          @blur.stop="close">
      </div>
      <div class="checkmark-container" @mousedown="submit">
        <img src="../assets/icons/check-circle.svg" alt="Confirm create">
      </div>
    </div>
  </div>
</template>

<script>
import PubsubRoom from 'ipfs-pubsub-room'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CreateRoomButton',

  computed: {
    ...mapState(['ipfsInstance', 'rooms']),
  },

  data() {
    return {
      isOpen: false,
      roomName: ''
    }
  },

  methods: {
    ...mapMutations(['addRoom']),

    open() {
      this.isOpen = true;
      setTimeout(() => { this.$refs.roomNameInput.focus() }, 250);
    },
    
    close() {
      this.roomName = '';
      this.isOpen = false;
    },
    submit() {
      if (this.roomName.trim() != '') {
        const room = PubsubRoom(this.ipfsInstance, this.roomName);

        // Add 
        this.addRoom({
          obj: room,
          name: this.roomName,
          songs: [],
        });
        
        let theRoomName = this.roomName;

        room.on('peer joined', (peer) => {
          let roomc = this.rooms.find(aRoom => {
            return aRoom.name === theRoomName;
          });

          let message = {
            messageName: 'new roommate',
            roomName: theRoomName,
            songs: roomc.songs,
          };

          room.sendTo(peer, `${JSON.stringify(message)}`);
        });
        room.on('peer left', () => {
        });
        room.on('subscribed', () => {
        });
        room.on('message', (message) => {
          let m = JSON.parse(message.data);
          
          switch (m.messageName) {
            case "uploaded song":
              this.handleUploadedSong(m, message.from);
              break;
            case "new roommate":
              this.handleNewRoommate(m);
              break;
          }
        });
        this.roomName = '';
      }
        this.isOpen = false;
    },

    handleUploadedSong(message, messageFrom) {
      let room = this.rooms.find(room => {
        return room.name === message.roomName
      });

      if (room.songs.find(song => song === message.hash) === undefined) {
        room.songs.push({
          name: message.songName,
          hash: message.hash,
          providerHash: messageFrom,
        });
      }
    },

    handleNewRoommate(message) {
      let room = this.rooms.find(room => {
        return room.name === message.roomName
      });

      message.songs.forEach(songFromMessage => {
        let n = room.songs.findIndex(songFromRoom => {
          return songFromRoom.hash === songFromMessage.hash;
        });

        if (n == -1) {
          room.songs.push(songFromMessage);
        }
      });
    },
  },
}
</script>