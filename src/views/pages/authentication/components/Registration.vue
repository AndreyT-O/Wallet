<script setup>
    import SvgIcon from '@components/SvgIcon.vue';
    import Button from '@components/Button.vue';
    import Input from '@components/Input.vue';

    import { Form, Field, ErrorMessage  } from 'vee-validate';
    import * as yup from 'yup';

    const schema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
        name: yup.string().min(3).required()
    });

    function OnSubmit(values) {
        console.log(values);
    }
</script>
<template>
    <div class="modal modal--registration">
        <div class="modal__logo logo">
            <SvgIcon class="logo__icon" name="wallet"></SvgIcon>
            <span class="logo__text">Wallet</span>
        </div>
        <Form 
            class="modal__form"
            :validation-schema="schema"
            @submit="OnSubmit"
            v-slot="error"
            >
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
                    class="modal__input"
                    :class="{'error': !error.valid}"
                    ></Input>
                <Input 
                    type="password" 
                    icon="сastle" 
                    placeholder="Подтвердите пароль"
                    name="confirmPassword" 
                    class="modal__input"
                    :class="{'error': !error.valid}"
                    ></Input>
                <Input 
                    type="text" 
                    icon="account" 
                    placeholder="Ваше имя"
                    name="name" 
                    class="modal__input"
                    :class="{'error': !error.valid}"
                    ></Input>
             </div>
            <div class="modal__actions">
                <Button type="submit" class="modal__button">
                    Регистрация 
                </Button>
                <RouterLink 
                    class="modal__button button button--outline" 
                    to="login">
                    Вход
                </RouterLink>
            </div>
        </Form>
    </div>
</template>
    
<style scoped>
</style>