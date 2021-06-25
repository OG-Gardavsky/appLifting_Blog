import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


Vue.mixin({
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
        }
    }


})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
