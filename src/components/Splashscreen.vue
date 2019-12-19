<template>
  <div class="splashscreen">
    <h1>Distributed Music Rooms</h1>
    <h2>Wait just a second!</h2>
    <h3>We're booting up the system...</h3>
    <breeding-rhombus-spinner
      :animation-duration="2000"
      :size="65"
      color="#1882FF"
      id="spinner"
    />
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
export default {
  name: 'Splashscreen',

  components: {
    BreedingRhombusSpinner,
  }
}
</script>