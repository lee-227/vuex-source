import Module from './module'
import { forEach } from '../util'

export default class ModuleCollection {
  constructor(options) {
    this.register([], options)
  }
  register(path, rootModule) {
    let newModule = new Module(rootModule)
    rootModule.newModule = newModule
    if (path.length === 0) {
      this.root = newModule
    } else {
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current)
      }, this.root)
      parent.addChild(path[path.length - 1], newModule)
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (module, name) => {
        this.register(path.concat(name), module)
      })
    }
  }
  getNamespace(path) {
    let root = this.root
    return path.reduce((namespace, key) => {
      root = root.getChild(key)
      return namespace + (root.namespaced ? key + '/' : '')
    }, '')
  }
}
