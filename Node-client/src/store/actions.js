import { requestPoints, subimtPoint } from '@/api'
import { INITPOINTS, ADDPOINT } from './mutation-types'

export default {
  getPointsFromServer({ commit }) {
    requestPoints().then(result => {
      commit(INITPOINTS, result.data);
    })
  },
  async submitPointToServer({ commit }, point) {
    // subimtPoint(point).then(result => {
    //   commit(ADDPOINT, point);
    //   return result;
    // })
    let result = await subimtPoint(point);
    commit(ADDPOINT,point);
    return result;
  }
}
