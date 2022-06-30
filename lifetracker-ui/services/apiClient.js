import axios from "axios"
import {API_BASE_URL} from "../constants/constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    static setToken(token) {
        const request = axios.request(token)
        return request
    }
    
    static login(endpoint) {
        const loginRequest = new Request(API_BASE_URL)
        axios.post(loginRequest, endpoint)
    }
    
    static signup(endpoint) {
        const signupRequest = new Request(API_BASE_URL)
        axios.post(signupRequest, endpoint)
    }
    
   static fetchUserFromToken(endpoint) {
        const userRequest = new Request(API_BASE_URL)
        axios.post(userRequest, endpoint)
    }
}


module.exports = ApiClient