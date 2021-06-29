import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


Vue.mixin({
    data() {
        return {
            userInfo: null,
            genericError: {
                display: false,
                text: null
            },
            authenticatedGlobal: false
        }
    },
    methods: {
        shortenPerex (perex, maxLength) {

            return perex.length > maxLength ? perex.substring(0, maxLength) + '...' : perex;
        },
        async sendHttpRequest(url, method, requiresAuth, body = null) {


            const headers = {'Content-type': 'application/json'};
            if (requiresAuth) {
                headers.Authorization = `Bearer ${localStorage.getItem('userToken')}`;
            }

            //what contains method for sending http request
            const methodObject = body === null ? {method, headers} : { method, headers, body: JSON.stringify(body)};

            const res = await fetch(`api${url}`, methodObject);
            return res;
        },
        setGenericError(incomingError ,visible, text) {
            incomingError.display = visible;
            incomingError.text = text;
        },
        async getUserInfo() {
            const res = await this.sendHttpRequest('/users', 'GET', true);

            if (res.status === 200) {
                return res;
            } else {
                throw new Error();
            }
        },
        /**
         * checks if user is authanticated
         * @param locationTopush locationTopush - optional - pushes to selected location of web, when authentication is not successfull
         * @returns {Promise<void>}
         */
        async checkCredentials(locationTopush= null) {

            if (localStorage.getItem('userToken') === null) {
                this.authenticatedGlobal = false;
            }

            try {
                const getUserInfo = await this.getUserInfo();

                if (getUserInfo.status === 200) {
                    this.authenticatedGlobal = true;
                } else {
                    this.authenticatedGlobal = false;
                }

            } catch (e) {
                this.authenticatedGlobal = false;
            }

            if (this.authenticatedGlobal === false && locationTopush !== null) {
               await router.push(locationTopush);
            }

        },
    }


})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
