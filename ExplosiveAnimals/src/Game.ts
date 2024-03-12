import * as PIXI from 'pixi.js';
import { Howl } from 'howler';
import { Level } from './Level';

export class Game {
	app: PIXI.Application;
	resources: any | null = null;
	sounds: Map<string, Howl> = new Map();
	Level: Level | null = null;

	constructor() {
		const app = new PIXI.Application({
			width: 1024,
			height: 768,
			backgroundColor: 0x4ec0ca,
		});
		const appDiv = document.createElement('div');
		appDiv.className = 'app';
		appDiv.innerHTML = `<div class="ui-container"><div class="game-container"></div>`;
		document.body.appendChild(appDiv);

		const gameContainer = document.querySelector('.game-container') as HTMLElement;
		gameContainer.appendChild(app.renderer.view);

		this.app = app;
	}

	//TODO: resource manager
	async preload(onLoadCallback: CallableFunction) {
		const promises: Promise<void>[] = [];

		const loadSoundAsync = (path: string) =>
			new Promise<void>((resolve, reject) => {
				const sound = new Howl({ src: [path] });
				sound.on('load', () => {
					this.sounds.set(path, sound);
					console.warn(`sound ${path} loaded`);
					resolve();
				});
				sound.on('loaderror', () => reject());
			});

		promises.push(loadSoundAsync('assets/sounds/coin2.mp3'));
		promises.push(loadSoundAsync('assets/sounds/MESSAGE-B_Accept.mp3'));
		promises.push(
			new Promise<void>((resolve, reject) => {
				this.app.loader
					.add('Bear', 'assets/Bear.png')
					.add('buffalo', 'assets/buffalo.png')
					.add('chicken', 'assets/chicken.png')
					.add('chick_yellow', 'assets/chick_yellow.png')
					.add('COW', 'assets/COW.png')
					.add('explosion', 'assets/explosion.json')
					.load((loader, resources) => {
						this.resources = resources;
						console.warn('sprites loaded');
						resolve();
					});
			})
		);

		await Promise.all(promises)
			.then((result) => onLoadCallback())
			.catch((err) => console.warn('error loading resources'));
	}

	run() {
		const spinnersContainer = new PIXI.Container();
		this.app.stage.addChild(spinnersContainer);

		let lastTimestamp = 16;
		const run = (timestamp = 0) => {
			const dt = timestamp - lastTimestamp;
			lastTimestamp = timestamp;
			this.app.renderer.render(this.app.stage);
			requestAnimationFrame(run);
			if (this.Level) this.Level.update(dt);
		};
		run();
	}

	getSound(path: string): Howl {
		if (!this.sounds.has(path)) throw new Error('Sound not found');
		return <Howl>this.sounds.get(path);
	}

	populate() {
		if (this.resources) {
			const level = new Level(this.resources);
			this.app.stage.addChild(level);
			this.Level = level;
		}
	}
}
