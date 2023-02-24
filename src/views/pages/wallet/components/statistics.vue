<script setup>
    import { ref } from 'vue';
    import { DoughnutChart } from 'vue-chart-3';
    import { Chart, registerables } from "chart.js";

    import { storeToRefs } from 'pinia';
    import { useCategoryStore } from '@/stores/category';

    import Select from '@components/Select.vue';
    Chart.register(...registerables);
    
    const data = useCategoryStore(),
    { category, total } = storeToRefs(data);

    let interest = [],
        colors = [];

    category.value.map(el => {
        interest.push(el.count * 100 / total.value);
        colors.push(el.color);
    });
    
    const testData = ref({
        datasets: [
            {
                data: interest,
                backgroundColor: colors,
            },
        ],
    });

    
</script>
<template>
    <div class="statictics">
        <h1 class="statictics__title">Статистика</h1>
        <div class="statictics__wrapper">
            <div class="statictics__circle">
                <DoughnutChart :chartData="testData" />
            </div>
            <div class="statictics__box">
                <div class="statictics__inner">
                    <Select 
                        class="statictics__select"
                        placeholder="Месяц"
                        name="select"
                    /> 
                    <Select 
                        class="statictics__select" 
                        placeholder="Год"
                        name="select"
                    />  
                </div>
                <ul class="statictics__history history-category">
                    <li class="history-category__header">
                        <span class="history-category__subtitle">Категория</span>
                        <span class="history-category__subtitle">Сумма</span>
                    </li>
                    <li 
                        class="history-category__item"
                        v-for="(item, index) in category"
                        :key="index"
                        >
                        <div class="history-category__category">
                            <span class="history-category__color" :style="{'--color': item.color}"></span>
                            <span class="history-category__name">{{ item.text }}</span>
                        </div>
                        <span class="history-category__count">{{ item.count }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .statictics {
        --font-title: 30px;
        --font-text: 16px;
        --size-color: 25px;
        // --vs-search-input-placeholder-color: red;
        &__title {
            display: block;
            margin-bottom: 10px;
            font-size: var(--font-title);
            font-weight: 400;
        }
        &__inner {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            margin-bottom: 20px;
        }
        &__select {
            border: 1px solid #000;
            border-radius: 30px;
            padding: 10px 20px;
            margin: 0;
            .select-form.v-select .vs__selected-options {
                padding-left: 0;
            }
        }
        &__circle {
            width: 100%;
            border: 1px solid;
        }
        .history-category {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            &__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                background: #fff;
                border-radius: 30px;
            }
            &__item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px 10px 20px;
                border-bottom: 1px solid #DCDCDF;
            }
            &__body {
                display: flex;
                flex-direction: column;
                row-gap: 20px;
            }
            &__category {
                display: flex;
                align-items: center;
                column-gap: 15px;
            }
            &__color {
                width: var(--size-color);
                height: var(--size-color);
                border-radius: 2px;
                background-color: var(--color);
            }
            &__subtitle {
                font-size: calc(var(--font-text) + 2px);
                font-weight: 700;
            }
            &__name, &__count {
                font-size: var(--font-text);
            }
        }
    }
    @include min(768px) {
        .statictics {
            &__wrapper {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: space-between;
                column-gap: 35px;
            }
            &__inner {
                flex-direction: row;
                row-gap: 0;
                column-gap: 10px;
                margin-bottom: 20px;
            }
            &__box {
                flex-shrink: 0;
                width: 350px;
            }
        }
    }
    @include min(992px) {
        .statictics {
            --font-title: 20px;
            &__box {
                width: 300px;
            }
        }
    }
    @include min(1200px) {
        .statictics {
            --font-title: 25px;
            &__box {
                width: 320px;
            }
        }
    }
    @include min(1360px) {
        .statictics {
            --font-title: 30px;
            &__box {
                width: 350px;
            }
        }
    }
</style>