import * as PIXI from 'pixi.js'

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

  public setRandomPosition(): void {
    this.x =
      this.enemySprite.width * 2 +
      Math.random() * (1024 - this.enemySprite.width * 2)
    this.y =
      this.enemySprite.height * 2 +
      Math.random() * (768 - this.enemySprite.height * 2)
    this._rndRir = Math.random() * 360
  }

  public update(): void {
    this.x += Math.sin(this._rndRir) * 2
    this.y += Math.cos(this._rndRir) * 2

    const setRandomDirection = Math.random() * 360

    if (this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 768) {
      this.x -= Math.sin(this._rndRir) * 2 * 10
      this.y -= Math.cos(this._rndRir) * 2 * 10
      this._rndRir = setRandomDirection
    }
  }

  public get sprite(): PIXI.Sprite {
    return this.enemySprite
  }
}
