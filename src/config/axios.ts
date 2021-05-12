import axios from 'axios'
import { _basePath } from './basePath'

const instance = axios.create({
    baseURL: _basePath
})

export default instance