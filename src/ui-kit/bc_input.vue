<template>
    <div
        class="bc-input"
    >
        <div
            :class="['bc-input__label', {
                'bc-input__label_like-placeholder': inputText.length === 0
            }]"
        >
            {{ label }}
        </div>
        <input
            v-model="inputText"
            class="bc-input__input-field"
            :type="type"
            :maxlength="limit"
            :min="0"
        />
        <div class="bc-input__info">
            <div
                class="bc-input__info__error"
            >
                {{ error }}
            </div>
            <div
                v-if="limit"
                class="bc-input__info__limit"
            >
                {{ inputText.length }}/{{ limit }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bc_input',
    model: {
        prop: 'text',
        event: 'change'
    },
    props: {
        label: String,
        text: String,
        error: String,
        limit: Number,
        type: {
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            inputText: ''
        };
    },
    watch: {
        inputText(_old, _new) {
            this.$emit('change', _new);
        }
    }
};
</script>

<style lang="scss">
@import '@styles';

.bc-input {
    box-sizing: border-box;
    width: 100%;
    min-width: 300px;
    max-width: 600px;
    color: $text-color;
    font-size: 16px;
    font-style: normal;
    line-height: 16px;
    transition: all .4s;

    &__label {
        box-sizing: border-box;
        margin: 0 18px;
        transition: all .2s;

        &_like-placeholder {
            margin-top: 28px;
            margin-bottom: -28px;
        }
    }

    &__input-field {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 2px;
        padding: 4px 16px;
        font-size: 20px;
        line-height: 20px;
        background: transparent;
        border: 1px solid #0000;
        border-radius: 25px;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    }

    &__info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        width: auto;
        margin: 0 18px;
        font-size: 16px;
        line-height: 16px;

        &__error {
            color: $contrast-color;
        }

        &__limit {
            color: $text-color-disabled;
        }
    }
}
</style>
