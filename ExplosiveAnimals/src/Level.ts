import * as PIXI from 'pixi.js'
import { Background } from './Background'
import { Enemy } from './Enemies/Enemy'

export class Level extends PIXI.Container {
  private _resources: any
  private backGround: Background
  private _enemies: any[] = []

  constructor(resources: any) {
    super()

    this._resources = resources
    this.backGround = this.createBackground()

    for (let i = 0; i < 12; i++) {
      this.createEnemy()
    }

    const createEnemyByTimer = () => {
      setTimeout(() => {
        this.createEnemy()
        createEnemyByTimer()
      }, 100)
    }

    createEnemyByTimer()
  }

  public update(dt: number) {
    if (this.backGround.x != 0 || this.backGround.y != 0) {
      this.backGround.position.set(0, 0)
    }

    this._enemies.forEach((enemy) => {
      enemy.update(dt)
    })

    for (let i = 0; i < this._enemies.length; i++) {
      const enemy = this._enemies[i]

      for (let j = 0; j < this._enemies.length; j++) {
        const otherEnemy = this._enemies[j]

        if (i !== j && this.hitTest(enemy, otherEnemy)) {
          this.destroyEnemies(enemy, otherEnemy)
        }
      }
    }
  }

  private destroyEnemies(enemy: PIXI.Sprite, prevEnemy: PIXI.Sprite): boolean {
    this.processInteraction(
      (enemy.x + prevEnemy.x) / 2,
      (enemy.y + prevEnemy.y) / 2,
    )

    this.removeChild(enemy)
    this.removeChild(prevEnemy)

    for (let i = 0; i < this._enemies.length; i++) {
      if (enemy == this._enemies[i]) {
        this._enemies.splice(i, 1)
      }
    }

    for (let i = 0; i < this._enemies.length; i++) {
      if (prevEnemy == this._enemies[i]) {
        this._enemies.splice(i, 1)
      }
    }

    return true
  }

  private processInteraction(x: number, y: number) {
    const explosion = PIXI.AnimatedSprite.fromFrames(
      this._resources.explosion.data.animations.tile,
    )
    explosion.anchor.set(0.5, 0.5)
    explosion.position.set(x, y)
    explosion.loop = false
    explosion.play()
    this.addChild(explosion)

    this.backGround.position.set(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
    )
  }

  private hitTest(s1: PIXI.Sprite, s2: PIXI.Sprite): boolean {
    const s1Left = s1.x - s1.width / 2
    const s1Right = s1.x + s1.width / 2
    const s1Top = s1.y - s1.height / 2
    const s1Bottom = s1.y + s1.height / 2

    const s2Left = s2.x - s2.width / 2
    const s2Right = s2.x + s2.width / 2
    const s2Top = s2.y - s2.height / 2
    const s2Bottom = s2.y + s2.height / 2

    return (
      s1Right > s2Left &&
      s1Left < s2Right &&
      s1Bottom > s2Top &&
      s1Top < s2Bottom
    )
  }

  private createBackground(): Background {
    return new Background(this)
  }

  public createEnemy() {
    const enemies = ['Cow', 'Bear', 'Buffalo', 'Chicken', 'Chick_yellow']
    const random = Math.floor(Math.random() * 5)
    const randomSprite = enemies[random]

    const enemy = new Enemy(randomSprite, this._resources)
    this.addChild(enemy)
    this._enemies.push(enemy)
    enemy.setRandomPosition()

    return enemy
  }
}
