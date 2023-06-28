function setMatrix (object, matrix) {
  // const { position, quaternion, scale } = object
  // matrix.decompose(position, quaternion, scale)
  object.position.set(0, 0, 0)
  object.rotation.set(0, 0, 0)
  object.scale.set(1, 1, 1)
  object.applyMatrix4(matrix)
}

export class Commit {
  constructor ({ undo, redo }) {
    if (!undo) {
      throw new Error('undo')
    }
    if (!redo) {
      throw new Error('redo')
    }
    this.undo = undo
    this.redo = redo
  }
}

export class GroupCommit extends Commit {
  constructor (...commits) {
    super({
      undo: () => {
        for (const commit of commits) {
          commit.undo()
        }
      },
      redo: () => {
        for (const commit of commits) {
          commit.redo()
        }
      }
    })
    this._commits = commits
  }

  get commits () {
    return this._commits
  }
}

export class MatrixCommit extends Commit {
  constructor (object, prevValue, value) {
    super({
      undo: () => {
        setMatrix(object, prevValue)
      },
      redo: () => {
        setMatrix(object, value)
      }
    })
  }
}
