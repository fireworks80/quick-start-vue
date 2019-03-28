import Vue from 'vue'
import Vuex from 'vuex'
import CONF from './CONF'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contactlist: {
      pageno: 1,
      pagesize: CONF.PAGESIZE,
      totalcount: 0,
      contacts: []
    }
  },
  mutations: {
    [CONF.FETCHCONTACT]: (state, payload) => {
      // console.log(payload);
      state.contactlist = payload
    },
    setPageno(state, payload) {
      state.contactlist.pageno = payload
    }
  },
  actions: {
    async [CONF.FETCHCONTACT](store) {
      // console.log('fetch: ' + store);
      let res = await axios.get(CONF.FETCHLINK, {
        params: {
          pageno: store.state.contactlist.pageno,
          pagesize: store.state.contactlist.pagesize
        }
      })
      store.commit(CONF.FETCHCONTACT, res.data)
    },
    [CONF.ADDCONTACT]: (store, payload) => {
      console.log(payload)
      axios.post(CONF.ADDLINK, payload)
        .then(res => {
          // console.log(res)
          res.data.status === 'success' ? store.commit(CONF.FETCHCONTACT) : console.log('저장에 실패')
        })
        .catch(err => {
          console.log(err)
        });
    },
    [CONF.UPDATECONTACT]: (store, payload) => {
      axios.put(CONF.UPDATELINK.replace('${no}', payload.no), payload)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.error(err)
        });
      // console.log(payload)
    },
    pageChange(store, payload) {
      // console.log(payload)
      store.commit('setPageno', payload);
      store.dispatch(CONF.FETCHCONTACT)
    }
  },
  getters: {
    totalPages(state) {
      return Math.floor(state.contactlist.totalcount / state.contactlist.pagesize)
    }
  }
})