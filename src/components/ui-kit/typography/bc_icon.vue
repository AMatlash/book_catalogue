<template>
    <i
        :class="['material-icons', {
            'bc-icon_small': small,
            'bc-icon_big': big,
            'bc-icon_huge': huge
        }]"
    >
        {{ name }}
    </i>
</template>

<script>
export default {
    name: 'bc_icon',
    props: {
        name: {
            type: String,
            required: true
        },
        small: Boolean,
        big: Boolean,
        huge: Boolean
    }
};
</script>

<style lang="scss" scoped>

.bc-icon {
    &_small {
        font-size: 18px;
    }

    &_big {
        font-size: 36px;
    }

    &_huge {
        font-size: 48px;
    }
}

</style>
