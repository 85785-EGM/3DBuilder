import hotkeys from 'hotkeys-js'

export default class {
  constructor ({ hotkey, option = {}, func = function () {}, info = '', scope = 'global' }) {
    this.hotkey = hotkey
    this.option = { ...option, scope: 'global' }
    this.scope = scope
    this.info = info
    this.isInstall = false
    this.replaceFunc(func)
  }

  install () {
    this.isInstall = true
    hotkeys(this.hotkey, this.option, this.func)
  }

  uninstall () {
    this.isInstall = false
    hotkeys.unbind(this.hotkey, this.func)
  }

  replaceFunc (func) {
    const isInstall = this.isInstall
    if (isInstall) this.uninstall()

    this.func = (event, handler) => {
      event.preventDefault()
      func()
    }

    if (isInstall) this.install()
  }
}
