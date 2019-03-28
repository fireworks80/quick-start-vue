<template>
  <section class="contact-form">
    <h2>{{headerText}}</h2>
    <form>
      <p class="input-group" v-if="mode === 'update'">
        <label class="input-group__label" for="num">일련번호</label>
        <input class="input-group__field" type="text" id="num" v-model="contactme.no" disabled>
      </p>
      <p class="input-group">
        <label class="input-group__label" for="name">이름</label>
        <input class="input-group__field" type="text" id="name" v-model="contactme.name">
      </p>
      <p class="input-group">
        <label class="input-group__label" for="tel">전화번호</label>
        <input class="input-group__field" type="text" id="tel" v-model="contactme.tel">
      </p>
      <p class="input-group">
        <label class="input-group__label" for="addr">주소</label>
        <input class="input-group__field" type="text" id="addr" v-model="contactme.address">
      </p>
      <div class="contact-form__btn-group">
        <button @click="submitContact(contactme)" class="btn btn--info" type="button">{{submitText}}</button>
        <router-link class="btn btn--danger" to="/">취소</router-link>
      </div>
    </form>
  </section>
</template>
<script>
import CONF from '../CONF'
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: 'ContactForm',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    no: {
      type: Number
    }
  },
  data() {
    return {
      contactme: {
        no: 0,
        name: '',
        tel: '',
        address: ''
      }
    }
  },
  created() {
    console.log('contactform created')
    this.setUpdateData()
  },
  computed: {
    headerText() {
      return this.mode === 'add' ? '연락처 추가' : '연락처 수정'
    },
    submitText() {
      return this.mode === 'add' ? '추가' : '수정'
    }
  },
  methods: {
    setUpdateData() {
      axios.get(CONF.FETCHONELINK.replace('${no}', this.no))
      .then(res => {
        // console.log(res)
        this.contactme = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    submitContact(contactme) {
      this.mode === 'add' ? this.addContact(contactme) : this.updateContact(contactme)
      this.$router.push({ path: '/' })
    },
    ...mapActions([CONF.ADDCONTACT, CONF.UPDATECONTACT])
  }
}
</script>
<style lang="scss" scoped>
.contact-form {
  padding: 30px;

  &__btn-group .btn--info {
    margin-right: 10px;
  }
}
</style>
