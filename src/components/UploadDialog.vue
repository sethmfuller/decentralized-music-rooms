<template>
  <div class="uploadDialog">
    <div class="box">
      <span class="dialogBoxTitle">Upload</span>
      <span class="dialogBoxSubtitle">Add a file to your room</span>
      <div class="textInput">
        <input type="file" ref="audioFile" id="audioFile" alt="upload file">
      </div>
      <div class="big_button continue_button" @click="upload">
        <span v-if="!loading">Upload</span>
        <Spinner v-else/>
      </div>
      <div class="link" @click="cancel">Cancel</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Spinner from '../components/Spinner'
export default {
  name: 'UploadDialog',

  components: {
    Spinner
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState(['ipfsInstance']),
  },

  methods: {
    ...mapMutations(['addToCurrentRoomHashes']),

    cancel() {
      this.$emit('close');
    },

    async upload() {
      this.loading = true;

      // Get uploaded file
      const photo = document.getElementById("audioFile");

      // Add audio file to ipfs
      const results = await this.ipfsInstance.add(photo.files[0]);
      const hash = results[0].hash

      // By pinning the file, other nodes on the IPFS network know 
      // they can access the file from our machine.
      await this.ipfsInstance.pin.add(hash);

      console.log(`Added file with hash: ${hash}`);

      this.addToCurrentRoomHashes(hash);

      this.$emit('close');
    },
  }
}
</script>