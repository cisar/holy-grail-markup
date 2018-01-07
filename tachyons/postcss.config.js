module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-cssnext')({
            features: {
                customProperties: {
                    preserve: false,
                },
            },
            warnForDuplicates: false,
        }),
        require('autoprefixer')({ add: false, browsers: [] }),
        require('postcss-uncss')({ html: ['index.html'] }),
    ]
};