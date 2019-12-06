import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ipfsInstance: null,
    ipfsInstanceId: null,
    rooms: [],
    currentRoom: null,
    currentRoomHashes: [],
  },
  mutations: {
    setIPFSInstance(state, instance) {
      state.ipfsInstance = instance;
    },

    setIPFSNodeId(state, id) {
      state.ipfsInstanceId = id;
    },

    setCurrentRoom(state, room) {
      state.currentRoom = room;
    },

    addRoom(state, room) {
      state.rooms.push(room);
    },

    addToCurrentRoomHashes(state, hash) {
      state.currentRoomHashes.push(hash);
    },
  },
  actions: {

  }
})
