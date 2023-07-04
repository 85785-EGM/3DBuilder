import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'
import saveFile from '@/utils/file/saveFile'

const DEFAULT_OPTIONS = {
  binary: true
}
export default {
  init () {
    this.exporter = new STLExporter()
  },
  export (mesh, options = {}) {
    const data = this.exporter.parse(mesh, { ...DEFAULT_OPTIONS, ...options })
    const name = options.name ?? `${mesh.uuid}.stl`
    saveFile(new Blob([data]), name)
  },
  exportToArrayBuffer (mesh, options = {}) {
    const data = this.exporter.parse(mesh, { ...DEFAULT_OPTIONS, ...options })
    return data
  }
}
