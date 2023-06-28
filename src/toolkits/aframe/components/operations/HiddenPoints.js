import { Float32BufferAttribute, Int32BufferAttribute, Uint32BufferAttribute } from 'three'

export default {
  tick () {
    const mesh = this.el.getObject3D('mesh')
    if (this.lastKey === mesh.geometry.uuid) return
    if (!mesh.geometry.attributes.position) return

    this.lastKey = mesh.geometry.uuid
  },

  setHiddenIndexes (indexes) {
    this.indexes = indexes
    this.updateGeometry(indexes)
  },

  updateGeometry (indexes) {
    const mesh = this.el.getObject3D('mesh')
    const attr = mesh.geometry.attributes.position
    // 留三个位置方便操作
    const indexArray = new Uint32Array(attr.count)
    for (let i = 0, count = attr.count; i < count; i++) {
      indexArray[i] = i
    }
    for (let i = 0, count = indexes.length; i < count; i++) {
      indexArray[indexes[i]] = 4294967295
    }
    mesh.geometry.setIndex(new Uint32BufferAttribute(indexArray, 1, false))
  }
}
