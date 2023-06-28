import { BufferGeometry, Vector3 } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export default {
  init () {
    this.loader = new OBJLoader()
  },
  async load (url, onProgress = () => {}, config = { mirror: false }) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, resolve, onProgress, reject)
    })
  }
}
