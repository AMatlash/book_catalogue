<template>

    <div
        class="bc-text"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'bc_text'
};
</script>

<style lang="scss" scoped>
@import '@styles';

.bc-text {
    font-weight: 500;
    font-size: 24px;
    font-style: normal;
    line-height: 32px;
    user-select: none;
}

</style>
