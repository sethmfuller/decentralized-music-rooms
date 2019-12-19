<template>
  <div id="sidebar">
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