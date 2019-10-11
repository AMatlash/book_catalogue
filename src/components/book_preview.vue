<template>
    <div
        :class="['book-preview', {
            'book-preview_small': list
        }]"
    >
        <bc_image
            :compressedImageString= "image"
            :small="list"
        />
        <div
            class="book-preview__main-info-block"
        >
            <bc_text
                class="book-preview__text_title"
            >
                {{ name }}
            </bc_text>
            <bc_text
                class="book-preview__text_author"
            >
                {{ [authorName, authorSurname].join(' ')}}
            </bc_text>
            <bc_text
                class="book-preview__text_release-year"
            >
                {{ releaseYear ? `${releaseYear}г.` : '' }}
            </bc_text>
            <bc_text
                class="book-preview__text_additional"
            >
                {{ `Издательство: ${publisher || 'Неизвестно'}`}}
            </bc_text>
            <bc_text
                class="book-preview__text_additional"
            >
                {{ `Дата выхода в тираж: ${releaseDate || 'Неизвестно'}` }}
            </bc_text>
            <bc_text
                class="book-preview__text_additional"
            >
                {{ `Страниц: ${pages}` }}
            </bc_text>
        </div>
        <div
            v-if="!list"
            class="book-preview__extra-info-block"
        >
            <bc_text
                class="book-preview__text_description"
            >
                {{ desription || 'Описание отсутствует'}}
            </bc_text>
        </div>
        <bc_button
            class="book-preview__button"
            icon="edit"
            simple
            @click="gotoEditScreen()"
        />
    </div>
</template>

<script>
import * as ui_kit from '@ui-kit';
import * as typography from '@typography';

export default {
    name: 'book_preview',
    components: {
        ...ui_kit,
        ...typography
    },
    props: {
        book_id: String,
        image: String,
        name: String,
        authorName: String,
        authorSurname: String,
        releaseYear: String,
        publisher: String,
        releaseDate: String,
        pages: String,
        desription: String,
        list: Boolean
    },
    data() {
        return {
        };
    },
    methods: {
        gotoEditScreen() {
            let book_id = this.book_id.split('_').pop();
            this.$router.push({
                name: 'book-edit-screen',
                params: {
                    book_id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.book-preview {
    position: relative;
    display: flex;
    flex-basis: 40%;
    flex-direction: column;
    min-width: 350px;
    padding: 8px;
    border-radius: 15px;
    box-shadow: $element-shadow;

    &_small {
        flex-direction: row;
    }

    &__main-info-block {
        margin: 0 8px;
    }

    &__extra-info-block {
        flex-basis: 35%;
        margin: 4px 8px;
        padding: 10px;
        border-radius: 15px;
        box-shadow: $element-shadow;
    }

    &__button {
        position: absolute;
        right: 10px;
    }

    &__text {
        &_title {
            font-size: 24px;
            line-height: 30px;
        }

        &_author {
            font-size: 20px;
            line-height: 22px;
        }

        &_release-year {
            font-size: 18px;
            line-height: 20px;
        }

        &_description {
            font-size: 16px;
            line-height: 18px;
        }

        &_additional {
            font-size: 14px;
            line-height: 16px;
        }
    }
}
</style>
