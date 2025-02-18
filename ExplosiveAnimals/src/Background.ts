import * as PIXI from 'pixi.js'
import { Level } from './Level'

export class Background extends PIXI.Container {
  private _level: Level
  private tiles: PIXI.Graphics[] = []

  constructor(level: Level) {
    super()
    this._level = level
    this._level.addChild(this)

    this.background()
  }

  private createTile(x: number, y: number) {
    const fillColor = 0x000000
    const alpha = 0.2
    const posX = x * 32 + 32 * 0.1
    const posY = y * 32 + 32 * 0.1
    const width = 32 * 0.8
    const height = 32 * 0.8

    const tile = new PIXI.Graphics()
      .beginFill(fillColor, alpha)
      .drawRect(posX, posY, width, height)
      .endFill()
    this.addChild(tile)
    this.tiles.push(tile)
  }

  background() {
    const tileCountX = 1024 / 32
    const tileCountY = 768 / 24
    for (let i = 0; i < tileCountX; i++) {
      for (let j = 0; j < tileCountX; j++) {
        this.createTile(i, j)
      }
    }
  }
}
