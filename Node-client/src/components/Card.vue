<template>
  <div class="card">
    <header>
      <img class="header__avatar" :src="user.img" :alt="user.name" width="40px" height="40px" v-if="user.img" />
      <img v-else class="header__avatar" width="40px" height="40px" src="../assets/logo.png" />
      <p class="header__name">{{user.userName}}</p>
    </header>
    <footer>
      <el-input class="footer__search" type="text" placeholder="search user..." v-model="search" ref="elinput">
      </el-input>
    </footer>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // input搜索框
      search: ""
    };
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style lang="scss" scoped>
.card {
  padding: 12px;
  border-bottom: 1px solid #24272c;

  footer {
    margin-top: 10px;

    .foorer__search {
      padding: 0 10px;
      width: 100%;
      font-size: 12px;
      color: #fff;
      height: 30px;
      line-height: 30px;
      border: 1px solid #3a3a3a;
      border-radius: 4px;
      outline: none;
      background-color: #26292e;
    }
  }

  .icon {
    height: 100%;

    &::before {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      display: block;
    }
  }

  header {
    display: flex;
    align-items: center;
    .header__avatar {
      border-radius: 2px;
    }
    .header__name {
      display: inline-block;
      margin: 0 0 0 15px;
      font-size: 16px;
    }
  }
}
</style>

