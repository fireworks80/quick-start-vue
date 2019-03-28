<template>
  <ContactForm :mode="'update'" :no="no"></ContactForm>
</template>
<script>
import ContactForm from './ContactForm'
import axios from 'axios'
import CONF from '../CONF'
export default {
  name: 'UpdateContact',
  components: { ContactForm },
  data() {
    return {
      no: '',
      contact: {}
    }
  },
  created() {
    this.no = this.$route.params.no
  }
}
</script>
<style>

</style>
