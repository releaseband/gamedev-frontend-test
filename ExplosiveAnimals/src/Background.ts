import * as PIXI from 'pixi.js'
import { Level } from './Level'

export class Background extends PIXI.Container {
  private readonly _level: Level
  private readonly tiles: PIXI.Graphics[] = []

  private static readonly TILE_SIZE = 32
  private static readonly TILE_SCALE = 0.8
  private static readonly TILE_OFFSET = 0.1
  private static readonly TILE_COLOR = 0x000000
  private static readonly TILE_ALPHA = 0.2

  private static readonly TILE_COUNT_X = 1024 / 32
  private static readonly TILE_COUNT_Y = 768 / 24

  constructor(level: Level) {
    super()
    this._level = level
    this._level.addChild(this)

    this.generateBackground()
  }

  private createTile(x: number, y: number): void {
    const { TILE_SIZE, TILE_SCALE, TILE_OFFSET, TILE_COLOR, TILE_ALPHA } =
      Background

    const size = TILE_SIZE * TILE_SCALE
    const offset = TILE_SIZE * TILE_OFFSET
    const posX = x * TILE_SIZE + offset
    const posY = y * TILE_SIZE + offset

    const tile = new PIXI.Graphics()
      .beginFill(TILE_COLOR, TILE_ALPHA)
      .drawRect(posX, posY, size, size)
      .endFill()

    this.addChild(tile)
    this.tiles.push(tile)
  }

  generateBackground(): void {
    const { TILE_COUNT_X, TILE_COUNT_Y } = Background

    for (let i = 0; i < TILE_COUNT_X; i++) {
      for (let j = 0; j < TILE_COUNT_Y; j++) {
        this.createTile(i, j)
      }
    }
  }
}
