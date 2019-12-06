import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ipfsInstance: null,
    ipfsInstanceId: null, 
  },
  mutations: {
    setIPFSInstance(state, instance) {
      state.ipfsInstance = instance;
    },

    setIPFSNodeId(state, id) {
      state.ipfsInstanceId = id;
    }
  },
  actions: {

  }
})
