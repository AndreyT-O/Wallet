<template>
    <div class="balance">
        <span class="balance__text">
            Ваш баланс
        </span>
        <span class="balance__count">
            <span>₴</span> 24 000.00
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .balance {
        --font-size: 12px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        padding: 10px 30px 15px 30px;
        background-color: #fff;
        border-radius: 30px;
        &--only-desktop {
            display: none;
        }
        &__text {
            font-size: var(--font-size);
            color: $gray;
            text-transform: uppercase;
        }
        &__count {
            font-size: calc(var(--font-size) + 18px);
            font-weight: 700;
            span {
                font-weight: 400;
            }
        }
    }
    @include min(768px) {
        .balance {
            margin: 0;
            &--only-desktop {
                display: flex;
            }
            &--only-mobile {
                display: none;
            }
        }
    }
</style>