import axios from "axios";
import { useDispatch } from "react-redux";
import { userIsLogged } from "../features/users/usersSlice";
import { storage } from "../utils/storage";
const api_base=import.meta.env.VITE_API_BASE_URL

const client= axios.create({
    baseURL:api_base
})



// me saca la data especifica del response
client.interceptors.response.use(response=>response.data , error=> {
   // const dispatch = useDispatch();
    if (!error.response) {
        return Promise.reject({message:error.message})
    } else {
        if (error.response.status === 401) {
            removeAuthorizationHeader()
            storage.remove("authToken")
            window.location = '/login';
          }
          console.log(error)
        return Promise.reject({
            message:error.response.statusText,
            ...error.response,
            ...error.response.data
        })
    }

}
)
//setea al cliente para que el token viaje en la cabezera en cada llamada a la peticion
export const setAuthorizationHeader=(token)=>client.defaults.headers.common['Authorization']='Bearer '+token

export const removeAuthorizationHeader=()=>{
    delete client.defaults.headers.common['Authorization']
}

export default client