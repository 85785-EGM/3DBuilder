import { GridHelper, FogExp2, Color } from 'three'
import useSettingStore from '@/stores/setting'

const RED = new Color('#ee3751')
const BLUE = new Color('#2f84e4')

export default {
  dependencies: [],
  schema: {
    visible: { type: 'boolean', default: true }
  },
  init () {
    this.setting = useSettingStore()
    const grid = new GridHelper(2500, 2500, 0x6c6c6c, 0x4c4c4c)
    this.el.object3D.add(grid)

    const attr = grid.geometry.getAttribute('color')
    const colorStart = (attr.count - 4) / 2

    for (let i = 0; i < 4; i++) {
      attr.setXYZ(colorStart + i, ...(i >= 2 ? BLUE : RED).toArray())
    }

    // console.log(attr.getX(i), attr.getY(i), attr.getZ(i))

    // const fog = new FogExp2(0xff000000, 0.0005)
    // this.el.object3D.fog = fog

    // this.setting.onChange(this.fixFogColor.bind(this, grid, fog))
    // this.fixFogColor(grid, fog)
  },

  fixFogColor (grid, fog) {
    const color = this.setting.$state.DARK_MODEL ? 0x000000 : 0xffffff
    fog.color.set(color).convertSRGBToLinear()
  }
}
