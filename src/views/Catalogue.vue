<template>
    <div class="catalogue">
        <div class="catalogue__tools">
            <bc_input
                v-model="searchText"
                class="catalogue__tool catalogue__search"
                label="Поиск по названию"
            />
            <bc_switcher
                v-model="viewMode"
                class="catalogue__tool"
                :icons="[
                    'view_list',
                    'view_module'
                ]"
            />
            <bc_switcher
                v-model="sortMode"
                class="catalogue__tool"
                :icons="[
                    'sort_by_alpha',
                    'calendar_today'
                ]"
            />
            <bc_button
                class="catalogue__tool"
                icon="post_add"
                @click="addNewBook()"
            />
            <!-- <bc_button
                class="catalogue__tool"
                icon="storage"
                @click="addPreparedBooks()"
            /> -->
        </div>
        <div
            :class="['catalogue__content', {
                'catalogue__content_list': viewMode === 0
            }]"
        >
            <bc_text
                v-if="searchText && sortedBooks.length === 0"
                class="catalogue__text"
            >
                Ничего не найдено :(
                попробуйте изменить параметры поиска
            </bc_text>
            <bc_text
                v-if="Object.keys(books).length === 0"
                class="catalogue__text"
            >
                Добавьте новые записи о книгах нажав на иконку сверху
                Картинки можно найти в папке ./assets
                <bc_icon
                    name="post_add"
                />
            </bc_text>
            <book_prewiew
                v-for="(book, index) in sortedBooks"
                :key="index"
                class="catalogue__book-preview"
                :book_id="book.id"
                :list="viewMode === 0"
                :image="book.image_input"
                :publisher="book.publisher_input"
                :releaseDate="book.releaseDate_input"
                :pages="book.pages_input"
                :name="book.name_input"
                :authorName="book.authorName_input"
                :authorSurname="book.authorSurname_input"
                :releaseYear="book.releaseYear_input"
                :desription="book.desription_input"
            />
        </div>
    </div>
</template>

<script>
import * as typography from '@typography';
import * as ui_kit from '@ui-kit';
import book_prewiew from '@components/book_preview';

export default {
    name: 'UI-kit-pre',
    components: {
        ...typography,
        ...ui_kit,
        book_prewiew
    },
    data() {
        return {
            books: {},
            viewMode: 0,
            sortMode: 0,
            searchText: ''
        };
    },
    computed: {
        sortedBooks() {
            const {
                books,
                searchText,
                sortMode
            } = this;
            return Object.keys(books)
                .filter(key => {
                    return books[key].name_input.includes(searchText);
                })
                .map(key => {
                    return books[key];
                })
                .sort((a, b) => {
                    let sortParam = !sortMode ? 'name_input' : 'releaseYear_input';
                    let aVal = a[sortParam] || 'zzzzzzzzzz';
                    let bVal = b[sortParam] || 'zzzzzzzzzz';
                    if (aVal > bVal) {
                        return 1;
                    }
                    if (aVal < bVal) {
                        return -1;
                    }
                    return 0;
                });
        }
    },
    created() {
        let result = {};
        Object.keys(localStorage)
            .filter(key => key.includes('bc_book'))
            .forEach(key => {
                let string = localStorage.getItem(key);
                let book = JSON.parse(string);
                book.id = key;
                result[key] = book;
            });
        this.books = result;
    },
    methods: {
        addNewBook() {
            let randomId = Math.random() * 100000000;
            randomId = Math.round(randomId);
            this.$router.push({
                name: 'book-edit-screen',
                params: {
                    book_id: randomId
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.catalogue {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    max-width: 900px;

    &__tools {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 8px;
        padding: 16px;
        border-radius: 15px;
        box-shadow: $element-shadow;
    }

    &__tool {
        margin: 0 8px;
    }

    &__search {
        width: 325px;
    }

    &__content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin: 8px;
        padding: 16px;
        border-radius: 15px;
        box-shadow: $element-shadow;

        &_list {
            display: flex;
            flex-direction: column;
        }
    }

    &__book-preview {
        margin: 8px;
    }

    &__button {
        margin-left: 16px;
    }
}
</style>
