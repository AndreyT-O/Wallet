<script setup>
    import { computed } from 'vue';
    import { useTransfersMoney } from '@/stores/transfers_money';

    const data = useTransfersMoney();

</script>

<template>
    <table class="table">
        <thead>
            <tr class="table__row table__row--thead">
                <td class="table__column">
                    <span class="table__subtitle">Дата</span>
                </td>
                <td class="table__column table__column--center">
                    <span class="table__subtitle">Тип</span>
                </td>
                <td class="table__column table__column--long">
                    <span class="table__subtitle">Категорія</span>
                </td>
                <td class="table__column table__column--long">
                    <span class="table__subtitle">Коментарій</span>
                </td>
                <td class="table__column table__column--right">
                    <span class="table__subtitle">Сумма</span>
                </td>
                <td class="table__column table__column--right">
                    <span class="table__subtitle">Баланс</span>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr 
                class="table__row"
                :class="{profit: item.type === '+', spend: item.type === '-'}"
                v-for="(item, index) in data.transfersMoney" 
                :key="index"
                >
                <td class="table__column table__column--left">
                    <span class="table__subtitle">Дата</span>
                    <span class="table__value">{{ item.date }}</span>
                </td>
                <td class="table__column table__column--center">
                    <span class="table__subtitle">Тип</span>
                    <span class="table__value">{{ item.type }}</span>
                </td>
                <td class="table__column table__column--long">
                    <span class="table__subtitle">Категорія</span>
                    <span class="table__value">{{ item.category }}</span>
                </td>
                <td class="table__column table__column--long">
                    <span class="table__subtitle">Коментарій</span>
                    <span class="table__value">{{ item.comment }}</span>
                </td>
                <td class="table__column table__column--right">
                    <span class="table__subtitle">Сумма</span>
                    <span class="table__value table__value--amount">{{ item.amount }}</span>
                </td>
                <td class="table__column table__column--right">
                    <span class="table__subtitle">Баланс</span>
                    <span class="table__value">{{ item.balance }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
    .table {
        --font-size: 16px;
        width: 100%;
        &__column {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            border-bottom: 1px solid #DCDCDF;
        }
        &__row {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 10px;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 5px;
                    background-color: #fff;
                }
            &.profit {
                &:before {
                    background-color: $green;
                }
                .table__value--amount {
                    color: $green;
                    font-weight: 700;
                }
            }
            &.spend {
                &:before {
                    background-color: $red;
                }
                .table__value--amount {
                    color: $red;
                    font-weight: 700;
                }
            }
            &--thead {
                display: none;
            }
        }
        &__subtitle {
            font-weight: 700;
            font-size: calc(var(--font-size) + 2px);
        }
        &__value {
            font-size: var(--font-size);
            line-height: 1.2;
        }
    }
    @include min(768px) {
        .table {
            --grid-columns: 90px 60px 1fr 1fr 120px 120px;
            &__row {
                display: grid;
                grid-template-columns: var(--grid-columns);
                margin: 0;
                padding: 0 20px;
                background-color: inherit;
                border-radius: 0;
                border-bottom: 1px solid #DCDCDF;
                &:before {
                    display: none;
                }
                &--thead {
                    display: grid;
                    background-color: #fff;
                    border-radius: 30px;
                    overflow: hidden;
                    .table__subtitle {
                        display: block;
                    }
                }
            }
            &__column {
                display: flex;
                padding: 15px 0;
                border-bottom: 0;
                width: 100%;
                &--center {
                    justify-content: center;
                }
                &--left {
                    justify-content: left;
                }
                &--right {
                    justify-content: right;
                }
                &--long {
                    padding-left: 40px;
                }
            }
            &__subtitle {
                display: none;
            }
        }
    }
    @include min(992px) {
        .table {
            --font-size: 12px;
            --grid-columns: 60px 50px 1fr 1fr 80px 80px;
        }
    }
    @include min(1200px) {
        .table {
            --font-size: 16px;
            --grid-columns: 80px 70px 1fr 1fr 120px 120px;
        }
    }
    @include min(1560px) {
        .table {
            --grid-columns: 90px 60px 1fr 1fr 120px 120px;
        }
    }
</style>