<template>
  <div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="text" @keyup.ctrl.13="inputing">
    </textarea>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    inputing() {
      if (this.text == "") {
        return;
      }
      // 利用vuex
      let point = {
        author: this.user.userName,
        aid: this.user._id,
        date: new Date(),
        text: this.text
      }
      if (this.submitPointToServer(point)) {
        this.text = "";
      }
    },
    ...mapActions(["submitPointToServer"])
  }
};
</script>

<style lang="scss" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>


