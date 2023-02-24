<script setup>
    import { ref, watch } from 'vue';
    import { Form } from 'vee-validate';    
    import * as yup from 'yup';

    import Select from '@components/Select.vue';
    import Input from '@components/Input.vue';
    import Calendar from '@components/Calendar.vue';
    import Button from '@components/Button.vue';
    import Switch from '../components/switch.vue';
   
    const schema = yup.object({
        count: yup.string().required().min(1),
        comment: yup.string().required().min(8),
        calendar: yup.string().required().typeError('you must specify a number'),
        select: yup.string().required()
    });

    const count = ref(0),
        switcher = ref(true),
        modalShow = ref(false);
    
    function OnSubmit(values) {
        console.log(values);
    }

    watch(modalShow, newValue => {
        if(newValue) {
            header.classList.add('fixed');
            document.documentElement.style.overflow = 'hidden';
        } else {
            header.classList.remove('fixed');   
            document.documentElement.style.overflow = 'auto'; 
        }
    })

    function handleScroll() {

    }
</script>

<template>
    <Transition name="modal">
        <div 
            class="transaction" 
            v-if="modalShow"
            @click="modalShow = !modalShow"
            >
            <Form 
                @submit="OnSubmit" 
                class="transaction__content"
                :validation-schema="schema" 
                v-slot="error"
                @click="e => e.stopPropagation()">
                <button type="button" @click="modalShow = !modalShow" class="transaction__close"></button>
                <h2 class="transaction__title">Добавить транзакцию</h2>
                <Switch 
                    v-model:checked="switcher"
                    class="transaction__switcher"
                    />
                <div class="transaction__inner">
                    <Transition name="select">
                        <Select 
                            class="transaction__select" 
                            name="select"
                            v-if="!switcher" 
                        />
                    </Transition>
                    <Input
                        type="text"
                        placeholder="0"
                        v-model.number="count"
                        name="count"
                        class="transaction__count"
                    />
                    <Input
                        textarea=true
                        placeholder="Комментарий"
                        v-model="textarea"
                        name="comment"
                        class="transaction__comment"
                    />
                    <Calendar 
                        name="calendar" 
                        placeholder="01.01.2001" 
                        icon="calendar"           
                        class="transaction__calendar" 
                    />
                </div>
                <div class="transaction__actions">
                    <Button type="submit" class="transaction__button">
                        Вход
                    </Button>
                    <Button 
                        type="button"
                        class="transaction__button button button--outline"
                        @click="modalShow = !modalShow"
                        >
                        Отмена
                    </Button>
                </div>
            </Form>
        </div>
    </Transition>
    <button 
        type="button" 
        class="button-modals"
        @click="modalShow = !modalShow"
        ></button>
</template>

<style lang="scss" scoped>
    .transaction {
        --font-title: 24px;
        --size-close: 30px;
        position: fixed;
        top: 58px;
        left: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.25);
        overflow: scroll;
        z-index: 1;
        @include transition(opacity, .3s);
        &__content {
            position: relative;
            height: calc(100% - 60px);
            padding: 20px;
            background: #fff;
            overflow: scroll;
        }
        &__content, &__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        &__select {
            width: 100%;
            height: var(--height);
        }
        &__title {
            display: block;
            margin-bottom: 40px;
            font-size: var(--font-title);
            font-weight: 600;
        }
        &__actions {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            width: 100%;
        }
        &__switcher {
            margin-bottom: 30px;
        }
        &__close {
            position: absolute;
            top: 20px;
            right: 20px;
            display: none;
            width: var(--size-close);
            height: var(--size-close);
            &:before, &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50%;
                height: 50%;
                width: 100%;
                height: 1px;
                background: #000;
                border-radius: 10px;
            }
            &:before {
                transform: translate(-50%, -50%) rotate(45deg);
            }
            &:after {
                transform: translate(-50%, -50%) rotate(-45deg);
            }
        }
    }
    .button-modals {
        --size-button: 45px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size-button);
        height: var(--size-button);
        border-radius: 50%;
        background: $green;
        box-shadow: 0px 6px 15px rgba(36, 204, 167, 0.5);
        opacity: 1;
        overflow: hidden;
        &:before, &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40%;
            height: 2px;
            background: #fff;
            border-right: 10px;
            transform: translate(-50%, -50%);
        }
        &:before {
            transform: translate(-50%, -50%) rotate(90deg);
        }
    }
    .select {
        &-enter-active,
        &-leave-active {
            @include transition((height, opacity, padding), .3s);
        }
    
        &-enter-from,
        &-leave-to {
            height: 0;
            opacity: 0;
            padding: 0;
            margin: 0;
        }
    }
    .modal {
        &-enter-active,
        &-leave-active {
            transition: all 0.3s ease-out;
        }
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }

    @include min(480px) {
        .transaction {
            --width-content: 400px;
            top: 0;
            align-items: center;
            &__content {
                width: var(--width-content);
                height: auto;
                border-radius: 10px;
            }
            &__close {
                display: block;
                top: 10px;
                right: 10px;
            }
        }
    }
    @include min(768px) {
        .transaction {
            --width-content: 540px;
            --width-button: 300px;
            &__content {
                padding: 40px 60px 30px 60px;
            }
            &__inner {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 20px;
                row-gap: 20px;
            }
            &__close {
                top: 20px;
                right: 20px;
            }
            &__select {
                grid-row: 1;
                grid-column: 1 / span 2;
            }
            &__count {
                grid-row: 2;
                grid-column: 1;
                height: 100%;
            }
            &__calendar {
                grid-row: 2;
                grid-column: 2;
            }
            &__comment {
                grid-row: 3;
                grid-column: 1 / span 2;
            }
            &__count, &__calendar, &__select {
                margin: 0;
            }
            &__actions {
                align-items: center;
            }
            &__button {
                max-width: var(--width-button);
            }
        }
    }
    @include min(992px) {
        .transaction {
            --font-title: 18px;
            --width-content: 450px;
            --width-button: 250px;
            &__content {
                padding: 20px 40px 20px 40px;
                overflow: hidden;
            }
            &__close {
                cursor: pointer;
                &:before, &:after {
                    @include transition((background, transform), .3s);
                }
                &:hover {
                    &:before, &:after {
                        background: $green;
                    }
                    &:before {
                        transform: translate(-50%, -50%) rotate(-45deg);
                    }
                    &:after {
                        transform: translate(-50%, -50%) rotate(45deg);
                    }
                }
            }
        }
        .button-modals {
            &:before, &:after {
                @include transition(transform, .7s);
            }
            &:hover {
                &:before {
                    transform: translate(-50%, -50%) rotate(270deg);
                }
                &:after {
                    transform: translate(-50%, -50%) rotate(180deg);
                }
            }
        }
    }
    @include min(1200px) {
        .transaction {
            --font-title: 20px;
            --width-content: 540px;
            &__content {
                padding: 40px 80px 60px 80px;
            }
        }
    }
    @include min(1360px) {
        .transaction {
            --font-title: 22px;
            --width-button: 300px;
        }
    }
    @include min(1560px) {
        .transaction {
            --font-title: 24px;
        }
    }
</style>