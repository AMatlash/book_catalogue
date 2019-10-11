<template>
    <div
        class="bc-image"
    >
        <img
            :class="['bc-image__image', {
                'bc-image__image__small': small
            }]"
            :src="imgUrl"
        />
        <div>
            <input
                v-if="input"
                type="file"
                @change="inputLoadImage"
            />
        </div>
    </div>
</template>

<script>
import * as typography from '@typography';
import lz from 'lz-string';

export default {
    name: 'bc_image',
    components: {
        ...typography
    },
    model: {
        prop: 'compressedImageString',
        event: 'change'
    },
    props: {
        imgName: String,
        compressedImageString: String,
        small: Boolean,
        input: Boolean
    },
    data() {
        return {
            imgArrayBuffer: undefined
        };
    },
    computed: {
        imgUrl() {
            if (this.imgName) {
                return require(`@assets/${this.imgName}`);
            }
            let buffer;
            if (this.imgArrayBuffer) {
                buffer = this.imgArrayBuffer;
            } else if (this.compressedImageString) {
                buffer = this.decompress(this.compressedImageString);
            }
            if (buffer) {
                let blob = new Blob([buffer], { type: 'image' });
                let urlCreator = window.URL || window.webkitURL;
                return urlCreator.createObjectURL(blob);
            }
            return require('@assets/logo.png');
        }
    },
    methods: {
        inputLoadImage(event) {
            event.target.files[0].arrayBuffer().then(result => {
                // Отображаем
                this.imgArrayBuffer = result;
                // Сжимаем
                let view8uint = new Uint8Array(result);
                let baseString = btoa(view8uint);
                let compressed = lz.compressToUTF16(baseString);
                this.$emit('change', compressed);
            });
        },
        decompress(compressed) {
            let decompressed = lz.decompressFromUTF16(compressed);
            return Uint8Array.from(atob(decompressed).split(','));
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles';

.bc-image {
    &__image {
        max-width: 100%;
        border: solid $primary-color 4px;
        box-shadow: $element-shadow;

        &__small {
            width: 100px;
            height: 100px;
        }
    }
}
</style>
