import Cookies from "js-cookie";

export function checkLogin() {
    return !!Cookies.get("username");
}