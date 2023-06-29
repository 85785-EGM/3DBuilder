import { MeshStandardMaterial } from 'three'

const defaultMaterialOptions = []

export default {
  schema: { type: 'vec3' },

  init () {
    if (!this.material) this.material = new MeshStandardMaterial(...defaultMaterialOptions)
  },

  getMaterial () {
    if (!this.material) this.material = new MeshStandardMaterial(...defaultMaterialOptions)
    return this.material
  }
}
