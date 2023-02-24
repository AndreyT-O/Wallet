<script setup>
    
    import { ref, defineProps } from 'vue';

    import { Field, ErrorMessage  } from 'vee-validate';

    import vSelect from 'vue-select';

    import OpenIndicator from './OpenIndicator.vue';

    let props = defineProps({
        class: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: 'Выберите категорию'
        }
    }),
    options = ref(['foo', 'bar', 'baz']);
    
    vSelect.props.components.default = () => ({ OpenIndicator });

    function dropdownShouldOpen(VueSelect) {
        return VueSelect.open;
    }
</script>

<template>
   <label class="input-form" :class="props.class">
        <Field 
            :name="props.name" 
            v-slot="{ field }"
            >
            <v-select 
            :name="props.name" 
            class="input-form__select select-form" 
            :placeholder="placeholder"
            :options="options"
            v-bind="field"
            ></v-select>
        </Field>
        <ErrorMessage 
        :name="props.name"
        class="input-form__message message-error"
        ></ErrorMessage>
   </label>
</template>

<style lang="scss">
    @import 'vue-select/dist/vue-select.css';
    .select-form {
        --font-text: 18px;
        --size-arrow: 20px;
        width: 100%;
        &.v-select {
            .vs {
                &__selected-options {
                    padding-left: 10px;
                }
                &__dropdown-toggle {
                    padding: 0;
                    border: none;
                    border-bottom: none;
                    border-radius: 0;
                }
                &__clear {
                    display: none;
                }
                &__selected, &__search {
                    font-size: var(--font-text);
                }
                &__open-indicator {
                    width: var(--size-arrow);
                    height: var(--size-arrow);
                }
                &__search {
                    &::placeholder {
                        color: $gray;
                        font-weight: 400;
                    }
                }
                &__dropdown-menu {
                    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
                        background-color: rgba(255, 255, 255, .5);
                        backdrop-filter: blur(12px);
                    }
                    border: none;

                }
                &__dropdown-option {
                    font-size: var(--font-text);
                    height: 45px;
                    &--highlight {
                        background: none;
                        color: $blue;
                    }
                }
            }
        }
    }
</style>