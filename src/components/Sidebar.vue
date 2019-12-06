<template>
  <div id="sidebar">
    <img class="user_img" src="../assets/pic.jpg" alt="user img">
    <span class="user_name">Seth Fuller</span>
    <span class="user_hash">{{ipfsInstanceId}}</span>

    <div class="activity">
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sidebar',

  computed: {
    ...mapState(['ipfsInstanceId']),
  }
}
</script>