export function setCredentialsToLocalstorage() {
    let temp = [];
    for (let i = 0; i <= 1; i++) {
        temp[i] = JSON.parse(localStorage.getItem("yourImdbUserServer"))[i];
    }
    localStorage.setItem("yourImdbUserCredentials", JSON.stringify(temp));
}