import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { getEnv, setEnvOnBody, getLang } from '../../utils/environment';

// Data
const data = {
    lang: false,
    env: false,
    bodyScrollDisabled: false,
};

// Getters - get value
const getters = {
    lang: (state) => state.lang,
    env: (state) => state.env,
    bodyScrollDisabled: (state) => state.bodyScrollDisabled,
};

// Setter - set value asynchrone (async) or business logic
// https://stackoverflow.com/questions/39299042/vuex-action-vs-mutations
const actions = {};

// Setter - set value synchrone (sync)
const mutations = {
    setLanguage: (state, lang) => {
        state.lang = lang;
    },
    setEnv: (state, env) => {
        state.env = env ? 'dev' : 'prod';
    },
    setBodyScrollDisabled(state, { status, element }) {
        state.bodyScrollDisabled = { status, element };
        if (status) {
            disablePageScroll(element);
        } else {
            enablePageScroll(element);
        }
    },
};

export default {
    state: data,
    getters,
    actions,
    mutations,
};
