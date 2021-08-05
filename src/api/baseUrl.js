import axios from 'axios'

const instance = axios.create({
    baseURL: "https://zlxk3bvoyf.execute-api.ap-south-1.amazonaws.com/dev",
})

export default instance