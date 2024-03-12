import * as PIXI from 'pixi.js';

export class Cow extends PIXI.Container {
	private _cow: PIXI.Sprite;
	private _rndRir: number = 0;

	private animalName: any;

	constructor(resources: any) {
		super();

		this._cow = PIXI.Sprite.from(resources.COW.data);
		this._cow.anchor.set(0.5, 0.5);
		this._cow.scale.set(0.35, 0.35);
		this.addChild(this._cow);

		this.animalName = new PIXI.Text('Chicken', {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0xffffff,
			align: 'center',
		});
		this.animalName.anchor.set(0.5, 0.5);
		this.animalName.position.set(0, -this._cow.height / 2 - 20);
		this.addChild(this.animalName);
	}

	public setRandomPosition() {
		this.x = this._cow.width * 2 + Math.random() * (1024 - this._cow.width * 2);
		this.y = this._cow.height * 2 + Math.random() * (768 - this._cow.height * 2);
		this._rndRir = Math.random() * 360;
	}

	private setRandomRotation() {
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
		return this._cow;
	}
}
