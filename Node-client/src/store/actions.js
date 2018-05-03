import { requestPoints, subimtPoint, requestUserList } from '../api/index'
import { INITPOINTS, ADDPOINT, INITUSERList } from './mutation-types'

export default {
  async getPointsFromServer({ commit, state }) {
    let result = await requestPoints(state.user.token);
    // token无法认证
    if (result.status == 401) {
      return false;
    } else if (result.status == 200) {
      commit(INITPOINTS, result.data);
      return true;
    }
  },
  async submitPointToServer({ commit }, point) {
    let result = await subimtPoint(point);
    if (result.status == 401) {
      return fasle;
    } else if (result.status == 200){
      commit(ADDPOINT, point);
      return true;
    }
  },
  async requestUserListFromServer({ commit, state }) {
    let result = await requestUserList();
    if (result.status == 200)
      commit(INITUSERList, result.data);
  }
}
