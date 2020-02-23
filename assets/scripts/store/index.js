import Vue from 'vue';
import Vuex from 'vuex';

import website from './module/website';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        website,
    },
});
