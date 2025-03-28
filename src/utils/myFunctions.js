
export const saveToLocalStorage = (data) => {
    const { email, password, fullName } = data;
    if (!email || !password || !fullName) {
        return false
    }
    localStorage.setItem("userEmail", email)
    localStorage.setItem("userFullName", fullName)
    localStorage.setItem("userPassword", password)

    return true;
}

export const deleteDetails = () => {

    const userEmail = localStorage.getItem("userEmail")
    const userFullName = localStorage.getItem("userFullName")
    const userPassword = localStorage.getItem("userPassword")

    if (!userEmail || !userPassword || !userFullName) {
        return false
    }

    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userPassword");

    return true;
}

export const getData = () => {
    return fetch("https://randomuser.me/api/?results=100") // <- Return the fetch chain
        .then((response) => response.json())
        .then((data) => data) // Return the data
        .catch((error) => {
            console.error("Fetch error:", error);
            return false;
        });
};