<template>
    <div class="ui-kit-pre">
        <div class="ui-kit-pre__group">
            <bc_button
                label="Кнопка"
            />
            <bc_button
                label="Кнопка"
                disabled
            />
            <bc_button
                label="Кнопка"
                simple
            />
            <bc_button
                label="Кнопка"
                simple
                disabled
            />
        </div>
        <div  class="ui-kit-pre__group">
            <bc_button
                icon="more_vert"
            />
            <bc_button
                icon="more_vert"
                disabled
            />
            <bc_button
                icon="more_vert"
                simple
            />
            <bc_button
                icon="more_vert"
                simple
                disabled
            />
        </div>
        <div  class="ui-kit-pre__group">
            <bc_switcher
                v-model="selectedIcon"
                :icons="['view_list', 'view_module', 'more', 'face']"
            />
            Выбрана иконка {{ selectedIcon }}
        </div>
        <div  class="ui-kit-pre__group">
            <bc_input
                v-model="inputText"
                label="Имя автора"
                error="Даже проверять это не буду"
                border="none"
                :limit="30"
            />
        </div>
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

    &__group {
        display: flex;
        flex-direction: row;
        margin: 8px 0;

        .bc-button {
            margin: 0 8px;
        }
    }
}
</style>
