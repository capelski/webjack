import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { GameModes } from './utils/game-modes';
import { stallPromise } from './utils/shared';
import { get } from './utils/http';

export interface ValueReference<T> {
    value: T;
}

export interface State {
    gameMode: GameModes | undefined;
    loading: ValueReference<boolean>;
    onlineTableId: string | undefined;
    onlineUserId: string | undefined;
    registeringPlayerOnline: ValueReference<boolean>;
}

const { baseApiUrl } = process.env;

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store<State>({
        state: {
            gameMode: undefined,
            loading: {
                value: false
            },
            onlineTableId: undefined,
            onlineUserId: undefined,
            registeringPlayerOnline: {
                value: false
            }
        },
        actions: {
            cancelRegister(context: Store<State>) {
                context.commit('registeringPlayerOnline', false);
            },
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
                if (!this.state.onlineUserId) {
                    context.commit('registeringPlayerOnline', true);
                }
                else {
                    context.commit('gameMode', GameModes.remote);
                }
            },
            registerPlayer(context: Store<State>, playerName: string) {
                context.commit('loading', true);
                return stallPromise(get(
                    baseApiUrl + '/register-player',
                    { name: playerName },
                    {},
                    'Error registering the player'))
                .then(data => {
                    context.commit('onlineUserId', data.playerId);
                    context.commit('registeringPlayerOnline', false);
                    context.commit('gameMode', GameModes.remote);
                    context.commit('loading', false);
                });
            },
            retrievePlayerStatus(context: Store<State>) {
                context.commit('loading', true);
                return stallPromise(get(
                    baseApiUrl + '/is-player-registered',
                    null,
                    {},
                    'Error checking whether the player is already registered'))
                .then(data => {
                    if (data.playerId) {
                        context.commit('onlineUserId', data.playerId);
    
                        if (data.tableId) {
                            context.commit('onlineTableId', data.tableId);
                            context.commit('gameMode', GameModes.remote);
                        }
                    }
                    context.commit('loading', false);
                });
            }
        } as any,
        mutations: {
            gameMode(state: State, gameMode: GameModes | undefined) {
                state.gameMode = gameMode;
            },
            loading(state: State, value: boolean) {
                state.loading = { value };
            },
            onlineTableId(state: State, onlineTableId: string| undefined) {
                state.onlineTableId = onlineTableId;
            },
            onlineUserId(state: State, onlineUserId: string | undefined) {
                state.onlineUserId = onlineUserId;
            },
            registeringPlayerOnline(state: State, value: boolean) {
                state.registeringPlayerOnline = { value };
            }
        }
    });
}