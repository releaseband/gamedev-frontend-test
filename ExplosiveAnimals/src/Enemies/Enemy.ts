import * as PIXI from 'pixi.js'
import { APP_PROPS } from '../Constants'

export class Enemy extends PIXI.Container {
  private enemySprite: PIXI.Sprite
  private _rndRir = 0

  private animalName: PIXI.Text

  private textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center',
  })

  constructor(
    spriteName: string,
    resources: PIXI.utils.Dict<PIXI.LoaderResource>,
  ) {
    super()

    this.enemySprite = PIXI.Sprite.from(resources[spriteName].data)
    this.enemySprite.anchor.set(0.5, 0.5)
    this.enemySprite.scale.set(0.35, 0.35)
    this.addChild(this.enemySprite)

    this.animalName = new PIXI.Text(spriteName, this.textStyle)
    this.animalName.anchor.set(0.5, 0.5)
    this.animalName.position.set(0, -this.enemySprite.height / 2 - 20)
    this.addChild(this.animalName)
  }

  public setRandomPosition(maxX: number, maxY: number): void {
    this.x =
      this.enemySprite.width * 2 +
      Math.random() * (maxX - this.enemySprite.width * 2)
    this.y =
      this.enemySprite.height * 2 +
      Math.random() * (maxY - this.enemySprite.height * 2)
    this._rndRir = Math.random() * 360
  }

  public update(dt: number): void {
    const { width, height } = this.enemySprite
    const moveX = Math.sin(this._rndRir * dt) * 2
    const moveY = Math.cos(this._rndRir * dt) * 2

    this.x += moveX
    this.y += moveY

    const setRandomDirection = Math.random() * 360

    const isOutOfBounds =
      this.x - width / 2 < 0 ||
      this.x + width / 2 > APP_PROPS.width ||
      this.y - height / 2 < 0 ||
      this.y + height / 2 > APP_PROPS.height

    if (isOutOfBounds) {
      this.x -= moveX * 10
      this.y -= moveY * 10

      this._rndRir = setRandomDirection
    }
  }

  public get sprite(): PIXI.Sprite {
    return this.enemySprite
  }
}
