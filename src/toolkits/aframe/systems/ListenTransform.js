export default {
  dependencies: [],
  schema: {},
  tick () {
    if (!this.onChange) return
    const object = this.el.systems['transform-controls'].controls?.object
    if (!object) return
    const key = object.matrixWorld.toArray().join(',')
    if (this.lastKey === key) return
    this.lastKey = key
    this.onChange()
  }
}
