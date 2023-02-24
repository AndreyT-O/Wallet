<script setup>
    import { useCoursesStore } from '@/stores/courses';
    import SvgIcon from '@components/SvgIcon.vue';

    const data = useCoursesStore();
</script>
<template>
    <div class="courses">
        <table class="courses__table">
            <thead>
                <tr class="courses__row courses__row--head">
                    <th class="courses__title">Валюта</th>
                    <th class="courses__title">Покупка</th>
                    <th class="courses__title">Продажа</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    class="courses__row" 
                    :class="{'courses__row--last' : index === Object.keys(data.courses).length - 1}" 
                    v-for="(value, key, index) in data.courses"
                    :key="index"
                    >
                    <td class="courses__item">
                        {{key}}
                    </td>
                    <td class="courses__item">
                        {{value.sell}}
                    </td>
                    <td class="courses__item">
                        {{value.buy}}
                    </td>
                </tr>
            </tbody>
        </table>
        <SvgIcon class="courses__icon" name="wave"></SvgIcon>
    </div>
</template>

<style lang="scss" scoped>
    .courses {
        --font-text: 12px;
        position: relative;
        width: 100%;
        background-color: $blue;
        border-radius: 30px;
        overflow: hidden;
        &__table {
            width: 100%;
        }
        &__row {
            color: #fff;
            &--head {
                background-color: $light-blue;    
            }
            &--last {
                td {
                    padding-bottom: 20px;
                }
            }
        }
        &__item {
            padding: 15px 20px 0 20px;
            font-size: var(--font-text);
        }
        &__title {
            padding: 10px 20px;
            text-align: left;
            font-size: calc(var(--font-text) + 2px);
        }
        &__item {
            position: relative;
            z-index: 1;
        }
        &__icon {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    @include min(380px) {
        .courses {
            --font-text: 16px;
            width: 335px;
            margin-left: auto;
            margin-right: auto;
            &__icon {
                height: 80%;
            }
        }
    }
    @include min(768px) {
        .courses {
            &__title {
                padding: 15px 20px;
            }
        }
    }
    @include min(992px) {
        .courses {
            --font-text: 14px;
            --height: 340px;
            height: var(--height);
            width: 100%;
            &__icon {
                bottom: -10px;
                height: 135px;
            }
        }
    }
    @include min(1360px) {
        .courses{
            --height: 360px;
            &__item {
                --font-text: 16px;
                padding: 20px 20px 0 20px;
            }
            &__title {
                padding: 20px;
            }
        }
    }
</style>