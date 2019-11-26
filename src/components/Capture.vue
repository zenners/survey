<template>
  <div @load="onLoad">
    <van-nav-bar 
     @click-right="onClickRight"
     title="Capture" fixed=true right-text="Submit">

   </van-nav-bar>
   <van-image
       class="logo"
        fit="contain"
        :src="logo"
    />
    <form
      id="form"
      @submit="checkForm"
      method="post"
      novalidate="true"
    >
      <p>Your Info</p>
      <van-cell-group>
        <van-field
          v-model="email"
          required
          clearable
          label="Email"
          right-icon="question-o"
          left-icon="contact"
          placeholder="Email"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-model="phone"
          label="Phone"
          left-icon="phone"
          placeholder="Phone"
          error-message=""
        />
      </van-cell-group>

      <p>How was the product quality?</p>

      <van-cell-group>
        <van-radio-group v-model="product">
          <van-cell
            title="Happy"
            icon="smile-o"
            clickable
            @click="product = '3'"
          >
            <van-radio slot="right-icon" name="3" />
          </van-cell>
          <van-cell
            title="Neutral"
            icon="more-o"
            clickable
            @click="product = '2'"
          >
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="Sad" icon="down" clickable @click="product = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
        </van-radio-group>
      </van-cell-group>

      <p>How was the service?</p>

      <van-cell-group>
        <van-radio-group v-model="service">
          <van-cell
            title="Happy"
            icon="smile-o"
            clickable
            @click="service = '3'"
          >
            <van-radio slot="right-icon" name="3" />
          </van-cell>
          <van-cell
            title="Neutral"
            icon="more-o"
            clickable
            @click="service = '2'"
          >
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="Sad" icon="down" clickable @click="service = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
        </van-radio-group>
      </van-cell-group>

      <p>How was the ambiance?</p>

      <van-cell-group>
        <van-radio-group v-model="ambiance">
          <van-cell
            title="Happy"
            icon="smile-o"
            clickable
            @click="ambiance = '3'"
          >
            <van-radio slot="right-icon" name="3" />
          </van-cell>
          <van-cell
            title="Neutral"
            icon="more-o"
            clickable
            @click="ambiance = '2'"
          >
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="Sad" icon="down" clickable @click="ambiance = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
        </van-radio-group>
      </van-cell-group>
    <van-divider />
      <van-divider />
 <van-divider />
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import logo from "../assets/tlblogo.jpeg";
import PouchDB from "pouchdb";
import {
  RadioGroup,
  Toast,
  Radio,
  Button,
  Divider,
  Field,
  Rate,
  Image,
  Cell,
  Swipe,
  SwipeItem,
  CellGroup
} from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Button)
  .use(Divider)
  .use(RadioGroup)
  .use(Radio)
  .use(Field)
  .use(Rate)
  .use(Image)
  .use(Toast)
  .use(Swipe)
  .use(SwipeItem);

export default {
  data() {
    return {
      db: new PouchDB("surveys"), //db instance
      errors: [],
      logo,
      email: "",
      phone: "",
      product: "3",
      service: "3",
      ambiance: "3",
      branch: localStorage.getItem("branch")
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onClickRight: function(e) {
      this.checkForm(e);
    },
    checkForm: function(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.errors.length) {
        var survey = {
          submitted_at: new Date().toISOString(),
          email: this.email,
          phone: this.phone,
          productScore: this.product,
          serviceScore: this.service,
          ambianceScore: this.ambiance,
          completed: false,
          branch: this.branch,
          sync: false
        };
        this.db.post(survey, (err, result) => {
          if (!err) {
            console.log(result);
            console.log("Successfully posted a todo!");
            this.email = "";
            this.phone = "";
            this.ambiance = "3";
            this.product = "3";
            this.service = "3";
            Toast.success("Thank you for your feedback!");
          }
        });
      }
    },
    onLoad: function() {
      console.log("loaded");
      localStorage.setItem("branch", this.$route.params.branch);
    }
    // to get all saved notes
  }
};
</script>

<style>
p {
  padding: 0.1em 0.75em;
}

.logo {
  margin-top: 3.5em;
}
</style>
