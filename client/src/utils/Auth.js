const Auth = {
    authenticateUser: token => {
        console.log("authenticating...", token)
        localStorage.setItem("token", JSON.stringify(token));
    },
    isUserAuthenticated: () => {
        console.log("checking authentication...")
        return localStorage.getItem("token") !== null;
    },
    deauthenticateUser: () => {
        console.log("deauthenticating...")
        localStorage.removeItem("token");
    },
    getToken: () => {
        console.log("getting token...")
        return localStorage.getItem("token");
    }
};

export default Auth;