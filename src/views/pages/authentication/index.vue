<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    import SvgIcon from '@components/SvgIcon.vue';
    import LogIn from './components/LogIn.vue';
    import Registration from './components/Registration.vue';

    const route = useRoute(),
        iconName = ref('login');

</script>
<template>
    <div class="authentication">
        <div class="authentication__inner">
            <SvgIcon class="authentication__icon" :name="route.name"></SvgIcon>
            <h1 class="authentication__title">
                Finance App
            </h1>
        </div>
        <div class="authentication__box">
            <Transition name="fade">
                <LogIn class="authentication__modal" v-if="route.name == 'login'"></LogIn>
                <Registration class="authentication__modal" v-else></Registration>
            </Transition>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
    @import '@scss/helpers/mixins.scss';

    .authentication {
        --font-size: 30px;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 50px;
        height: 100vh;
        &__inner {
            position: relative;
            display: none;
            align-items: center;
            justify-content: center;
            column-gap: 40px;
            margin-top: 60px;
        }
        &__title {
            white-space: nowrap;
            font-size: var(--font-size);
            line-height: 1.2;
            font-weight: 400;
        }
        &__icon {
            width: 260px;
            height: 250px;
        }
        &__modal {
            position: absolute;
            top: 0;
            left: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            transform: translateX(-50%);
            &.fade-enter-active,
            &.fade-leave-active {
            transition: all 0.25s ease-out;
            }

            &.fade-enter-from {
                opacity: 0;
                transform: translate(100px, 0);
            }

            &.fade-leave-to {
                opacity: 0;
                transform: translate(-100px, 0);
            }
        }
        &__box {
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            height: 100%;
            width: 100%;
            background-color: #fff;
        }
    }

    @include min(768px) {
        .authentication {
            &__inner {
                display: flex;
            }
            &__box {
                background-color: inherit;
            }
            &__modal {
                width: 540px;
                height: auto;
                border-radius: 20px;
                &.fade-enter-from {
                    opacity: 0;
                    transform: translate(-50%, 0);
                }

                &.fade-leave-to {
                    opacity: 0;
                    transform: translate(-50%, 0);
                }
            }
        }       
    }

    @include min(1280px) {
        body {
            background: $background;
        }
        .authentication {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            &__inner {
                flex-direction: column;
                align-items: center;
                row-gap: 30px;
                width: 40%;
            }
            &__icon {
                width: 435px;
                height: 420px;
            }
            &__modal {
                top: 50%;
                transform: translate(-50%, -50%);

                &.fade-enter-from {
                    transform: translate(100px, -50%);
                }

                &.fade-leave-to {
                    transform: translate(-100px, -50%);
                }
            }
            &__box {
                align-items: center;
                width: 60%;
                height: 100%;
                overflow: hidden;
                @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
                    background-color: rgba(255, 255, 255, .4);
                    backdrop-filter: blur(5px);
                }
            }
        }
    }
</style>