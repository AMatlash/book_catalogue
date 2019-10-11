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
            v-model="inputText1"
            label="Имя"
            error="Даже проверять это не буду"
            :limit="30"
        />
        <bc_input
            v-model="inputText2"
            label="Не Имя"
            :limit="5"
        />
        <bc_input
            v-model="inputText3"
            label="Многострочное имя"
            multiline
            :limit="300"
        />
        <bc_image/>
    </div>
</template>

<script>
import {
    bc_button,
    bc_switcher,
    bc_input,
    bc_image
} from '@ui-kit';

export default {
    name: 'UI-kit-pre',
    components: {
        bc_button,
        bc_switcher,
        bc_input,
        bc_image
    },
    data() {
        return {
            selectedIcon: 0,
            inputText1: 'azaza',
            inputText2: '',
            inputText3: ''
        };
    }
};
</script>

<style lang="scss" scoped>
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
