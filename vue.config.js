module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @use "sass:color";
                    @import "~@/styles/variables.scss";
                `
            }
        }
    }
}
