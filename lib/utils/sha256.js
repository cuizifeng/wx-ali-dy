import Vue from 'vue';
Vue.prototype.$sha256 = (value) => {
    let sha256 = require("js-sha256").sha256;
    return sha256(value);
};