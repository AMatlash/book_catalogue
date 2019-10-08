<template>
    <div
        :class="['bc-button', {
            'bc-button_disabled': disabled,
            'bc-button_simple': simple,
            'bc-button_is-icon': icon
        }]"
        @click="$emit('click', $event)"
    >
        <i
            v-if="icon"
            class="material-icons bc-button__icon"
        >
            {{ icon }}
        </i>
        <div
            v-else-if="label"
            class="bc-button__label"
        >
            {{ label }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'bc_button',
    props: {
        label: String,
        icon: String,
        disabled: Boolean,
        simple: Boolean
    }
};
</script>

<style lang="scss">
@import '@styles';

.bc-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 48px;
    color: $text-color;
    font-weight: 500;
    font-size: 24px;
    font-style: normal;
    line-height: 32px;
    background-color: $primary-color;
    border-radius: 25px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);
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
        }
    }

    &_is-icon {
        width: 40px;
        height: 40px;
    }

    &__icon {
        width: 100%;
        height: 100%;
        font-size: 30pt;
    }

    &__label {
        padding: 0 10px;
    }
}
</style>
