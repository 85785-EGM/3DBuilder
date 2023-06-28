import { BufferGeometry, Vector3 } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

export default {
  init () {
    this.loader = new STLLoader()
  },
  async load (url, onProgress = () => {}, config = { mirror: false }) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, resolve, onProgress, reject)
    })
  }
}
