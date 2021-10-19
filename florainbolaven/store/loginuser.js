import axios from 'axios'

const state =()=>({
    user: {}

})
const getters =()=>({
})

const actions={
    getUser(commit){
axios.get('http://localhost:8000/signup').then(res=>{
    commit('setUser',res.data)
})
    },
    //commit use for call mutation, state, payload=data when we call action 
logInUser({},user){
    axios.post('http://localhost:8000/signup/login',{
        username: user.username,
        password: user.password

    }).then(res=>{
        //window.location.replace('/')
       // console.log(res.data);
        if(res.data.token){
            //save token
            localStorage.setItem(
                "blog_token",
                res.data.token
            )
          //  window.location.replace('/')
        }
    })
}
}

const mutations ={
    setUser(state,data){
        state.user = data
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}