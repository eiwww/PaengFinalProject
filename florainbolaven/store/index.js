import axios from 'axios'

const state =()=>({
    counter: 0,
    user: {},
    drawState: false,
    drawer: false,
    

})
const getters =()=>({
    counter: 0,
    getDrawer(state){
        return state.drawer;
    }

})

const actions=({
    setdrawer({commit},{data}){
            commit('toggleDrawerState',{data})
    },
    //commit use for call mutation, state, payload=data when we call action 
logInUser({},user){
    axios.post('http://localhost:8000/signup/login',{
        username: user.username,
        password: user.password

    }.then(res=>{
        console.log(res.data);
        if(res.data.access_token){
            //save token
            localStorage.setItem(
                "blog_token",
                res.data.access_token
            )
            window.location.replace('/register')
        }
    }))
}
})

const mutations ={
    increment(state){
        state.counter++
    },
    toggleDrawerState (state, data) {
        state.drawer = data
      }
}
export default{
    state,
    getters,
    actions,
    mutations
}