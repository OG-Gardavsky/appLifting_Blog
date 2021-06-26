import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


Vue.mixin({
    data() {
        return {
            userInfo: null
        }
    },
    methods: {
        async sendRequest(url, method, requiresAuth, body = null) {


            const headers = {'Content-type': 'application/json'};
            if (requiresAuth) {
                headers.Authorization = `Bearer ${localStorage.getItem('userToken')}`;
            }

            //what contains method for sending http request
            const methodObject = body === null ? {method, headers} : { method, headers, body: JSON.stringify(body)};

            const res = await fetch(`api/${url}`, methodObject);
            return res;
        },
        setGenericError(incomingError ,visible, text) {
            incomingError.display = visible;
            incomingError.text = text;
        },
        async getUserInfo() {
            const res = await this.sendRequest('/users', 'GET', true);

            if (res.status === 200) {
                return await res.json();
            } else {
                throw new Error();
            }
        },
        /**
         * checks if user is authanticated
         * @param locationTopush - optional - pushes to selected location of web, when authentication is not successfull
         * @returns {Promise<Route|boolean>} true when user is authenticated, otherwise false
         */
        async checkCredentials(locationTopush = null) {
            let areCredentialsOk;

            if (localStorage.getItem('userToken') === null) {
                areCredentialsOk = false;
            }

            if (areCredentialsOk !== false) {
                try {
                    const getUserInfo = await this.getUserInfo();

                    if (getUserInfo.error) {
                        localStorage.removeItem('userToken');
                        areCredentialsOk = false;
                    } else {
                        areCredentialsOk = true;
                        this.userInfo = getUserInfo;
                    }

                } catch (e) {
                    areCredentialsOk = false;
                }
            }


            if (locationTopush && !areCredentialsOk) {
                await router.push(locationTopush);
            }

            return areCredentialsOk;
        },
    }


})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
