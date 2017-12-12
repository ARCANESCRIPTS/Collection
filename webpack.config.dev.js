var path = require("path");

var babelOptions = {
    "presets": [
        ["env", {"modules": false}]
    ]
};

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {loader: "babel-loader", options: babelOptions},
                    {loader: "ts-loader"}
                ]
            },{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: babelOptions
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
    ]
};
