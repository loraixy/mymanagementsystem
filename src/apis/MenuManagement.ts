import http from "../utils/axios"
import type { IMenu } from '../typings/system'

export const menu = {
    /**
    * Retrieves the menu from the server.
    *
    * @return {Promise<any>} A promise that resolves with the menu data.
    */
    getMenu() {
        return http.get<Array<IMenu[]>>('/api/Myfromwork/GetMenus')
    },

    getRunningWater() {
        return http.get('https://apis.netstart.cn/zhihudaily/stories/latest')
    }
}