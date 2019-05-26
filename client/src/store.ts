import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { GameModes } from './game-modes';

export interface State {
    gameMode: GameModes | undefined;
}

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store<State>({
        state: {
            gameMode: undefined
        },
        actions: {
            exitTable(context: Store<State>) {
                context.commit('gameMode', undefined);
            },
            joinBasicStrategyTable(context: Store<State>) {
                context.commit('gameMode', GameModes.basicStrategy);
            },
            joinOfflineTable(context: Store<State>) {
                context.commit('gameMode', GameModes.local);
            },
            joinOnlineTable(context: Store<State>) {
                context.commit('gameMode', GameModes.remote);
            }
        } as any,
        mutations: {
            gameMode(state: State, gameMode: GameModes | undefined) {
                state.gameMode = gameMode;
            }
        }
    });
}