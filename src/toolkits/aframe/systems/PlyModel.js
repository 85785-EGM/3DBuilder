import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'

export default {
  init () {
    this.loader = new PLYLoader()
  },
  async load (url, onProgress = () => {}, config = { mirror: false }) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, resolve, onProgress, reject)
    })
  }
}
