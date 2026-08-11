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
    private resources: PIXI.utils.Dict<PIXI.LoaderResource>,
  ) {
    super()

    this.enemySprite = this.createSprite(spriteName, 0.5, 0.35)

    this.animalName = this.createText(
      spriteName,
      this.textStyle,
      0.5,
      -this.enemySprite.height / 2 - 20,
    )

    this.addChild(this.animalName)
    this.addChild(this.enemySprite)
  }

  private createSprite(
    spriteName: string,
    anchor: number,
    scale: number,
  ): PIXI.Sprite {
    const Sprite = PIXI.Sprite.from(this.resources[spriteName].data)
    Sprite.anchor.set(anchor, anchor)
    Sprite.scale.set(scale, scale)
    return Sprite
  }

  private createText(
    text: string,
    style: PIXI.TextStyle,
    anchor: number,
    posY: number,
  ): PIXI.Text {
    const textSprite = new PIXI.Text(text, style)
    textSprite.anchor.set(anchor, anchor)
    textSprite.position.set(0, posY)

    return textSprite
  }

  private getRandomValue(max: number, min: number): number {
    return Math.random() * (max - min) + min
  }

  public setRandomPosition(maxX: number, maxY: number): void {
    this.x = this.getRandomValue(maxX, this.enemySprite.width * 2)
    this.y = this.getRandomValue(maxY, this.enemySprite.height * 2)
    this._rndRir = this.getRandomValue(360, 0)
  }

  public update(dt: number): void {
    const { width, height } = this.enemySprite
    const moveX = Math.sin(this._rndRir * dt) * 2
    const moveY = Math.cos(this._rndRir * dt) * 2

    this.x += moveX
    this.y += moveY

    const isOutOfBounds =
      this.x - width / 2 < 0 ||
      this.x + width / 2 > APP_PROPS.width ||
      this.y - height / 2 < 0 ||
      this.y + height / 2 > APP_PROPS.height

    if (isOutOfBounds) {
      this.x -= moveX * 10
      this.y -= moveY * 10

      this._rndRir = this.getRandomValue(360, 0)
    }
  }

  public get sprite(): PIXI.Sprite {
    return this.enemySprite
  }
}
