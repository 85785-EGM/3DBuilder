import { utils } from 'aframe'

export function parse (arg: object) {
  return utils.styleParser.stringify(arg)
}
