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
import { mapState } from 'vuex'
import Spinner from '../components/Spinner'
export default {
  name: 'UploadDialog',

  props: ['room'],

  components: {
    Spinner
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState(['ipfsInstance', 'rooms']),
  },

  methods: {

    cancel() {
      this.$emit('close');
    },

    
  }
}
</script>