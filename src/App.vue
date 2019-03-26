<template>
  <div id="app">
    <ContactList></ContactList>
  </div>
</template>

<script>
import ContactList from './components/ContactList'
import CONF from './CONF.js'
export default {
  name: 'app',
  components: {
    ContactList
  }
}
</script>

<style lang="scss">
$color-blue: #f5f9fc;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: $color-blue;
}


$btn-kinds: (
  (
    name: 'success',
    color: #28a745
  ),
  (
    name: 'info',
    color: #17a2b8
  ),
  (
    name: 'danger',
    color: #dc3545
  )
);

.btn {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
  color: #fff;

  @each $category in $btn-kinds {
    &--#{map-get($category, name)} {
      background-color: map-get($category, color);
      border-color: map-get($category, color);
    }
  }
}
</style>
