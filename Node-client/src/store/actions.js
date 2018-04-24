import { requestPoints, subimtPoint } from '@/api'
import { INITPOINTS, ADDPOINT } from './mutation-types'

export default {
  async getPointsFromServer({ commit }) {
    let result = await requestPoints();
    commit(INITPOINTS,result.data);
  },
  async submitPointToServer({ commit }, point) {
    let result = await subimtPoint(point);
    commit(ADDPOINT,point);
    return result;
  }
}
