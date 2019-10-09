<template>
    <div class="ui-kit-pre">
        <div class="ui-kit-pre__elements-group">
            <bc_button
                class="ui-kit-pre__button"
                label="Active"
            />
            <bc_button
                class="ui-kit-pre__button"
                label="Disabled"
                disabled
            />
        </div>
        <div class="ui-kit-pre__elements-group">
            <bc_button
                class="ui-kit-pre__button"
                label="Active"
                simple
            />
            <bc_button
                class="ui-kit-pre__button"
                label="Disabled"
                simple
                disabled
            />
        </div>
        <div  class="ui-kit-pre__elements-group">
            <bc_button
                class="ui-kit-pre__button"
                icon="more_vert"
            />
            <bc_button
                class="ui-kit-pre__button"
                icon="more_vert"
                disabled
            />
        </div>
        <div class="ui-kit-pre__elements-group">
            <bc_button
                class="ui-kit-pre__button"
                icon="more_vert"
                simple
            />
            <bc_button
                class="ui-kit-pre__button"
                icon="more_vert"
                simple
                disabled
            />
        </div>
        <div  class="ui-kit-pre__elements-group">
            <bc_switcher
                v-model="selectedIcon"
                :icons="['view_list', 'view_module', 'more', 'face']"
            />
            Выбрана иконка {{ selectedIcon }}
        </div>
        <bc_input
            v-model="inputText"
            label="Имя"
            border="none"
            :limit="5"
        />
        <bc_input
            v-model="inputText"
            label="Не Имя"
            error="Даже проверять это не буду"
            border="none"
            :limit="10"
        />
    </div>
</template>

<script>
import {
    bc_button,
    bc_switcher,
    bc_input
} from '@ui-kit';

export default {
    name: 'UI-kit-pre',
    components: {
        bc_button,
        bc_switcher,
        bc_input
    },
    data() {
        return {
            selectedIcon: 0,
            inputText: ''
        };
    }
};
</script>

<style lang="scss">
.ui-kit-pre {
    display: flex;
    flex-direction: column;

    &__elements-group {
        display: flex;
        flex-direction: row;
        margin: 8px;
    }

    &__button {
        margin: 0 4px;
    }
}
</style>
