<template>
    <div class="full-height centered main-menu">
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
                    <button type="button" class="btn btn-primary" v-on:click="joinLocalTable">
                        Play offline
                    </button>
                    <button type="button" class="btn btn-success" v-on:click="joinRemoteTable">
                        Play online
                    </button>
                    <button type="button" class="btn btn-warning" v-on:click="joinTrainingTable">
                        Practice basic strategy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Menu',
        methods: {
            joinLocalTable() {
                this.$store.dispatch('joinLocalTable');
            },
            joinRemoteTable() {
                this.$store.dispatch('joinRemoteTable');
            },
            joinTrainingTable() {
                this.$store.dispatch('joinTrainingTable');
            }
        }
    }
</script>

<style>
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