<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import { mapState, mapMutations } from 'vuex'
import IPFS from 'ipfs'
export default {
  name:'app',

  components: {
    Sidebar
  },

  computed: {
    ...mapState(['ipfsInstance', 'ipfsInstanceId'])
  },

  methods: {
    ...mapMutations(['setIPFSInstance', 'setIPFSNodeId']),
  },

  created() {
    let ipfs = new IPFS({
      repo: `ipfs/dmrRepo/${Math.random()}`,
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
          ]
        },

        Bootstrap: [
          "/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
          "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
          "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
          "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64"
        ]
      }
    });

    ipfs.on('ready', () => ipfs.id((err, info) => {
      this.setIPFSInstance(ipfs);
      this.setIPFSNodeId(info.id);
      console.log(this.ipfsInstanceId);
    }));
  }
}
</script>