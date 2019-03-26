<template>
  <div id="app">
    <h1>연락처 관리 어플</h1>
    <ContactList :contactlist="contactlist" :contact="contact"></ContactList>
    <components :is="currentView" :contact="contact"></components>
  </div>
</template>

<script>
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";
import UpdatePhoto from "./components/UpdatePhoto";
import eventBus from "./EventBus.js";
import CONF from "./Config.js";
export default {
  name: "app",
  components: {
    ContactList,
    AddContact,
    UpdateContact,
    UpdatePhoto
  },
  data() {
    return {
      currentView: null,
      contact: { no: "", name: "", tel: "", address: "", photo: "" },
      contactlist: {
        pageno: 1,
        pagesize: CONF.PAGESIZE,
        totalcount: 0,
        contacts: []
      }
    };
  },
  mounted() {
    this.fetchContacts();
    eventBus.$on("addContactForm", () => {
      this.currentView = "AddContact";
    });
    eventBus.$on("editContactForm", no => {
      this.currentView = "UpdateContact";
      this.fetchContactOne(no);
    });
    eventBus.$on("cancel", () => {
      this.currentView = null;
    });

    eventBus.$on("addSubmit", contact => {
      this.currentView = null;
      this.addContact(contact);
    });

    eventBus.$on("updateSubmit", contact => {
      this.currentView = null;
      this.updateContact(contact);
    });

    eventBus.$on("deleteContact", no => {
      this.deleteContact(no);
    });

    eventBus.$on("editPhoto", no => {
      this.currentView = "UpdatePhoto";
      this.fetchContactOne(no);
    });

    eventBus.$on("updatePhoto", data => {
      this.currentView = null;
      this.updatePhoto(data);
    });

    eventBus.$on("pageChanged", no => {
      this.pageChanged(no);
    });
  },
  methods: {
    fetchContacts() {
      this.$axios
        .get(CONF.FETCH, {
          params: {
            pageno: this.contactlist.pageno,
            pagesize: this.contactlist.pagesize
          }
        })
        .then(res => {
          this.contactlist = res.data;
        })
        .catch(err => {
          console.log("fetchContacts err: " + err);
        });
    },
    fetchContactOne(no) {
      // debugger;
      this.$axios
        .get(CONF.FETCHONE.replace("${no}", no))
        .then(res => {
          // console.log(res);
          this.contact = res.data;
        })
        .catch(err => {
          console.log("fetchContactOne err: " + err);
        });
    },
    addContact(contact) {
      // console.log(contact);
      this.$axios
        .post(CONF.ADD, contact)
        .then(res => {
          // console.log(res)
          if (res.data.status === "success") {
            this.contactlist.pageno = 1;
            this.fetchContacts();
          } else {
            console.log("연처처 추가 실패");
          }
        })
        .catch(err => {
          console.log("addContact err: " + err);
        });
    },
    updateContact(contact) {
      this.$axios
        .put(CONF.UPDATE.replace("${no}", contact.no), contact)
        .then(res => {
          console.log(res);
          this.contactlist.pageno = 1;
          this.fetchContacts();
        })
        .catch(err => {
          console.log("updateContact err: " + err);
        });
    },
    deleteContact(no) {
      this.$axios
        .delete(CONF.DELETE.replace("${no}", no))
        .then(res => {
          // console.log(res)
          if (res.data.status === "success") {
            this.fetchContacts();
          }
        })
        .catch(err => {
          console.log("delete err: " + err);
        });
    },
    updatePhoto(info) {
      // console.log(info)
      const data = new FormData();
      data.append("photo", info.file);
      this.$axios
        .post(CONF.UPDATEPHOTO.replace("${no}", info.no), data)
        .then(res => {
          // console.log(res)
          if (res.data.status === "success") this.fetchContacts();
        })
        .catch(err => {
          console.log("updatePhoto err: " + err);
        });
    },
    pageChanged(no) {
      this.contactlist.pageno = no;
      this.fetchContacts();
    }
  }
};
</script>

<style lang="scss">
$color-bg: #f5f9fc;

* {
  &,
  &::before,
  &::after {
    box-sizing: border-box;
  }
}

html,
body {
  height: 100%;
}

body {
  background-color: $color-bg !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 10px;
  color: #2c3e50;
  margin-top: 60px;
}

$btn-kind: (
  (
    name: "success",
    colors: (#155724, #d4edda, #c3e6cb)
  ),
  (
    name: "info",
    colors: (#0c5460, #d1ecf1, #bee5eb)
  ),
  (
    name: "danger",
    colors: (#721c24, #f8d7da, #f5c6cb)
  )
);

.btn {
  padding: 10px;
  border: 0;
  border-radius: 10px;

  @each $category in $btn-kind {
    &--#{map-get($category, name)} {
      color: nth(map-get($category, colors), 1);
      background-color: nth(map-get($category, colors), 2);
      border-color: nth(map-get($category, colors), 3);
    }
  }
}

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

.form-field {
    height: $input-height;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
  }

  .input-group {

    display: flex;

    &__txt {
      display: flex;
      flex: 1 1 10%;
      align-items: center;
      padding: 10px;
      height: $input-height;
      border: 1px solid #ced4da;
      background-color: #e9ecef;
    }

    .form-field {
      flex: 2 1 auto;
      border-left-width: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }


</style>
