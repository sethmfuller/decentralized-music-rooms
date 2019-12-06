<template>
  <div class="createRoomDialog">
    <div class="box" id="createRoom" v-if="step === 0">
      <span class="dialogBoxTitle">Create Room</span>
      <span class="dialogBoxSubtitle">Add Room Name</span>
      <div class="textInput">
        <input 
          v-model="roomName" 
          placeholder="Seth's Music Room" 
          type="text">
      </div>
      <div class="big_button continue_button" @click="nextStep">Next</div>
      <div class="link" @click="complete">Add members later</div>
    </div>

    <div class="box" id="addMembers" v-if="step === 1">
      <span class="dialogBoxTitle">Create Room</span>
      <span class="dialogBoxSubtitle">Add Members</span>
      <div class="textInput">
        <input 
          v-model="memberHash"
          placeholder="QmTNwsFkLAed15kQEC1ZJWPfoNbBQnMFojfJKQ9sZj1dk8" 
          type="text">
      </div>
      <div class="big_button continue_button" @click="complete">Complete</div>
      <div class="link" @click="complete">Skip this step</div>
    </div>
  </div>
</template>

<script>
import PubsubRoom from 'ipfs-pubsub-room'
import fs from 'browserify-fs'
import { mapState } from "vuex";
export default {
  name: 'CreateRoomDialog',

  data() {
    return {
      roomName: "",
      memberHash: "",
      step: 0,
    }
  },

  computed: {
    localComputed() {return {}},

    ...mapState(['ipfsInstance', 'ipfsInstanceId'])
  },

  methods: {
    nextStep() {
      if (this.roomName != null && this.roomName.trim() != "") {
        this.step++;
      }
    },

    complete() {
      const room = PubsubRoom(this.ipfsInstance, this.roomName);

      fs.appendFile('./roomNamesGlobal.txt', `${this.roomName} ${this.ipfsInstanceId}\n`, (err) => {
        if(err) console.log(err);
      });

      room.on('peer joined', (peer) => {
        console.log(`Peer ${peer} joined.`);
      });
      room.on('peer joined', (peer) => {
        console.log(`Peer ${peer} left.`);
      });
      room.on('subscribed', () => {
        console.log('Connected');
      });
      room.on('message', (message) => {
        console.log('Got message from ' + message.from + ': ' + message.data.toString());
      });

      this.$emit('close');
    },

    cancel() {
      this.$emit('close');
    }
  }
}
</script>