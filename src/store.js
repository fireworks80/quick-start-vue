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
    fetchContact(state, payload) {
      // console.log(payload);
      state.contactlist = payload
    },
    setPageno(state, payload) {
      state.contactlist.pageno = payload
    }
  },
  actions: {
    [CONF.FETCHCONTACT]: (store) => {
      // console.log('fetch: ' + store);
      axios.get(CONF.FETCH, {
          params: {
            pageno: store.state.contactlist.pageno,
            pagesize: store.state.contactlist.pagesize
          }
        })
        .then(res => {
          // console.log(res);
          store.commit('fetchContact', res.data);
        })
        .catch(err => {
          console.error('fetch contact err: ' + err);
        });
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