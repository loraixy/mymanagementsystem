import http from '../utils/axios'

export const request = {

    getTest() {
        return http.get('/test')
    }
}