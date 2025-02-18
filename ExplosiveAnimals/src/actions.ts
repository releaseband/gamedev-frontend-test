import { AnyEventObject, assign } from 'xstate'
import { Game } from './Game'
import { GameContext, stateService } from '.'

export const initAction = assign(
  (context: GameContext, event: AnyEventObject) => {
    console.warn('init action', event)
    stateService.send('PRELOAD')
    return { game: new Game() }
  },
)

export const preloadAction = (
  { game }: GameContext,
  event: AnyEventObject,
): void => {
  console.warn('preload action', event)
  if (game) {
    game.preload(() => {
      stateService.send('RUN')
    })
  } else stateService.send('ERROR')
}

export const runAction = (
  { game }: GameContext,
  event: AnyEventObject,
): void => {
  console.warn('run action', event)
  if (game) {
    game.populate()
    game.run()
    stateService.send('LAZYLOAD')
  }
}

export const lazyAction = (
  _context: GameContext,
  event: AnyEventObject,
): void => {
  console.warn('lazyload action', event)
}
export const errorAction = (
  _context: GameContext,
  event: AnyEventObject,
): void => {
  console.warn('error action', event)
}
