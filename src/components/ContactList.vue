<template>
  <div>
    <h2>연락처 관리 앱</h2>
    <router-link class="btn btn--success" :to="{name: 'add'}">새로운 연락처 추가</router-link>
    <!-- <button class="btn btn--success" type="button">새로운 연락처 추가하기</button> -->
    <div class="list">
      <table>
        <caption>연락처 리스트</caption>
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
              <img :src="contact.photo" alt="">
            </td>
            <td>
              <router-link class="btn btn--info" :to="{name: 'update', params: {no: contact.no}}">편집</router-link>
              <!-- <button @click="updateContact(contact.no)" class="btn btn--info" type="button">편집</button> -->
              <button class="btn btn--danger" type="button">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginate
      :container-class="'pagination'"
      :page-class="'page-item'"
      :prev-text="'이전'"
      :next-text="'다음'"
      :page-range="7"
      :margin-pages="3"
      :click-handler="pageChange"
      :page-count="totalPages"></Paginate>
  </div>
</template>
<script>
import CONF from '../CONF.js'
import Paginate from 'vuejs-paginate'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'ContactList',
  components: {
    Paginate
  },
  created() {
    this.$store.dispatch(CONF.FETCHCONTACT);
    // console.log(this.$store);
  },
  computed: {
    ...mapState(['contactlist']),
    ...mapGetters(['totalPages'])
  },
  methods: {
    ...mapActions(['pageChange'])
  }
}
</script>
<style lang="scss" scoped>
$color-gray: #dee2e6;
  .list {
    margin: 20px 0 30px;
    border: 1px solid $color-gray;
    background-color: #fff;

    .btn--info {
      margin-right: 5px;
    }
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  caption {
    position: absolute;
    top: auto;
    left: -9999em;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }

  th,
  td {
    padding: 20px 0;
    border-bottom: solid $color-gray;
  }

  th {
    text-align: center;
    border-bottom-width: 2px;
    font-weight: normal;
  }

  td {
    border-bottom-width: 1px;
  }

  img {
    width: 50px;
    border-radius: 100%;
  }
</style>
