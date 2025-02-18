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
      on: {
        PRELOAD: 'preload',
      },
      onEntry: initAction,
    },
    preload: {
      on: {
        RUN: 'run',
        ERROR: 'error',
      },
      onEntry: preloadAction,
    },
    run: {
      on: {
        LAZYLOAD: 'lazyLoad',
        ERROR: 'error',
      },
      onEntry: runAction,
    },
    lazyLoad: {
      on: {
        ERROR: 'error',
      },
      onEntry: lazyAction,
      type: 'final',
    },
    error: {
      onEntry: errorAction,
    },
  },
})

export const stateService = interpret(stateMachine)

stateService.start()
