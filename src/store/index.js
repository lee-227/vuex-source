import Vue from 'vue'
import Vuex from '../vuex'

function persists(store){
    let local = localStorage.getItem('VUEX:STATE');
    if(local){
        store.replaceState(JSON.parse(local));
    }
    store.subscribe((mutation,state)=>{
       localStorage.setItem('VUEX:STATE',JSON.stringify(state));
    })
};

Vue.use(Vuex);
let store =  new Vuex.Store({
    strict:true,
    plugins:[
        persists,
    ],
    state: {
        age: 10,
    },
    getters: {
        getAge(state) {
            console.log('getter执行 ')
            return state.age + 18;
        }
    },
    mutations: {
        changeAge(state, payload) {
            state.age += payload
        }
    },
    actions: {
        changeAge({ commit }, payload) {
            setTimeout(() => {
                commit('changeAge', payload)
            }, 1000);
        }
    },
    modules: {
        a: {
            namespaced:true,
            state: {
                c: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('a 更新')
                }
            },
            modules:{
              e:{
                namespaced:true,
                state:{
                  c:100
                }
              }
            }
        },
        b: {
            namespaced:true,
            state: {
                d: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('b 更新')
                }
            },
            modules: {
                c: {
                    namespaced:true,
                    state: {
                        e: 100
                    },
                    mutations: {
                        changeAge(state, payload) {
                            console.log('c 更新')
                        }
                    },
                }
            }
        },
    }
})
store.registerModule(['e'],{
    state:{
        myAge:100
    }
})
export default store;