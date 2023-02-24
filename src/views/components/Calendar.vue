<script setup>
    import { ref, defineProps, watch  } from 'vue';
    import { Field, ErrorMessage  } from 'vee-validate';
    import { DatePicker } from 'v-calendar';
    import SvgIcon from '@components/SvgIcon.vue';

    const props = defineProps({
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
    });

    let date = ref('');

</script>
<template>

    <DatePicker class="input-form" v-model="date">
        <template v-slot="{ inputValue, togglePopover }">
            <Field 
                :name="props.name" 
                type="hidden"
                v-model="date"
            />
            <button 
                type="button" 
                class="calendar-form"
                @click="togglePopover()"
            >
                <span class="calendar-form__text" :class="{'active': inputValue}">{{ !!inputValue ? inputValue : props.placeholder }}</span>
                <SvgIcon v-if="props.icon" class="calendar-form__icon" :name="props.icon"></SvgIcon>
            </button>
            <ErrorMessage 
            :name="props.name"
            class="input-form__message message-error"
            ></ErrorMessage>
        </template>
    </DatePicker>
</template>
    
<style lang="scss">
    @import 'v-calendar/dist/style.css';
    .calendar-form {
        --size-icon: 30px;
        --font-text: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 17px;
        &__text {
            font-size: var(--font-text);
            font-weight: 500;
            color: $gray;
            &.active {
                color: #000;
            }
        }
        &__icon {
            width: var(--size-icon);
            height: var(--size-icon);
        }
    }
    @include min(992px) {
        .calendar-form {
            --size-icon: 25px;
            --font-text: 12px;
            padding: 0 12px;
        }
    }
    @include min(1200px) {
        .calendar-form {
            --size-icon: 30px;
            --font-text: 18px;
            padding: 0 17px;
        }
    }
</style>