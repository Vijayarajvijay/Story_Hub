import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';


const AxiosService = axios.create({
    
    baseURL:`https://stories-2me1.onrender.com/`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default AxiosService

  