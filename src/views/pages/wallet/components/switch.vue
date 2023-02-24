<script setup>
    import { ref, defineProps, defineEmits, watch  } from 'vue';

    const emit = defineEmits(['update:checked']);

    const switcher = ref(true);

    const props = defineProps({checked: Boolean});

    watch(switcher, (newValue) => {
        emit('update:checked', newValue);
    })
</script>

<template>
    <div class="switch">
        <button type="button" class="switch__button">
            <span 
                class="switch__text switch__text--plus"
                :class="{active: checked}"
                @click="switcher = !switcher"
                >
                Доход
            </span>
        </button>
        <div class="switch__inner" @click="switcher = !switcher">
            <span 
            class="switch__circle"
            :class="{plus: checked, minus: !checked}"
            ></span>
        </div>
        <button type="button" class="switch__button">
            <span 
                class="switch__text switch__text--minus"
                :class="{active: !checked}"
                @click="switcher = !switcher"
                >
                Расход
            </span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .switch {
        --font-text: 16px;
        --size-circle: 45px;
        --size-line: 80px;
        display: flex;
        align-items: center;
        column-gap: 15px;
        &__text {
            font-size: var(--font-text);
            font-weight: 700;
            color: $gray;
            cursor: pointer;
            @include transition(color, .3s);
            &--plus.active {
                color: $green;
                pointer-events: none;
                cursor: default;
            }
            &--minus.active {
                color: $red;
                pointer-events: none;
                cursor: default;
            }
        }
        &__inner {
            border: 1px solid $gray;
            border-radius: 30px;
            width: var(--size-line);
            height: calc(var(--size-line) / 2);
            cursor: pointer;
        }
        &__circle {
            position: relative;
            display: block;
            width: var(--size-circle);
            height: var(--size-circle);
            border-radius: 50%;
            overflow: hidden;    
            @include transition((transform, background, box-shadow), .3s);
            &:before, &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50%;
                height: 2px;
                background: #fff;
                transform: translate(-50%, -50%);
                @include transition((transform), .3s);
            }
            &.plus {
                background: $green;
                box-shadow: 0px 6px 15px rgba(36, 204, 167, 0.5);
                transform: translate(-10%, -5px);
                &:after {
                    transform: translate(-50%, -50%) rotate(90deg);
                }
            }
            &.minus {
                background: $red;
                box-shadow: 0px 6px 15px rgba(255, 101, 150, 0.5);
                transform: translate(90%, -5px);
            }
        }
    }
    @include min(992px) {
        .switch {
            --font-text: 12px;
            --size-circle: 35px;
            --size-line: 60px;
        }
    }
    @include min(1360px) {
        .switch {
            --font-text: 14px;
            --size-circle: 45px;
            --size-line: 80px;
        }
    }
    @include min(1560px) {
        .switch {
            --font-text: 16px;
        }
    }
</style>