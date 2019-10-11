<template>
    <div class="book-edit-screen">
        <bc_text>Информация о книге</bc_text>
        <div class="book-edit-screen__content">
            <div class="book-edit-screen__infoBlock book-edit-screen__infoBlock_left">
                <component
                    v-model="input.value"
                    :is="getInputComponentName(input.type)"
                    v-for="(input, name) in book_inputs.left"
                    :key="name"
                    :name="name"
                    :min="input.min"
                    :max="input.max"
                    :info="input.info"
                    :input="input.input"
                    :label="input.label"
                    :multiline="input.multiline"
                    :type="input.type"
                    :limit="input.limit"
                    :important="input.important"
                    @errorChange="setErrorStatus"
                />
            </div>
            <div class="book-edit-screen__infoBlock">
                <component
                    v-model="input.value"
                    :is="getInputComponentName(input.type)"
                    v-for="(input, name) in book_inputs.right"
                    :key="name"
                    :name="name"
                    :min="input.min"
                    :max="input.max"
                    :info="input.info"
                    :label="input.label"
                    :multiline="input.multiline"
                    :type="input.type"
                    :limit="input.limit"
                    :important="input.important"
                    @errorChange="setErrorStatus"
                />
            </div>
        </div>
        <div class="book-edit-screen__buttons-block">
            <bc_button
                class="book-edit-screen__button"
                label="Сохранить"
                @click="save"
            />
            <bc_button
                class="book-edit-screen__button"
                label="Отмена"
                @click="cancel"
            />
            <bc_button
                class="book-edit-screen__button"
                label="Удалить"
                @click="remove"
            />
        </div>
    </div>
</template>

<script>
import * as ui_kit from '@ui-kit';
import * as typography from '@typography';

export default {
    name: 'Book_edit_screen',
    components: {
        ...ui_kit,
        ...typography
    },
    data() {
        return {
            image_input: {
                value: undefined,
                validationError: false,
                input: true,
                type: 'image'
            },
            publisher_input: {
                value: undefined,
                validationError: false,
                label: 'Издательство',
                type: 'text',
                limit: 30
            },
            releaseDate_input: {
                value: undefined,
                validationError: false,
                label: 'Дата выхода в тираж',
                type: 'date',
                multiline: false,
                min: '1800-01-01',
                max: new Date()
                    .toLocaleDateString()
                    .split('.')
                    .reverse()
                    .join('-'),
                info: '1800г – сегодня'
            },
            pages_input: {
                value: undefined,
                validationError: false,
                important: true,
                label: 'Кол-во страниц',
                type: 'number',
                min: '0',
                max: '10000',
                info: 'Не более 10000'
            },
            name_input: {
                value: undefined,
                validationError: false,
                important: true,
                label: 'Название',
                type: 'text',
                limit: 30
            },
            authorName_input: {
                value: undefined,
                validationError: false,
                important: true,
                label: 'Имя Автора',
                type: 'text',
                limit: 20
            },
            authorSurname_input: {
                value: undefined,
                validationError: false,
                important: true,
                label: 'Фамилия Автора',
                type: 'text',
                limit: 20
            },
            releaseYear_input: {
                value: undefined,
                label: 'Год публикации',
                type: 'number',
                validationError: false,
                min: '1800',
                max: '2019',
                info: '1800 – 2019 г.'
            },
            desription_input: {
                value: undefined,
                validationError: false,
                label: 'Описание',
                multiline: true,
                type: 'text',
                limit: 300
            }
        };
    },
    computed: {
        book_inputs() {
            const {
                image_input,
                publisher_input,
                releaseDate_input,
                pages_input,
                name_input,
                authorName_input,
                authorSurname_input,
                releaseYear_input,
                desription_input
            } = this;
            return {
                left: {
                    image_input,
                    publisher_input,
                    releaseDate_input,
                    pages_input
                },
                right: {
                    name_input,
                    authorName_input,
                    authorSurname_input,
                    releaseYear_input,
                    desription_input
                }
            };
        },
        itarableInputs() {
            return [
                ...this.getIterableObject(this.book_inputs.left),
                ...this.getIterableObject(this.book_inputs.right)
            ];
        },
        bookId() {
            return `bc_book_${this.$route.params.book_id}`;
        }
    },
    created() {
        this.restoreFromLocalStorage();
    },
    methods: {
        getBookInfo() {
            let result = {};
            Object.assign(
                result,
                this.getInputValues(this.book_inputs.left),
                this.getInputValues(this.book_inputs.right)
            );
            return result;
        },
        getInputValues(obj) {
            let result = {};
            Object.keys(obj).forEach(prop => {
                result[prop] = obj[prop].value;
            });
            return result;
        },
        getIterableObject(obj) {
            return Object.keys(obj).map(prop => {
                return obj[prop];
            });
        },
        save() {
            if (this.isReadyToSave()) {
                localStorage.setItem(this.bookId, JSON.stringify(this.getBookInfo()));
                this.$router.push({ name: 'home' });
            } else {
                alert('Заолните все обязательные поля и введите значания соответствующие диапазону');
            }
        },
        restoreFromLocalStorage() {
            let storedObj = localStorage.getItem(this.bookId);
            if (storedObj) {
                storedObj = JSON.parse(storedObj);
                Object.keys(storedObj).forEach(key => {
                    this[key].value = storedObj[key];
                });
            }
        },
        remove() {
            localStorage.removeItem(this.bookId);
            this.$router.push({ name: 'home' });
        },
        cancel() {
            this.$router.push({ name: 'home' });
        },
        isReadyToSave() {
            let gotErrors = this.itarableInputs.find(({ validationError }) => validationError);
            let notFilledImportant = this.itarableInputs.find(({ important, value }) => important && !value);
            return !notFilledImportant && !gotErrors;
        },
        getInputComponentName(type) {
            switch (type) {
                case 'image':
                    return 'bc_image';
                case 'date':
                case 'number':
                case 'text':
                    return 'bc_input';
            }
        },
        setErrorStatus(inputName, value) {
            this[inputName].validationError = value;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.book-edit-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    &__infoBlock {
        //flex-grow: 1;
        width: 300px;
        margin: 8px;
        padding: 16px;
        border-radius: 15px;
        box-shadow: $element-shadow;

        &_left {
            flex-grow: 0;
        }
    }

    &__buttons-block {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 300px;
        margin: 8px;
        padding: 16px;
        border-radius: 15px;
        box-shadow: $element-shadow;

        @media screen and (min-width: 712px) {
            width: auto;
        }
    }

    &__button {
        margin: 8px;
    }
}
</style>
