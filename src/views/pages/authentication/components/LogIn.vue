<script setup>
    import SvgIcon from '@components/SvgIcon.vue';
    import Button from '@components/Button.vue';
    import Input from '@components/Input.vue';

    import { RouterLink } from 'vue-router';
    import { Form } from 'vee-validate';
    import * as yup from 'yup';

    const schema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
    });
    
    function OnSubmit(values) {
        console.log(values);
    }
</script>
<template>
    <div class="modal modal--login">
        <div class="modal__logo logo">
            <SvgIcon class="logo__icon" name="wallet"></SvgIcon>
            <span class="logo__text">Wallet</span>
        </div>
        <Form @submit="OnSubmit" :validation-schema="schema" v-slot="error">
            <div class="modal__wrapper">
                <Input 
                    type="email" 
                    icon="email" 
                    placeholder="E-mail" 
                    name="email"
                    class="modal__input"
                    :class="{'error': !error.valid}"
                    ></Input>
                <Input 
                    type="password" 
                    icon="сastle" 
                    placeholder="Пароль"
                    name="password" 
                    class="modal__input"></Input>
            </div>
            <div class="modal__actions">
                <Button type="submit" class="modal__button">
                    Вход
                </Button>
                <RouterLink 
                    class="modal__button button button--outline" 
                    to="registration">
                    Регистрация
                </RouterLink>
            </div>
        </Form>
    </div>
</template>
    
<style scoped>
</style>