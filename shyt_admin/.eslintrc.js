module.exports = {
    "root": true,
    "env": {
        "es6": true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
        "browser": true,
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "plugins": [
        "html"
    ],
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 6, // 支持es6语法，但并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型）
        "sourceType": "module",
        "ecmaFeatures": {
            /*jsx: true, // 启用 JSX
            "globalReturn": true, // 允许在全局作用域下使用 return 语句
            "impliedStrict": true, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)*/
            "experimentalObjectRestSpread": true, // 启用实验性的 object rest/spread properties 支持。(重要：这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 不要 依赖该功能，除非当它发生改变时你愿意承担维护成本。)
        },

    },
    "rules": {
        "indent": [2, 4], // 强制使用一致的缩进
        "eqeqeq": [2, 'always'], // 要求使用 === 和 !==
        "no-multiple-empty-lines": ["error", {"max": 3}], // 空行最多不能超过2行
        "spaced-comment": 0,  //注释风格要不要有空格什么的
        "no-trailing-spaces": 0, // 禁止行尾空格
        "no-callback-literal": 0,
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
    }
}