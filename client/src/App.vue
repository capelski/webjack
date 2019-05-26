<template>
    <div id="app" class="full-height">
        <div class="full-height">
            <!-- TODO Create a Home component -->
            <div class="main-menu full-height centered" v-if="!gameMode && !remoteLoading">
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
            <BasicStrategyTable
                :renderCondition="gameMode === GameModes.basicStrategy"
                v-on:TableExited="exitTable"
            />
            <LocalTable
                :renderCondition="gameMode === GameModes.local"
                v-on:TableExited="exitTable"
            />
            <RemoteTable
                :serverUrl="serverUrl"
                :renderCondition="gameMode === GameModes.remote"
                v-on:LoadingStarted="setLoading"
                v-on:LoadingFinished="unsetLoading"
                v-on:TableJoined="joinOnlineTable"
                v-on:TableExited="exitTable"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { RemoteTable, BasicStrategyTable, LocalTable } from 'webjack-ui-components';
    import { GameModes } from './game-modes';

    export default {
        components: {
            BasicStrategyTable,
            LocalTable,
            RemoteTable
        },
        data() {
            return {
                GameModes,
                remoteLoading: true
            };
        },
        computed: {
            gameMode() {
                return this.$store.state.gameMode;
            },
            serverUrl() {
                return process.env.baseApiUrl;
            }
        },
        methods: {
            exitTable()  {
                this.$store.dispatch('exitTable');
            },
            joinBasicStrategyTable() {
                this.$store.dispatch('joinBasicStrategyTable');
            },
            joinOfflineTable() {
                this.$store.dispatch('joinOfflineTable');
            },
            joinOnlineTable() {
                this.$store.dispatch('joinOnlineTable');
            },
            setLoading() {
                this.remoteLoading = true;
            },
            unsetLoading() {
                this.remoteLoading = false;
            }
        }
    }
</script>

<style>
    @font-face {
        font-family: 'Montserrat';
        src: url('/static/fonts/Montserrat-Regular.ttf?$modena=webjack');
    }

    html, body {
        height: 100%;
        background-color: #088446;
        color: #EEDC82;
        font-family: 'Montserrat', sans-serif;
    }

    .full-height {
        height: 100%;
    }

    .centered {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .top-space-20 {
        margin-top: 20px;
    }

    .main-menu .title {
        font-size: 75px;
    }

    .main-menu .subtitle {
        font-size: 20px;
    }

    .main-menu .btn {
        margin-top: 10px;
    }
</style>