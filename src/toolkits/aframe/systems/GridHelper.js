import { GridHelper, FogExp2 } from 'three'
import useSettingStore from '@/stores/setting'

export default {
  dependencies: [],
  schema: {
    visible: { type: 'boolean', default: true }
  },
  init () {
    this.setting = useSettingStore()
    const grid = new GridHelper(100000, 2500, 0xdedfe0, 0xdedfe0)
    this.el.object3D.add(grid)

    const fog = new FogExp2(0xffffff00, 0.0002)
    this.el.object3D.fog = fog

    this.setting.onChange(this.fixFogColor.bind(this, grid, fog))
    this.fixFogColor(grid, fog)
  },

  fixFogColor (grid, fog) {
    const color = this.setting.$state.DARK_MODEL ? 0x000000 : 0xffffff
    fog.color.set(color).convertSRGBToLinear()
  }
}
