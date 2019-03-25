<template>
  <div class="modal" @keyup.esc="cancelEvent">
    <h2>사진 변경</h2>
    <figure>
      <img :src="contact.photo" alt="">
    </figure>
    <form enctype="multipart/form-data">
      <input type="file" ref="photofile">
      <div>
        <button type="button" @click="photoSubmit(contact.no)">수정</button>
        <button type="button" @click="cancelEvent">취소</button>
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
    position: absolute;
    max-width: 80%;
    left: 50%;
    bottom: auto;
    transform: translateX(-50%);
    background-color: #fff;
  }

  img {
    max-width: 100%;
  }
</style>
