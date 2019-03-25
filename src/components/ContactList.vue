<template>
  <div>
    <button @click="addContact" type="button">새로운 연락처 추가</button>

    <div class="list">
      <table>
        <caption>연락처 목록</caption>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">전화번호</th>
            <th scope="col">주소</th>
            <th scope="col">사진</th>
            <th scope="col">편집/삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contactlist.contacts" :key="contact.no">
            <td>{{contact.name}}</td>
            <td>{{contact.tel}}</td>
            <td>{{contact.address}}</td>
            <td>
              <img @click="updatePhoto(contact.no)" :src="contact.photo" alt="">
            </td>
            <td>
              <button type="button" @click="editContact(contact.no)">편집</button>
              <button type="button" @click="deleteContact(contact.no)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginate
      ref="pagebuttons"
      :page-count="totalpage"
      :click-handler="pageChanged"
      :page-range="7"
      :margin-pages="3"
      :prev-text="'이전'"
      :next-text="'다음'"
      :container-class="'pagination'"
      :page-class="'page-item'"></Paginate>
  </div>
</template>
<script>
import eventBus from '../EventBus'
import Paginate from 'vuejs-paginate'
export default {
  name: 'ContactList',
  components: {
    Paginate
  },
  props: ['contactlist'],
  computed: {
    totalpage() {
      return Math.floor(this.contactlist.totalcount / this.contactlist.pagesize)
    }
  },
  watch: {
    ['contactlist.pageno']() {
      this.$refs.pagebuttons.selected = this.contactlist.pageno;
    }
  },
  methods: {
    addContact() {
      eventBus.$emit('addContactForm')
    },
    editContact(no) {
      eventBus.$emit('editContactForm', no)
    },
    deleteContact(no) {
      eventBus.$emit('deleteContact', no)
    },
    updatePhoto(no) {
      eventBus.$emit('editPhoto', no)
    },
    pageChanged(pageNum) {
      console.log(pageNum);
      eventBus.$emit('pageChanged', pageNum)
    }
  }
}
</script>
<style lang="scss" scoped>


  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th,
  td {
    border: 1px solid #000;
  }

  img {
    max-width: 100%;
  }
</style>
