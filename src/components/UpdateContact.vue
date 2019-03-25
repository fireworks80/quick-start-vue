<template>
  <contactForm mode="update" :contact="contact"></contactForm>
</template>
<script>
import ContactForm from './ContactForm'
export default {
  name: 'UpdateContact',
  components: {
    ContactForm
  },
  props: ['contact']
}
</script>
<style lang="scss" scoped>

</style>
