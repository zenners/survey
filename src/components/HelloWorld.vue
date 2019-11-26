<template>
 
  <div class="hello">
  

  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
import { Tabbar, TabbarItem } from "vant";
import { Field } from "vant";

Vue.use(Field);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
