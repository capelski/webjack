<template>
    <div id="app" class="full-height">
        <Loader v-if="loading" />
        <div class="full-height" v-if="!loading">
            <div class="main-menu centered" v-if="!gameMode && !registeringPlayerOnline">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <p class="title">Webjack</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <p class="subtitle">Cashless multiplayer blackjack</p>
                        </div>
                    </div>

                    <div class="row top-space-20">
                        <div class="col-xs-12 text-center">
                            <button type="button" class="btn btn-primary" v-on:click="joinOfflineTable">
                                Play offline
                            </button>
                            <button type="button" class="btn btn-success" v-on:click="joinOnlineTable">
                                Play online
                            </button>
                            <button type="button" class="btn btn-warning" v-on:click="joinBasicStrategyTable">
                                Practice basic strategy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RegisterOnline
                v-if="!gameMode && registeringPlayerOnline"
                :registerPlayerHandler="registerPlayer"
                :cancelRegisterHandler="cancelRegister"
            />
            <LocalTable
                v-if="gameMode === GameModes.local"
                v-on:TableExited="exitTable"
            />
            <RemoteTable
                v-if="gameMode === GameModes.remote"
                v-on:TableExited="exitTable"
                :serverUrl="serverUrl"
                :tableId="onlineTableId"
                :userId="onlineUserId"
            />
            <BasicStrategyTable
                v-if="gameMode === GameModes.basicStrategy"
                v-on:TableExited="exitTable"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { RegisterOnline, RemoteTable, BasicStrategyTable, LocalTable, Loader } from 'webjack-ui-components';
    import { GameModes } from './utils/game-modes';
    import { stallPromise } from './utils/shared';
    import { get } from './utils/http';

    export default {
        components: {
            RegisterOnline,
            RemoteTable,
            BasicStrategyTable,
            LocalTable,
            Loader
        },
        data() {
            return {
                GameModes,
                gameMode: undefined,
                loading: false,
                onlineTableId: undefined,
                onlineUserId: undefined,
                registeringPlayerOnline: false
            };
        },
        computed: {
            serverUrl() {
                return process.env.baseApiUrl;
            }
        },
        created() {
            this.loading = true;
            return stallPromise(get(
                this.serverUrl + '/is-player-registered',
                null,
                {},
                'Error checking whether the player is already registered'))
            .then(data => {
                if (data.playerId) {
                    this.onlineUserId = data.playerId;

                    if (data.tableId) {
                        this.onlineTableId = data.tableId;
                        this.gameMode = GameModes.remote;
                    }
                }
                this.loading = false;
            });
        },
        methods: {
            cancelRegister() {
                this.registeringPlayerOnline = false;
            },
            
            exitTable() {
                this.gameMode = undefined;
            },
            joinBasicStrategyTable() {
                this.gameMode = GameModes.basicStrategy;
            },
            joinOfflineTable() {
                this.gameMode = GameModes.local;
            },
            joinOnlineTable() {
                if (!this.onlineUserId) {
                    this.registeringPlayerOnline = true;
                }
                else {
                    this.gameMode = GameModes.remote;
                }
            },
            registerPlayer(playerName: string) {
                this.loading = true;
                return stallPromise(get(
                    this.serverUrl + '/register-player',
                    { name: playerName },
                    {},
                    'Error registering the player'))
                .then(data => {
                    this.onlineUserId = data.playerId;
                    this.registeringPlayerOnline = false;
                    this.gameMode = GameModes.remote;
                    this.loading = false;
                });
            }
        }
    }
</script>