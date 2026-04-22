import Cookies from "universal-cookie";
const cookies = new Cookies();
export function get(key) {
    return cookies.get(key);
}
export function set(key, value) {
    cookies.set(key, value, {
        path: "/"
    });
}
export function remove(key) {
    cookies.remove(key);
}
