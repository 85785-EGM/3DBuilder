import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter'
import saveFile from '@/utils/file/saveFile'

const DEFAULT_OPTIONS = {
  binary: true
}
export default {
  init () {
    this.exporter = new PLYExporter().parse
  },
  export (mesh, options = {}) {
    const data = this.exporter.parse(mesh, null, { ...DEFAULT_OPTIONS, ...options })
    const name = options.name ?? `${mesh.uuid}.ply`
    saveFile(new Blob([data]), name)
  },
  exportToArrayBuffer (mesh, options = {}) {
    const data = this.exporter.parse(mesh, null, { ...DEFAULT_OPTIONS, ...options })
    return data
  }
}
