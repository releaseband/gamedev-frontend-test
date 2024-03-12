import * as PIXI from 'pixi.js';

export class Bear extends PIXI.Container {
	private bear: PIXI.Sprite;
	private _rndRir: number = 0;

	private animalName: PIXI.Text;

	constructor(resources: any) {
		super();

		this.bear = PIXI.Sprite.from(resources.Bear.data);
		this.bear.anchor.set(0.5, 0.5);
		this.bear.scale.set(0.35, 0.35);
		this.addChild(this.bear);

		this.animalName = new PIXI.Text('Bear', {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0xffffff,
			align: 'center',
		});
		this.animalName.anchor.set(0.5, 0.5);
		this.animalName.position.set(0, -this.bear.height / 2 - 20);
		this.addChild(this.animalName);
	}

	public setRandomPosition() {
		this.x = this.bear.width * 2 + Math.random() * (1024 - this.bear.width * 2);
		this.y = this.bear.height * 2 + Math.random() * (768 - this.bear.height * 2);
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

	public get sprite(): PIXI.Sprite {
		return this.bear;
	}
}
