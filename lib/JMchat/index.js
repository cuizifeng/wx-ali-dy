import Vue from 'vue'
import config from './utils/config.js';
import utils from './utils/utils.js';
import regExp from './utils/RegExp.js'
import jimMsg from './utils/imMsgApi.js';
Vue.prototype.$config = config;
Vue.prototype.$jimMsg = jimMsg;
Vue.prototype.$regExp = regExp;
try {
    Object.keys(utils).forEach(e => {
        Vue.prototype[e] = utils[e];
    })
} catch (e) {
}
Vue.filter('formatTime', utils.$formatting)