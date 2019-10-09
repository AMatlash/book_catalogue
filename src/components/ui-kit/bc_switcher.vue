<template>
    <div
        class="bc-switcher"
    >
        <div
            v-for="(icon, index) in icons"
            :key="icon"
            :class="['bc-switcher__button', {
                'bc-switcher__button_selected': index === selected
            }]"
            @click="selectIcon(index)"
        >
            <bc_icon
                big
                :name="icon"
            />
        </div>
    </div>
</template>

<script>
import * as typography from '@typography';

export default {
    name: 'bc_switcher',
    components: {
        ...typography
    },
    model: {
        prop: 'selected',
        event: 'change'
    },
    props: {
        icons: Array,
        selected: {
            type: Number,
            default: 0
        }
    },
    methods: {
        selectIcon(index) {
            this.$emit('change', index);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.bc-switcher {
    display: flex;
    flex-direction: row;
    border-radius: 25px;
    box-shadow: $element-shadow;
    user-select: none;

    &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        padding: 0 6px;
        color: $text-color;
        cursor: pointer;
        transition: all .4s;

        &:hover {
            color: $text-color-hover;
            background-color: $secondary-color;
        }

        &:first-child {
            border-radius: 25px 0 0 25px;
        }

        &:last-child {
            border-radius: 0 25px 25px 0;
        }

        &_selected {
            background-color: $primary-color;

            &:hover {
                background-color: $primary-color;
            }
        }
    }
}
</style>
