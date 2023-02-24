<script setup>
    import { defineProps } from 'vue';
    import { Field, ErrorMessage  } from 'vee-validate';

    import SvgIcon from '@components/SvgIcon.vue';

    const props = defineProps({
        type: {
            type: String,
            default() {
                return 'text';
            }
        },
        icon: {
            type: String
        },
        placeholder: {
            type: String
        },
        name: {
            type: String, 
            required: true
        },
        rules: {
            type: String,
        },
        textarea: {
            type: Boolean
        }
    });
</script>
<template>
    <label v-if="!props.textarea" class="input-form" :class="{'input-form--only-input': !props.icon}">
        <SvgIcon v-if="props.icon" class="input-form__icon" :name="props.icon"></SvgIcon>
        <Field 
            :name="props.name" 
            :type="props.type"
            class="input-form__input"
            :placeholder="props.placeholder"
            />
        <ErrorMessage 
        :name="props.name"
        class="input-form__message message-error"
        ></ErrorMessage>
    </label>
    <label v-else class="input-form input-form--textarea input-form--only-input">
        <Field 
            :name="props.name" 
            as="textarea"
            class="input-form__input"
            :placeholder="props.placeholder"
            />
        <ErrorMessage 
        :name="props.name"
        class="input-form__message message-error"
        ></ErrorMessage>
    </label>
</template>
    
<style lang="scss">
    .input-form {
        --size-icon: 24px;
        --height-textarea: 80px;
        --font-text: 18px;
        position: relative;
        display: flex;
        align-items: flex-end;
        column-gap: 20px;
        padding: 10px 0;
        width: 100%;
        margin-bottom: 30px;
        border-bottom: 1px solid $gray;
        &--textarea {
            .input-form__input {
                height: var(--height-textarea);
                resize: none;
            }
        }
        &--only-input {
            padding-left: 17px;
        }
        &__icon {
            width: var(--size-icon);
            height: var(--size-icon);
            fill: $gray;
        }
        &__input {
            position: relative;
            display: block;
            width: 100%;
            font-size: var(--font-text);
            &::placeholder {
                color: $gray;
                font-size: inherit;
            }
        }
    }
    @include min(992px) {
        .input-form {
            --font-text: 12px;
            padding: 5px 0;
            cursor: pointer;
        }
    }
    @include min(1200px) {
        .input-form {
            --font-text: 14px;
        }
    }
    @include min(1360px) {
        .input-form {
            --font-text: 16px;
            padding: 10px 0;
        }
    }
    @include min(156px) {
        .input-form {
            --font-text: 18px;
        }
    }
</style>