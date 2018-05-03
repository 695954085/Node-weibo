<template>
  <div class="SS-cardwrap">
    <div class="SS-cardwrap__content">
      <img :src="currentAuthor.avatar" :alt="currentAuthor.userName" height='50px' width='50px' class="content__avatar">
      <div class="content__detail">
        <div class="content__author">{{currentPoint.author}}</div>
        <div class="content__date">{{currentPoint.date | dateFileter}}</div>
        <div class="content__text">{{currentPoint.text}}</div>
      </div>
    </div>
    <div class="SS-cardwrap__handle">
      <div class="handle__comment">
        <i class="el-icon-edit"></i>
        评论
      </div>
      <div class="handle__like">
        <i class="el-icon-star-off"></i>
        点赞
      </div>
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
  filters: {
    dateFileter(value) {
      let date = new Date(value);
      return date.toDateString();
    }
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
  letter-spacing: normal;
  line-height: 1.3;
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
      border-radius: 25px;
      color: rgb(51, 51, 51);
      display: block;
      float: left;
      padding-top: 0px;
      position: relative;
      width: 50px;
    }

    .content__detail {
      margin-left: 60px;
      color: rgb(51, 51, 51);
      display: block;
      letter-spacing: normal;
      width: 500px;
      text-align: left;

      .content__author {
        font-size: 14px;
        font-weight: 700;
      }

      .content__date {
        color: rgb(128, 128, 128);
        margin-bottom: 2px;
      }

      .content__text {
        font-size: 14px;
        line-height: 23px;
      }
    }
  }

  .SS-cardwrap__handle {
    color: rgb(51, 51, 51);
    font-size: 12px;
    font-weight: 400;
    border-top: 1px solid rgb(242, 242, 245);
    display: flex;
    cursor: pointer;

    &:hover {
      color: #eb7350;
    }

    .handle__comment {
      flex-grow: 1;
      margin: 7px 0;
      line-height: 22px;
      position: relative;

      &::after {
        content: "";
        width: 1px;
        display: block;
        height: 100%;
        background-color: rgb(217, 217, 217);
        position: absolute;
        right: 0px;
        top: 0;
      }
    }

    .handle__like {
      flex-grow: 1;
      margin: 7px 0;
      line-height: 22px;
    }
  }
}
</style>
