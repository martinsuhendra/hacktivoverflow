<template>
  <LandingPage :search="search"/>
</template>

<script>
  import LandingPage from '../components/LandingPage'

  export default {
    props: ['search'],
    components: {
      LandingPage
    }
  }
</script>
