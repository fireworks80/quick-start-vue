<template>
  <div class="modal">
    <h3>{{headerTxt}}</h3>
    <form @keyup.esc="cancelEvent">
      <p class="input-group" v-if="mode==='update'">
        <label class="input-group__txt" for="num">일련번호</label>
        <input class="form-field" id="num" type="text" disabled v-model="contact.no">
      </p>
      <p class="input-group">
        <label class="input-group__txt" for="username">이름</label>
        <input class="form-field" type="text" id="username" v-model="contact.name">
      </p>
      <p class="input-group">
        <label class="input-group__txt" for="tel">전화번호</label>
        <input class="form-field" type="phone" id="tel" v-model="contact.tel">
      </p>
      <p class="input-group">
        <label class="input-group__txt" for="address">주소</label>
        <input class="form-field" type="phone" id="address" v-model="contact.address">
      </p>
      <div class="modal__btn-group">
        <button class="btn btn--success" type="button" @click="submitEvent">{{btnTxt}}</button>
        <button class="btn btn--danger" type="button" @click="cancelEvent">취소</button>
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
    headerTxt() {
      return this.mode === 'update' ? '연락처 수정하기' : '연락처 추가하기';
    },
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
  $input-height: 40px;

  .modal {
    top: 50%;
    left: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    display: block;
    max-width: 640px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);

    &__btn-group {
      text-align: center;
    }

    .btn--success {
      margin-right: 10px;
    }
  }



</style>
