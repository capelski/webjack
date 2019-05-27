<template>
    <div id="app" class="full-height">
        <Menu v-if="!gameMode && !remoteLoading"/>
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
</template>

<script lang="ts">
    import { RemoteTable, BasicStrategyTable, LocalTable } from 'webjack-ui-components';
    import { GameModes } from './game-modes';
    import Menu from './Menu.vue';

    export default {
        components: {
            BasicStrategyTable,
            Menu,
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
        src: url('/fonts/Montserrat-Regular.ttf?$modena=webjack');
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
</style>