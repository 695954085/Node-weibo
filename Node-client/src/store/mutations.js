import { INITPOINTS, ADDPOINT, GETPOINT } from './mutation-types'

export default {
  [INITPOINTS](state, points) {
    state.points.push(...points);
  },
  [ADDPOINT](state, point) {
    state.points.push(point);
  }
}
