<template>
  <div class="SS-cardwrap">
    <div class="SS-cardwrap__content">
      <img :src="currentAuthor.avatar" :alt="currentAuthor.userName" 
      height='50px' width='50px' class="content__avatar">
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

<style lang="scss" scoped>
.SS-cardwrap {
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 0px;
  color: rgb(51, 51, 51);
  display: block;
  font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
  font-size: 12px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 400;
  height: 334px;
  letter-spacing: normal;
  line-height: 15.6px;
  margin-bottom: 10px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  width: 600px;
  word-spacing: 0px;
  -webkit-font-smoothing: antialiased;

  .SS-cardwrap__content {
    color: rgb(51, 51, 51);
    display: block;
    font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "WenQuanYi Micro Hei", sans-serif;
    font-size: 12px;
    font-stretch: 100%;
    font-style: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    font-weight: 400;
    height: 271px;
    letter-spacing: normal;
    line-height: 15.6px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    padding-bottom: 4px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    position: relative;
    width: 560px;
    word-spacing: 0px;
    -webkit-font-smoothing: antialiased;

    .content__avatar {
      border-bottom-color: rgb(235, 115, 80);
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      border-bottom-style: none;
      border-bottom-width: 0px;
      border-image-outset: 0px;
      border-image-repeat: stretch;
      border-image-slice: 100%;
      border-image-source: none;
      border-image-width: 1;
      border-left-color: rgb(235, 115, 80);
      border-left-style: none;
      border-left-width: 0px;
      border-right-color: rgb(235, 115, 80);
      border-right-style: none;
      border-right-width: 0px;
      border-top-color: rgb(235, 115, 80);
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-top-style: none;
      border-top-width: 0px;
      color: rgb(235, 115, 80);
      cursor: pointer;
      display: inline;
      font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
        "WenQuanYi Micro Hei", sans-serif;
      font-size: 12px;
      font-stretch: 100%;
      font-style: normal;
      font-variant-caps: normal;
      font-variant-east-asian: normal;
      font-variant-ligatures: normal;
      font-variant-numeric: normal;
      font-weight: 400;
      height: 50px;
      letter-spacing: normal;
      line-height: 15.6px;
      width: 50px;
      word-spacing: 0px;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .content__detail {
      color: rgb(51, 51, 51);
      display: block;
      font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
        "WenQuanYi Micro Hei", sans-serif;
      font-size: 12px;
      font-stretch: 100%;
      font-style: normal;
      font-variant-caps: normal;
      font-variant-east-asian: normal;
      font-variant-ligatures: normal;
      font-variant-numeric: normal;
      font-weight: 400;
      height: 265px;
      letter-spacing: normal;
      line-height: 15.6px;
      margin-bottom: 0px;
      margin-left: 60px;
      margin-right: 0px;
      margin-top: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 0px;
      width: 500px;
      word-spacing: 0px;
      -webkit-font-smoothing: antialiased;
    }
  }
}
</style>
