<script setup>
    import { inject, defineProps, watch } from 'vue';

    const selectItem = inject('selectItem'),
        props = defineProps({
            title: String
        });
</script>

<template>
    <div 
        class="tab" 
        v-show="selectItem === props.title">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .tab {
        &__balance {
            margin-bottom: 30px;
        }
    }
    @include min(768px) {
        .tab {
            &__balance {
                width: 100%;
                margin-bottom: 30px;
            }
            &__courses {
                flex-shrink: 0;
            }
        }
    }
</style>