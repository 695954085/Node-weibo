<template>
  <div class="list">
    <ul class="list__menu">
      <li v-for="item in friendList" :class="['list__item']" :key="item.uerName">
        <img class="list-item__avatar" :alt="item.userName" :src="item.avatar" />
        <p class="list-item__name">{{item.userName}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userList", "user"]),
    friendList() {
      if (!this.userList) {
        return new Array();
      }
      return this.userList.filter((value, index, array) => {
        if (value.userName == this.user.userName) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    ...mapActions(["requestUserListFromServer"])
  },
  created() {
    this.requestUserListFromServer();
  }
};
</script>

<style lang="scss" scoped>
.list__menu {
  list-style: none;
  padding: 0px;
  margin: 0px;

  .list__item {
    padding: 0px;
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.is-active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .list-item__avatar {
      width: 30px;
      height: 30px;
    }

    .list-item__name {
      margin: 0 0 0 20px;
      line-height: 1.4rem;
    }
  }
}
</style>

