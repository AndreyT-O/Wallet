<script setup>
    
    import SvgIcon from '@components/SvgIcon.vue';

    // import { ref, provide } from 'vue';

    // const activeModal = ref(false);

    // function modalHandle() {
    //     console.log(1223);
    //     activeModal.value = !activeModal;
    // }

    // provide('message', 'hello');
</script>
<template>
    <header class="header" id="header">
        <div class="header__container container">
            <div class="header__logo logo">
                <SvgIcon class="logo__icon" name="wallet"></SvgIcon>
                <span class="logo__text">
                    Wallet
                </span>
            </div>
            <div class="header__inner">
                <span class="header__text header__text--user">
                    Имя
                </span>
                <button type="button" class="header__button">
                    <span class="header__text">Выйти</span>
                    <SvgIcon class="header__icon" name="logout"></SvgIcon>
                </button>
            </div>
        </div>
    </header>
    <main class="main">
        <div class="main__container container">
            <slot></slot>
        </div>
    </main>
</template>

<style lang="scss">
    body {
        background: $background;
    }
    .header {
        --size-icon: 18px;
        --font-text: 18px;
        background: #fff;
        &.fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1;
        }
        &__container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 15px;
            padding-bottom: 15px;
        }
        &__text {
            font-size: var(--font-text);
            color: #929090;
        }
        &__button {
            display: flex;
            align-items: center;
            column-gap: 10px;
            .header__text {
                display: none;
            }
        }
        &__icon {
            width: var(--size-icon);
            height: var(--size-icon);
        }
        &__inner {
            display: flex;
            align-items: center;
            column-gap: 10px;
        }
    }
    .main {
        padding-top: 10px;
    }
    @include min(480px) {
        .header {
            &.fixed {
                position: static;
            }
            &__button {
                border-left: 1px solid $gray;
                .header__text {
                    display: block;
                }
            }
            &__inner {
                column-gap: 15px;
            }
            &__button {
                flex-direction: row-reverse;
                padding-left: 15px;
            }
        }
        .main {
            padding-top: 20px;
        }
    }
    @include min(768px) {
        .header {
            position: relative;
            z-index: 1;
        }
        .main {
            position: relative;
            padding-top: 45px;
            &:before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(255, 255, 255, 0.4);
                backdrop-filter: blur(25px);
            }
        }
    }
    @include min(992px) {
        .header {
            --size-icon: 15px;
            --font-text: 12px;
        }
    }
    @include min(1200px) {
        .header {
            --font-text: 16px;
        }
    }
    @include min(1360px) {
        .header {
            --size-icon: 18px;
            --font-text: 18px;
        }
    }
</style>