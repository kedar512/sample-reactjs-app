
const isAuthenticated = () => {
    return localStorage.getItem('userToken') ? true : false;
}
export default isAuthenticated;