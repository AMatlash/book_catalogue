<template>
    <div
        class="bc-input"
    >
        <bc_text
            :class="['bc-input__label', {
                'bc-input__label_like-placeholder': inputText.length === 0
            }]"
        >
            {{ label }}
        </bc_text>
        <input
            v-model="inputText"
            :class="['bc-input__input-field', {
                'bc-input__input-field_error': error
            }]"
            :type="type"
            :maxlength="limit"
            :min="0"
        />
        <div class="bc-input__info-line">
            <div
                class="bc-input__error"
            >
                {{ error }}
            </div>
            <div
                v-if="limit"
                :class="['bc-input__limit', {
                    'bc-input__limit_error': isTextLimitReached
                }]"
            >
                {{ inputText.length }}/{{ limit }}
            </div>
        </div>
    </div>
</template>

<script>
import * as typography from '@typography';

export default {
    name: 'bc_input',
    components: {
        ...typography
    },
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
    computed: {
        isTextLimitReached() {
            return this.limit ? this.inputText.length >= this.limit : false;
        }
    },
    watch: {
        inputText(_old, _new) {
            this.$emit('change', _new);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.bc-input {
    box-sizing: border-box;
    width: 100%;
    min-width: 300px;
    max-width: 600px;
    color: $text-color;
    font-style: normal;
    line-height: 16px;
    transition: all .4s;

    &__label {
        box-sizing: border-box;
        margin: 0 18px;
        font-size: 16px;
        line-height: 24px;
        transition: all .2s;

        &_like-placeholder {
            margin-top: 31px;
            margin-bottom: -31px;
        }
    }

    &__input-field {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 2px;
        padding: 4px 16px;
        color: $text-color;
        font-size: 20px;
        line-height: 20px;
        background: transparent;
        border: 1px solid #0000;
        border-radius: 25px;
        outline: none;
        box-shadow: $element-shadow;
        transition: all .2s;

        &_error {
            box-shadow: $element-shadow-error;
        }
    }

    &__info-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        width: auto;
        margin: 0 18px;
        font-size: 16px;
        line-height: 16px;
        transition: all .2s;
    }

    &__error {
        color: $contrast-color;
        font-weight: bold;
        transition: all .2s;
    }

    &__limit {
        margin-right: 0;
        color: $text-color-disabled;
        transition: margin-right .2s ease;

        &_error {
            margin-right: -8px;
            color: $contrast-color;
            font-weight: bold;
            transition: margin-right .2s cubic-bezier(.17, 1.85, .35, .74), color .2s linear;
        }
    }
}
</style>
