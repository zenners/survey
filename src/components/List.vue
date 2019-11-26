<template>
    <div>
        <van-nav-bar
            title="Feedback"
            left-text="Back"
            right-text="Sync Now"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />

    <p>Total number of surveys: {{ count }}</p>
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="Finished"
        @load="onLoad"
        >

    <van-cell-group v-for="item in list" :key="item.doc._id">
        <van-cell title="Email" :value="item.doc.email" />
        <van-cell title="Phone" :value="item.doc.phone" label="" />
        <van-cell title="Product Score" :value="item.doc.productScore" />
        <van-cell title="Service Score" :value="item.doc.serviceScore" />
        <van-cell title="Ambiance Score" :value="item.doc.ambianceScore" />
        <van-cell title="Date Submitted" :value="item.doc.submitted_at" />
        <van-divider />

    </van-cell-group>

    <!-- <van-cell-group  v-for="item in list" :key="item._id"
        :title="item.doc.email"
        :label="item.doc.phone">
       
    </van-cell-group> -->

    </van-list>
        </div>
</template>



<script>
import PouchDB from "pouchdb";
import Vue from "vue";

import { List, NavBar, Toast, Cell, Divider, CellGroup } from "vant";
Vue.use(List).use(Divider);
Vue.use(Cell).use(CellGroup);
Vue.use(NavBar);
Vue.use(Toast);

// var remoteCouch = "http://localhost:5984/surveys";

export default {
  data() {
    return {
      list: [],
      db: new PouchDB("surveys"),
      loading: false,
      finished: false
    };
  },

  computed: {
    // a computed getter
    count: function() {
      // `this` points to the vm instance
      return this.list.length;
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      var remoteCouch = "http://localhost:5984/surveys";

      this.db.replicate
        .to(remoteCouch, {
          live: true,
          retry: true,
          filter: function(doc) {
            return doc.sync === false;
          }
        })
        .on("change", function(info) {
          console.log(info);
        })
        .on("paused", function(err) {
          console.log(err);
          // replication paused (e.g. replication up to date, user went offline)
        })
        .on("active", function() {
          // replicate resumed (e.g. new changes replicating, user went back online)
        })
        .on("denied", function(err) {
          console.log(err);
          // a document failed to replicate (e.g. due to permissions)
        })
        .on("complete", function(info) {
          // handle complete
          console.log(info);
        })
        .on("error", function(err) {
          console.log(err);
          // handle error
        });

      //   rep.cancel(); // whenever you want to cancel
      Toast("Button");
    },
    onLoad() {
      setTimeout(() => {
        this.db.allDocs({ include_docs: true }, (err, result) => {
          if (err) {
            return window.alert("Error occured fetching notes");
          }
          console.log(result);
          this.list = result.rows;
          this.finished = true;
        });
      }, 500);
    }
  }
};
</script>


