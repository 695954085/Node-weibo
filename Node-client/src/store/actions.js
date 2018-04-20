import { requestPoints, subimtPoint } from '@/api'
import { INITPOINTS, ADDPOINT } from './mutation-types'

export default {
  getPointsFromServer({ commit }) {
    requestPoints().then(result => {
      commit(INITPOINTS, result.data);
    })
  },
  submitPointToServer({ commit }, point) {
    subimtPoint(point).then(result => {
      commit(ADDPOINT, point);
    })
  }
}
