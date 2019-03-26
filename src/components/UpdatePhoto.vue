<template>
  <div class="modal" @keyup.esc="cancelEvent">
    <h2>사진 변경</h2>
    <figure>
      <img :src="contact.photo" alt="">
    </figure>
    <form enctype="multipart/form-data">
      <input class="form-field" type="file" ref="photofile">
      <div class="modal__btn-group">
        <button class="btn btn--success" type="button" @click="photoSubmit(contact.no)">수정</button>
        <button class="btn btn--danger" type="button" @click="cancelEvent">취소</button>
      </div>
    </form>
  </div>
</template>
<script>
import eventBus from '../EventBus.js'
export default {
  name: 'UpdatePhoto',
  props: ['contact'],
  methods: {
    photoSubmit(no) {
      var file = this.$refs.photofile.files[0];
      eventBus.$emit('updatePhoto', {no, file})
      // console.log(file);
    },
    cancelEvent() {
      eventBus.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal {
    display: block;
    top: 50%;
    left: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    text-align: center;

    figure {
      // outline: 1px dashed red;
      overflow: hidden;
      margin: 20px auto 30px;
      border-radius: 100%;
      max-width: 150px;

      img {
        width: 100%;
      }
    }

    .form-field {
      display: inline-block;
      height: auto;
      padding-left: 0;
      margin-bottom: 30px;
      border: 0;
      border-radius: initial;
    }
  }
</style>
