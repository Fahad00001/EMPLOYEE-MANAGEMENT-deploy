import {toast} from 'react-toastify'

export const notify=(message,type)=>{
    toast[type](message)
}
export const API_URL="https://employee-management-deploy-api1.vercel.app"
