import * as PIXI from 'pixi.js'
import { Background } from './Background'
import { Enemy } from './Enemies/Enemy'
import { APP_PROPS } from './Constants'

export class Level extends PIXI.Container {
  private _resources: PIXI.utils.Dict<PIXI.LoaderResource>
  private backGround: Background
  private _enemies: Enemy[] = []

  constructor(resources: PIXI.utils.Dict<PIXI.LoaderResource>) {
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

  public update(dt: number): void {
    if (this.backGround.x != 0 || this.backGround.y != 0) {
      this.backGround.position.set(0, 0)
    }

    for (let i = 0; i < this._enemies.length; i++) {
      const enemy = this._enemies[i]
      enemy.update(dt)

      for (let j = i + 1; j < this._enemies.length; j++) {
        const otherEnemy = this._enemies[j]

        if (this.hitTest(enemy, otherEnemy)) {
          this.destroyEnemies(enemy, otherEnemy)
        }
      }
    }
  }

  private destroyEnemies(enemy: Enemy, prevEnemy: Enemy): boolean {
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

  private hitTest(s1: Enemy, s2: Enemy): boolean {
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

  public createEnemy(): Enemy {
    const { width, height } = APP_PROPS
    const enemies = ['Cow', 'Bear', 'Buffalo', 'Chicken', 'Chick_yellow']
    const random = Math.floor(Math.random() * 5)
    const randomSprite = enemies[random]

    const enemy = new Enemy(randomSprite, this._resources)
    this.addChild(enemy)
    this._enemies.push(enemy)
    enemy.setRandomPosition(width, height)

    return enemy
  }
}
