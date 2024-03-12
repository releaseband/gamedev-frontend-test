import * as PIXI from 'pixi.js';
import { Level } from './Level';

export class Background extends PIXI.Container {
	private _level: Level;
	private tiles: PIXI.Graphics[] = [];

	constructor(level: Level) {
		super();
		this._level = level;
		this._level.addChild(this);

		this.background();
	}

	background() {
		for (let i = 0; i < 1024 / 32; i++) {
			for (let y = 0; y < 768 / 24; y++) {
				const createTile = (x: number, y: number) => {
					const tile = new PIXI.Graphics();
					tile.beginFill(0x000000, 0.2);
					tile.drawRect(x * 32 + 32 * 0.1, y * 32 + 32 * 0.1, 32 * 0.8, 32 * 0.8);
					tile.endFill();
					this.addChild(tile);
					this.tiles.push(tile);
				};

				createTile(i, y);
			}
		}
	}
}
