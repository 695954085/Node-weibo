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
      <div class="handle__comment" @click="showComment()">
        <i class="el-icon-edit"></i>
        评论
      </div>
      <div class="handle__like" @click="addLike()">
        <i class="el-icon-star-off"></i>
        点赞
        <span class="like__count">{{likeCount}}</span>
      </div>
    </div>
    <div class="pointcomment" v-show="isShowComment">
      <div class="pointcomment__publisher">
        <img :src="user.avatar" height='30px' width='30px' class="content__avatar" />
        <input class="content__input" v-model="pointComment" />
        <el-button type="primary" class="content_button" @click="addPointComment()">评论</el-button>
      </div>
      <div class="comment-list">
        <div class="list__item" v-for="item in currentPoint.comments">
          <span class="item__userName">{{item.userName}}</span>
          <span class="item__comment">{{item.text}}</span>
          <span class="item__date">{{item.date|dateFileter}}</span>
        </div>
      </div>
    </div>
    <div v-show="isLoadingComment" class="pointcomment">
      <span class="commentloading">
        <i class="el-icon-edit"></i>正在加载,请稍后...</span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {
  requestAuthorInf,
  requestPointComment,
  submitPointComment
} from "../api";

export default {
  data() {
    return {
      // 当前评论的作者
      currentAuthor: {
        userName: "",
        // 默认的头像
        avatar: "/img/logo.png"
      },
      // 当前说说
      currentPoint: {
        _id: "",
        like: [],
        author: "",
        aid: "",
        date: "",
        text: "",
        comments: []
      },
      isShowComment: false,
      isLoadingComment: false,
      pointComment: ""
    };
  },
  filters: {
    dateFileter(value) {
      let date = new Date(value);
      return date.toDateString();
    }
  },
  props: ["index"],
  computed: {
    ...mapState(["points", "user"]),
    likeCount() {
      return this.currentPoint.like.length;
    }
  },
  methods: {
    ...mapActions(["requestAddLike"]),
    async getCurrentAuthor() {
      let result = await requestAuthorInf({
        _id: this.currentPoint.aid
      });
      if (result.status == 200) {
        this.currentAuthor = result.data;
      }
    },
    showComment() {
      if (this.isShowComment || this.isLoadingComment) {
        this.isShowComment = false;
        this.isLoadingComment = false;
        return;
      }
      // 1. 下载comment
      this.isLoadingComment = true;
      // 开始下载comment
      requestPointComment({
        _id: this.currentPoint._id
      }).then(value => {
        this.isLoadingComment = false;
        this.isShowComment = true;
        if (value.status == 200) {
          // 赋值comment
          this.currentPoint.comments =
            value.data.comments == "" ? [] : value.data.comments;
        }
      });
    },
    // 上传评论
    addPointComment() {
      let newComment = {
        userName: this.user.userName,
        text: this.pointComment,
        date: new Date(),
        _id: this.currentPoint._id
      };
      submitPointComment({
        userName: this.user.userName,
        text: this.pointComment,
        date: new Date(),
        _id: this.currentPoint._id
      }).then(value => {
        if (value.status == 200) {
          // 上传成功
          this.$message("上传成功");
          delete newComment._id;
          // this.$set(
          //   this.currentPoint,
          //   "this.currentPoint.comments",
          //   this.currentPoint.comments.push(newComment)
          // );
          this.currentPoint.comments.push(newComment);
          // 清空消息
          this.pointComment = "";
        } else {
          console.log(value.status);
        }
      });
    },
    // 点赞
    addLike() {
      this.requestAddLike({
        _id: this.currentPoint._id,
        userName: this.user.userName,
        index: this.index
      });
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
@import "~element-ui/packages/theme-chalk/src/common/var";
.SS-cardwrap {
  box-sizing: border-box;
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

      .like__count {
        background-color: $--color-danger;
        color: white;
        width: 15px;
        border-radius: 5px;
        display: inline-block;
        line-height: 1.3;
        font-size: 14spx;
      }
    }
  }

  .pointcomment {
    overflow: hidden;
    background-color: rgb(242, 242, 245);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    color: rgb(51, 51, 51);
    display: block;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 15.6px;
    word-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    padding: 20px;

    .content__avatar {
      color: rgb(51, 51, 51);
      display: block;
      float: left;
      padding-top: 0px;
      position: relative;
    }

    .content__input {
      line-height: 25px;
      display: block;
      margin-left: 50px;
      width: 500px;
    }

    .content_button {
      float: right;
      margin-right: 5px;
      margin-top: 10px;
    }

    .commentloading {
      color: $--color-danger;
    }

    .pointcomment__publisher {
      overflow: hidden;
    }

    .comment-list {
      .list__item {
      }
    }
  }
}
</style>
