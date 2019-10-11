const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    lintOnSave: 'error',
    publicPath: '/',
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.scss'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@root': resolve('./'),
                '@src': resolve('src'),
                '@views': resolve('src/views'),
                '@assets': resolve('src/assets'),
                '@components': resolve('src/components'),
                '@ui-kit': resolve('src/components/ui-kit'),
                '@typography': resolve('src/components/ui-kit/typography'),
                '@router': resolve('src/router'),
                '@vuex': resolve('src/vuex'),
                '@styles': resolve('src/scss')
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
        ],
        module: {
            rules: [
                {
                    test: /\.ico$/,
                    use: 'file-loader'
                }
            ]
        }
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    }
}

