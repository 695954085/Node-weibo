<template>
  <div class="SS-cardwrap">
    <div class="SS-cardwrap__content">
      <img :src="currentAuthor.avatar" :alt="currentAuthor.userName" class="content__avatar">
      <div class="content__detail">{{currentPoint.text}}</div>
      <div class="content__like">{{likeCount}}</div>
    </div>
    <div class="SS-cardwrap__handle">

    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { requestAuthorInf } from "../api";

export default {
  data() {
    return {
      currentAuthor: {
        userName: "",
        // 默认的头像
        avatar: "/img/logo.png"
      },
      // 当前说说
      currentPoint: {
        like: [],
        author: ""
      }
    };
  },
  props: ["index"],
  methods: {},
  computed: {
    ...mapState(["points"]),
    likeCount() {
      return this.currentPoint.like.length;
    }
  },
  methods: {
    async getCurrentAuthor() {
      let result = await requestAuthorInf({
        _id: this.currentPoint.aid
      });
      if (result.status == 200) {
        this.currentAuthor = result.data;
      }
    }
  },
  created() {},
  mounted() {
    this.currentPoint = this.points[this.index];
    // 通过这个point得到currentAuthor
    this.getCurrentAuthor();
  }
};
// https://weibo.com/u/6331262481?is_all=1#_loginLayer_1524494850523
</script>
