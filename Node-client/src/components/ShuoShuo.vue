<template>
  <div class="shuoshuo">
    <div class="shuoshuo__sidebar">
      <card></card>
    </div>
    <div class="shuoshuo__main"></div>
  </div>
</template>
<script>
import card from "@/components/Card";
export default {
  data() {
    return {

    }
  },
  components:{
    card
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

