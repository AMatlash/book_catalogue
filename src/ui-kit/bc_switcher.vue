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
            <i
                class="material-icons bc-switcher__button__icon"
            >
                {{ icon }}
            </i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bc_switcher',
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

<style lang="scss">
@import '@styles';

.bc-switcher {
    display: flex;
    flex-direction: row;
    border-radius: 25px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);
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

        &__icon {
            font-size: 30pt;
        }
    }
}
</style>
