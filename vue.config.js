const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    lintOnSave: 'error',
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.scss'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@root': resolve('./'),
                '@src': resolve('src/'),
                '@views': resolve('src/views/'),
                '@assets': resolve('src/assets/'),
                '@ui-kit': resolve('src/ui-kit/'),
                '@components': resolve('src/components/'),
                '@router': resolve('src/router/'),
                '@vuex': resolve('src/vuex/'),
                '@styles': resolve('src/scss/')
            },
        },
        plugins: [
            new webpack.ProvidePlugin({
                Vue: ['vue', 'default'],
                mapState: ['vuex', 'mapState'],
                mapGetters: ['vuex', 'mapGetters'],
                mapMutations: ['vuex', 'mapMutations'],
                mapActions: ['vuex', 'mapActions']
            }),
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html',
                inject: true
            }),
            new StyleLintPlugin({
                files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
                emitErrors: true
            })
        ]
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    }
}

