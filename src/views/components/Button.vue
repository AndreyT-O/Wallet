<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        type: {
            type: String,
            default() {
                return 'button';
            }
        },
        class: {
            type: String
        },
        modify: {
            type: String
        }
    });

</script>
<template>
    <button 
        :type="props.type" 
        :class="[props.class, {'button--outline' : props.modify}]" 
        class="button"
        @click="$emit('onClick')"
        >
        <slot></slot>
    </button>
</template>
    
<style lang="scss">
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        background: $green;
        color: #fff;
        border-radius: 20px;
        text-transform: uppercase;
        &--outline {
            background: #fff;
            color: $blue;
            border: 1px solid $blue;
        }
    }
    @include min(992px) {
        .button {
            font-size: 12px;
            height: 35px;
        }
    }
    @include min(1200px) {
        .button {
            font-size: 14px;
        }
    }
    @include min(1360px) {
        .button {
            font-size: 16px;
            height: 50px;
        }
    }
    @include min(1280px) {
        .button {
            font-size: 18px;
        }
    }
</style>