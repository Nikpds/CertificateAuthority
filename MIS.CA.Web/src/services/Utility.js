export const baseurl = "http://localhost:53400/api/";
export const Get = async (address) => {
    return fetch(baseurl + address, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            //"Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(response => {
        return response.json();
    }).catch(error => console.error('Error:', error));
}

export const Post = async (address, data) => {
    return fetch(baseurl + address, {
        method: "POST", // *GET, POST, PUT, DELETE, etc
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response => {
        const token = response.json();
        console.log(token);
    }).catch(error => console.error('Error:', error))
        ; // parses JSON response into native Javascript objects 
}

export const Delete = async (address) => {
    return fetch(baseurl + address, {
        method: "DELETE"
    });
}