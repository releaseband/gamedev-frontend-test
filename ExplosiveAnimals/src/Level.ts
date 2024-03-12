import * as PIXI from 'pixi.js';
import { Background } from './Background';
import { Cow } from './Enemies/Cow';
import { Bear } from './Enemies/Bear';
import { Buffalo } from './Enemies/Buffalo';
import { Chicken } from './Enemies/Chicken';
import { Chick_yellow } from './Enemies/Chick_yellow';

export class Level extends PIXI.Container {
	private _resources: any;
	private backGround: Background;
	private _enemies: any[] = [];

	constructor(resources: any) {
		super();

		this._resources = resources;
		this.backGround = this.createBackground();

		for (let i = 0; i < 12; i++) {
			this.createEnemy();
		}

		const createEnemyByTimer = () => {
			setTimeout(() => {
				this.createEnemy();
				createEnemyByTimer();
			}, 100);
		};

		createEnemyByTimer();
	}

	public update(dt: number) {
		if (this.backGround.x != 0 || this.backGround.y != 0) {
			this.backGround.position.set(0, 0);
		}

		this._enemies.forEach((enemy) => {
			enemy.update(dt);
		});

		for (let i = 0; i < this._enemies.length; i++) {
			const enemy = this._enemies[i];

			for (let j = 0; j < this._enemies.length; j++) {
				const otherEnemy = this._enemies[j];

				if (i !== j && this.hitTest(enemy, otherEnemy)) {
					this.destroyEnemies(enemy, otherEnemy);
				}
			}
		}
	}

	private destroyEnemies(enemy: PIXI.Sprite, prevEnemy: PIXI.Sprite): boolean {
		this.processInteraction((enemy.x + prevEnemy.x) / 2, (enemy.y + prevEnemy.y) / 2);

		this.removeChild(enemy);
		this.removeChild(prevEnemy);

		for (let i = 0; i < this._enemies.length; i++) {
			if (enemy == this._enemies[i]) {
				this._enemies.splice(i, 1);
			}
		}

		for (let i = 0; i < this._enemies.length; i++) {
			if (prevEnemy == this._enemies[i]) {
				this._enemies.splice(i, 1);
			}
		}

		return true;
	}

	private processInteraction(x: number, y: number) {
		const explosion = PIXI.AnimatedSprite.fromFrames(
			this._resources.explosion.data.animations.tile
		);
		explosion.anchor.set(0.5, 0.5);
		explosion.position.set(x, y);
		explosion.loop = false;
		explosion.play();
		this.addChild(explosion);

		this.backGround.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10);
	}

	private hitTest(s1: PIXI.Sprite, s2: PIXI.Sprite) {
		if (s1.x - s1.width / 2 + s1.width / 2 > s2.x - s2.width / 2)
			if (s1.x - s1.width / 2 < s2.x - s2.width / 2 + s2.width / 2)
				if (s1.y - s1.height / 2 + s1.height / 2 > s2.y - s2.height / 2)
					if (s1.y - s1.height / 2 < s2.y - s2.height / 2 + s2.height / 2) return true;

		return false;
	}

	private createBackground(): Background {
		return new Background(this);
	}

	public createEnemy() {
		const random = Math.floor(Math.random() * 5);

		switch (random) {
			case 0:
				const cow = new Cow(this._resources);
				this.addChild(cow);
				this._enemies.push(cow);
				cow.setRandomPosition();
				break;
			case 1:
				const bear = new Bear(this._resources);
				this.addChild(bear);
				this._enemies.push(bear);
				bear.setRandomPosition();
				break;
			case 2:
				const buffalo = new Buffalo(this._resources);
				this.addChild(buffalo);
				this._enemies.push(buffalo);
				buffalo.setRandomPosition();
				break;
			case 3:
				const chicken = new Chicken(this._resources);
				this.addChild(chicken);
				this._enemies.push(chicken);
				chicken.setRandomPosition();
				break;
			case 4:
				const chicken_yellow = new Chick_yellow(this._resources);
				this.addChild(chicken_yellow);
				this._enemies.push(chicken_yellow);
				chicken_yellow.setRandomPosition();
				break;

			default:
				break;
		}
	}
}
