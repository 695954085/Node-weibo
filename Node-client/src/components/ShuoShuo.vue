<template>
  <div class="shuoshuo">
    <div class="shuoshuo__sidebar">
      <card></card>
      <friendlist></friendlist>
    </div>
    <div class="shuoshuo__main">
      <message class="shuoshuo__message"></message>
      <mtext class="shuoshuo__text"></mtext>
    </div>
  </div>
</template>
<script>
import card from "@/components/Card";
import friendlist from "@/components/FriendList";
import message from "@/components/Message";
import mtext from "@/components/Text";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
    };
  },
  components: {
    card,
    friendlist,
    message,
    mtext
  },
  computed: {
    ...mapGetters(["pointCount"]),
    ...mapState(["points", "user"])
  },
  methods: {
    ...mapActions(["getPointsFromServer"]),
    async addPoint(point) {
      let result = await this.submitPointToServer(point);
    }
  },
  created() {
    // 判断token是否为空，如果为空就跳转到login
    if (this.user.token == null || this.user.token == "") {
      return this.$router.push("/login");
    }
    let isAuthorized = this.getPointsFromServer();
    if (!isAuthorized) {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.shuoshuo {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  .shuoshuo__sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
    height: 100%;
  }
  .shuoshuo__main {
    float: left;
    width: 600px;
    position: relative;
    background-color: #eeeeee;
    height: 100%;

    .shuoshuo__message {
      height: 80%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .shuoshuo__text {
      height: 20%;
    }
  }
}
</style>

