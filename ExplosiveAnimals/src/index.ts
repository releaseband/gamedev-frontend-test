import { createMachine, interpret } from 'xstate'
import { Game } from './Game'
import './index.css'
import {
  errorAction,
  initAction,
  lazyAction,
  preloadAction,
  runAction,
} from './actions'

export interface GameContext {
  game: Game | null
}

const stateMachine = createMachine<GameContext>({
  initial: 'init',
  context: {
    game: null,
  },
  states: {
    init: {
      entry: initAction,
      on: {
        PRELOAD: 'preload',
      },
    },
    preload: {
      entry: preloadAction,
      on: {
        RUN: 'run',
        ERROR: 'error',
      },
    },
    run: {
      entry: runAction,
      on: {
        LAZYLOAD: 'lazyLoad',
        ERROR: 'error',
      },
    },
    lazyLoad: {
      entry: lazyAction,
      on: {
        ERROR: 'error',
      },
      type: 'final',
    },
    error: {
      entry: errorAction,
    },
  },
})

export const stateService = interpret(stateMachine)

stateService.start()
