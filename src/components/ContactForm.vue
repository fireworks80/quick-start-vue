<template>
  <div class="modal">
    <h3>title</h3>
    <form @keyup.esc="cancelEvent">
      <p v-if="mode==='update'">
        <label for="num">일련번호</label>
        <input id="num" type="text" disabled v-model="contact.no">
      </p>
      <p>
        <label for="username">이름</label>
        <input type="text" id="username" v-model="contact.name">
      </p>
      <p>
        <label for="tel">전화번호</label>
        <input type="phone" id="tel" v-model="contact.tel">
      </p>
      <p>
        <label for="address">주소</label>
        <input type="phone" id="address" v-model="contact.address">
      </p>
      <div>
        <button type="button" @click="submitEvent">{{btnTxt}}</button>
        <button type="button" @click="cancelEvent">취소</button>
      </div>
    </form>
  </div>
</template>
<script>
import eventBus from '../EventBus.js'
export default {
  name: 'ContactForm',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    contact: {
      type: Object,
      default() {
        return {no: '', name: '', tel: '', address: '', phone: ''}
      }
    }
  },
  computed: {
    btnTxt() {
      return this.mode === 'update' ? '수정' : '추가'
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    cancelEvent() {
      eventBus.$emit('cancel')
    },
    submitEvent() {
      this.mode === 'add' ? eventBus.$emit('addSubmit', this.contact) : eventBus.$emit('updateSubmit', this.contact);
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal {
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 80%;
    background-color: #fff;
  }
</style>
