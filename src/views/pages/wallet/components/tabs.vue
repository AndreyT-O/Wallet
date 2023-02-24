<script setup>
    
    import { ref, provide , useSlots } from 'vue';

    import SvgIcon from '@components/SvgIcon.vue';

    const slots = useSlots(),
        buttons = slots.default().map(el => el.props),
        selectItem = ref(buttons[1].title);

    provide('selectItem', selectItem);
</script>

<template>
    <div class="tabs">
        <ul class="tabs__list">
            <li 
                class="tabs__item"
                v-for="({ title, icon }, index) in buttons" :key="index"
                >
                <button 
                    class="tabs__button" 
                    @click="selectItem = title"
                    :class="{active: selectItem === title, 'tabs__button--rates' : index == buttons.length - 1}"
                    >
                    <SvgIcon class="tabs__icon" :name="icon"></SvgIcon>
                    <span class="tabs__text">{{ title }}</span>
                </button>
            </li>
        </ul>
        <slot class="tabs__content"></slot>
    </div>
</template>
    
<style lang="scss">
    .tabs {
        --font-size: 18px;
        --size-icon: 35px;
        &__list {
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 35px;
            margin-bottom: 15px;
        }
        &__button {
            display: flex;
            align-items: center;
            column-gap: 20px;
            padding: 2px;
            border-radius: 5px;
            &.active {
                .tabs {
                    &__icon {
                        fill: $blue;
                    }
                    &__text {
                        color: $blue;
                    }
                }
            }
        }
        &__icon {
            width: var(--size-icon);
            height: var(--size-icon);
            fill: $light-blue;
            @include transition(fill, .3s);
        }
        &__text {
            display: none;
            font-size: var(--font-size);
            font-weight: 700;
            @include transition(color, .3s);
        }
    }
    @include min(768px) {
        .tabs {
            --font-size: 14px;
            position: relative;
            display: flex;
            flex-direction: column;
            &__text {
                display: block;
            }
            &__button--rates {
                display: none;
            }
            &__list {
                position: absolute;
                top: 0;
                left: 0;
            }
            &__content {
                &--rates {
                    display: flex!important;
                    flex-direction: row-reverse;
                    align-items: flex-end;
                    column-gap: 20px;
                    margin-bottom: 40px;
                    .tab__balance  {
                        display: flex;
                    }
                }
                &--statistics, &--main {
                    order: 1;
                }
            }
        }
    }
    @include min(992px) {
        .tabs {
            --font-size: 16px;
            --size-icon: 15px;
            display: grid;
            grid-template-columns: 350px 1fr;
            column-gap: 40px;
            &__list {
                position: static;
                flex-direction: column;
                align-items: flex-start;
                row-gap: 15px;
                width: 100%;
                grid-row: 1;
                grid-column: 1;
            }
            &__content--rates {
                grid-row: 2;
                grid-column: 1;
                flex-direction: column-reverse;
                row-gap: 10px;
            }
            &__content {
                &--main, &--statistics {
                    grid-row: 1 /span 2;
                    grid-column: 2;
                }
                &--rates {
                    row-gap: 30px;
                }
                &--main {
                    .tab__balance {
                        display: none;
                    }
                }
            }
        }
    }
    @include min(1200px) {
        .tabs {
            --font-size: 18px;
            --size-icon: 18px;
            column-gap: 60px;
            &__content--rates {
                row-gap: 40px;
            }
            &__list {
                justify-content: flex-start;
                row-gap: 20px;
                margin-bottom: 30px;
            }
        }
    }

    @include min(1360px) {
        .tabs {
            --font-size: 20px;
            --size-icon: 25px;
        }
    }
</style>