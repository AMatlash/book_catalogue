<template>
    <div
        :class="['bc-button', {
            'bc-button_simple': simple,
            'bc-button_is-icon': icon,
            'bc-button_disabled': disabled
        }]"
        @click="$emit('click', $event)"
    >
        <bc_icon
            v-if="icon"
            :name="icon"
        />
        <bc_text
            v-else-if="label"
            class="bc-button__label"
        >
            {{ label }}
        </bc_text>
    </div>
</template>

<script>
import * as typography from '@typography';

export default {
    name: 'bc_button',
    components: {
        ...typography
    },
    props: {
        label: String,
        icon: String,
        disabled: Boolean,
        simple: Boolean
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.bc-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    color: $text-color;
    background-color: $primary-color;
    border-radius: 25px;
    box-shadow: $element-shadow;
    cursor: pointer;
    transition: all .4s;
    user-select: none;

    &:hover {
        color: $text-color-hover;
        background-color: $secondary-color;
    }

    &_disabled {
        color: $text-color-disabled;
        background-color: $primary-color-disabled;
        cursor: default;
        pointer-events: none;
    }

    &_simple {
        width: fit-content;
        background: none;
        box-shadow: none;

        &:hover {
            color: $primary-color;
            background-color: initial;
            box-shadow: $element-shadow;
        }
    }

    &_is-icon {
        width: 40px;
        height: 40px;
    }

    &__label {
        padding: 4px 16px;
    }
}
</style>
