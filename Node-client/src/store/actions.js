import { requestPoints, subimtPoint, requestUserList } from '../api/index'
import { INITPOINTS, ADDPOINT, INITUSERList } from './mutation-types'

export default {
  async getPointsFromServer({ commit, state }) {
    let result = await requestPoints(state.user.token);
    commit(INITPOINTS, result.data);
  },
  async submitPointToServer({ commit }, point) {
    let result = await subimtPoint(point);
    commit(ADDPOINT, point);
    return result;
  },
  async requestUserListFromServer({ commit, state }) {
    let result = await requestUserList();
    commit(INITUSERList, result.data);
  }
}
