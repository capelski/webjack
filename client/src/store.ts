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
            joinLocalTable(context: Store<State>) {
                context.commit('gameMode', GameModes.local);
            },
            joinRemoteTable(context: Store<State>) {
                context.commit('gameMode', GameModes.remote);
            },
            joinTrainingTable(context: Store<State>) {
                context.commit('gameMode', GameModes.training);
            }
        } as any,
        mutations: {
            gameMode(state: State, gameMode: GameModes | undefined) {
                state.gameMode = gameMode;
            }
        }
    });
}