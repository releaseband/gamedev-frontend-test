import * as PIXI from 'pixi.js';

export class Chick_yellow extends PIXI.Container {
	private chicken: PIXI.Sprite;
	private _rndRir: number = 0;
	private animalName: PIXI.Text;

	constructor(resources: any) {
		super();

		this.chicken = PIXI.Sprite.from(resources.chick_yellow.data);
		this.chicken.anchor.set(0.5, 0.5);
		this.chicken.scale.set(0.35, 0.35);
		this.addChild(this.chicken);

		this.animalName = new PIXI.Text('Chicken', {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0xffffff,
			align: 'center',
		});
		this.animalName.anchor.set(0.5, 0.5);
		this.animalName.position.set(0, -this.chicken.height / 2 - 20);
		this.addChild(this.animalName);
	}

	public get sprite(): PIXI.Sprite {
		return this.chicken;
	}

	public setRandomPosition() {
		this.x = this.chicken.width * 2 + Math.random() * (1024 - this.chicken.width * 2);
		this.y = this.chicken.height * 2 + Math.random() * (768 - this.chicken.height * 2);
		this._rndRir = Math.random() * 360;
	}

	public update(dt: number) {
		this.x += Math.sin(this._rndRir) * 2;
		this.y += Math.cos(this._rndRir) * 2;

		const setRandomDirection = Math.random() * 360;

		if (this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 768) {
			this.x -= Math.sin(this._rndRir) * 2 * 10;
			this.y -= Math.cos(this._rndRir) * 2 * 10;
			this._rndRir = setRandomDirection;
		}
	}
}
