//auth.js
import axios from 'axios'
import {
    setHeaderToken
} from '../utils/auth'
import {
    removeHeaderToken
} from '../utils/auth'
export default {
    state: {
        user: null,
        isLoggedIn: false,
    },

    mutations: {
        set_user(state, data) {
            state.user = data
            state.isLoggedIn = true
        },
        reset_user(state) {
            state.user = null
            state.isLoggedIn = false
        }
    },

    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        user(state) {
            return state.user
        }
    },

    actions: {
        login({
            dispatch,
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                axios.post('login', data)
                    .then(response => {
                        const token = response.data.access_token
                        const id = response.data.data.id
                        localStorage.setItem('access_token', token)
                        localStorage.setItem('id', id)
                        setHeaderToken(token)
                        dispatch('get_user')
                        resolve(response)
                    })
                    .catch(err => {
                        commit('reset_user')
                        localStorage.removeItem('access_token')
                        reject(err)
                    })
            })
        },
        async get_user({ commit }) {
            if (!localStorage.getItem('access_token')) {
                return
            }
            try {
                let response = await axios.get('user/' + localStorage.getItem('id'))
                commit('set_user', response.data.data)
            }
            catch (error) {
                commit('reset_user')
                removeHeaderToken()
                localStorage.removeItem('access_token')
                localStorage.removeItem('id')
                return error
            }
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                axios.get('logout', localStorage.getItem('access_token'))
                    .then(() => {
                        commit('reset_user')
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('id')
                        removeHeaderToken()
                        resolve()
                    })
            })
        },

    }

}