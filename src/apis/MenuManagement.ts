import http from "../utils/axios"
import type { IMenu } from '../typings/system'

export const menu = {
    /**
    * Retrieves the menu from the server.
    *
    * @return {Promise<any>} A promise that resolves with the menu data.
    */
    getMenu() {
        return http.get<IMenu[]>('/api/Myfromwork/GetMenus')
    }
}