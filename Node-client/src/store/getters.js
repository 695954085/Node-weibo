export default {
  // 说说总数量
  pointCount(state, getters) {
    return state.points.length;
  },
  // 朋友列表
  friendList(state, getters) {
    return state.userList.filter(function (value, index, array) {
      if (value != state.user.userName) {
        return true;
      }
      return false;
    })
  }
}
