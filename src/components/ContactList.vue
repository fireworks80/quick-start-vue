<template>
  <div>
    <button class="btn btn--success" @click="addContact" type="button">새로운 연락처 추가</button>

    <div class="list">
      <table>
        <caption>연락처 목록</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Tel</th>
            <th scope="col">Address</th>
            <th scope="col">Photo</th>
            <th scope="col">Mod/Del</th>
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
              <button class="btn btn--info" type="button" @click="editContact(contact.no)">편집</button>
              <button class="btn btn--danger" type="button" @click="deleteContact(contact.no)">삭제</button>
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
$color-border: #e5e9f2;
$color-row: #f8f9fa;

  .list {
    margin-top: 20px;
    border: 1px solid $color-border;
    background-color: #fff;
    text-align: center;

    .btn--info {
      margin-right: 5px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  caption {
    position: absolute;
    top: auto;
    left: -9999em;
  }

  tr:nth-child(even) {
    background-color: $color-row;
  }

  th {
    padding: 10px 0;
    border-bottom: 2px solid $color-border;
    text-align: center;
    font-weight: normal;
  }

  td {
    padding: 5px 0;
    border-bottom: 1px solid $color-border;
  }

  img {
    width: 60px;
    border-radius: 100%;
  }
</style>
