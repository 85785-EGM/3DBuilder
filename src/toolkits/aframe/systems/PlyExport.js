import { BufferGeometry, Vector3 } from 'three'
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import saveFile from '@/utils/file/saveFile'

const DEFAULT_OPTIONS = {
  binary: true
}
export default {
  init () {
    this.exporter = new PLYExporter()
    this.e = new OBJExporter()
  },
  export (mesh, options = {}) {
    const data = this.exporter.parse(mesh, null, { ...DEFAULT_OPTIONS, ...options })
    const name = options.name ?? `${mesh.uuid}.ply`
    saveFile(new Blob([data]), name)
  },
  exportToArrayBuffer (mesh, options = {}) {
    const data = this.exporter.parse(mesh, null, {
      ...DEFAULT_OPTIONS
    })
    return data
  }
}
