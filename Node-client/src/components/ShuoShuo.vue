<template>
  <div class="shuoshuo">
    <div class="shuoshuo__sidebar">
      <card></card>
    </div>
    <div class="shuoshuo__main">
      <div>
        {{points}}
      </div>
      <div>
          <el-button @click="addPoint">默认按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import card from "@/components/Card";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    card
  },
  computed: {
    ...mapGetters(["pointCount"]),
    ...mapState(["points"])
  },
  methods: {
    // this.getPointsFromServer -> this.$store.dispatch('getPointsFromServer')
    ...mapActions(["getPointsFromServer","submitPointToServer"]),
    // ...mapMutations(["addPoint"])
    async addPoint(){
      let json = {
        author: 'jack',
        text: 'dark night'
      };
      let result = await this.submitPointToServer(json);
      if(result.status == 200 && result.data.n == 1){

      }
    }
  },
  created() {
    this.getPointsFromServer();
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
  }
}
</style>

