<template>
    <div
        class="bc-input"
    >
        <div
            :class="['bc-input__label', {
                'bc-input__label_like-placeholder': (inputText.length === 0) && type !== 'date'
            }]"
        >
            <bc_text
                class="bc-input__label_main"
            >
                {{ label }}
            </bc_text>
            <bc_text
                v-if="important"
                class="bc-input__label_important"
            >
                *
            </bc_text>
        </div>
        <textarea
            v-model="inputText"
            v-if="multiline"
            :class="[
                'bc-input__input-field',
                'bc-input__input-field_multiline', {
                    'bc-input__input-field_error': error
                }
            ]"
            :maxlength="limit"
        />
        <input
            v-model="inputText"
            v-else
            :class="['bc-input__input-field', {
                'bc-input__input-field_error': error
            }]"
            :type="type"
            :maxlength="limit"
            :min="min || 0"
            :max="max"
        />
        <div class="bc-input__info-line">
            <div
                class="bc-input__error"
            >
                {{ externalError }}
            </div>
            <div
                :class="['bc-input__limit', {
                    'bc-input__limit_error': type === 'text' ? isTextLimitReached : error
                }]"
            >
                {{ inputInfo }}
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
        prop: 'value',
        event: 'change'
    },
    props: {
        name: String,
        label: String,
        value: String,
        externalError: String,
        limit: Number,
        max: String,
        min: String,
        info: String,
        multiline: Boolean,
        important: Boolean,
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
        error() {
            const {
                externalError,
                inputText,
                min,
                max,
                type
            } = this;
            if (externalError) {
                return externalError;
            }
            if (inputText) {
                switch (type) {
                    case 'date':
                        let inputDate = new Date(inputText);
                        let minDate = new Date(min);
                        let maxDate = new Date(max);
                        if (min && inputDate < minDate) {
                            return true;
                        }
                        if (max && inputDate > maxDate) {
                            return true;
                        }
                        break;
                    case 'number':
                        let number = Number(inputText);
                        if (min && number < min) {
                            return true;
                        }
                        if (max && number > max) {
                            return true;
                        }
                        break;
                }
            }
            return null;
        },
        isTextLimitReached() {
            if (this.limit) {
                if (this.type === 'text') {
                    return this.inputText.length >= this.limit;
                }
            }
            return false;
        },
        inputInfo() {
            if (this.info) {
                return this.info;
            }
            if (this.limit) {
                return String(`${this.inputText.length} / ${this.limit}`);
            }
            return '';
        }
    },
    watch: {
        inputText(_new, _old) {
            this.$emit('change', _new);
        },
        value(_new, _old) {
            this.inputText = _new;
        },
        error(_new, _old) {
            this.$emit('errorChange', this.name, _new);
        }
    },
    created() {
        this.inputText = this.value || '';
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.bc-input {
    box-sizing: border-box;
    width: 100%;
    min-width: 200px;
    max-width: 600px;
    color: $text-color;
    font-style: normal;
    line-height: 16px;
    transition: all .4s;

    &__label {
        //box-sizing: border-box;
        display: flex;
        flex-direction: row;
        margin: 0 18px;
        transition: all .2s;
        pointer-events: none;

        &_like-placeholder {
            margin-top: 28px;
            margin-bottom: -28px;
            color: $text-color-disabled;
        }

        &_main {
            font-size: 16px;
            line-height: 20px;
        }

        &_important {
            color: $contrast-color;
            font-size: 16px;
            line-height: 20px;
        }
    }

    &__input-field {
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        margin: 2px;
        padding: 4px 16px;
        color: $text-color;
        font-size: 20px;
        line-height: 20px;
        background: transparent;
        border: none;
        border-radius: 15px;
        outline: none;
        box-shadow: $element-shadow;
        transition: box-shadow .2s;

        &_error {
            box-shadow: $element-shadow-error;
        }

        &_multiline {
            min-width: 200px;
            height: 120px;
            min-height: 35px;
            max-height: 600px;
            font-size: 18px;
            line-height: 22px;
        }
    }

    &__info-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        width: auto;
        height: 16px;
        margin: 0 18px;
        font-size: 12px;
        line-height: 16px;
        transition: all .2s;
    }

    &__error {
        color: $contrast-color;
        font-weight: bold;
        font-size: 12px;
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
