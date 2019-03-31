const url = "http://localhost:51261/api"
export const Get = async (data) => {
    return fetch('https://reqres.in/api/users', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            //"Content-Type": "application/x-www-form-urlencoded",
        },
        //redirect: "follow", // manual, *follow, error
        //referrer: "no-referrer", // no-referrer, *client
        //body: JSON.stringify(data), // body data type must match "Content-Type" header
    }); // parses JSON response into native Javascript objects 
}

export const Post = async (address, data) => {
    return fetch(url + address, {
        method: "POST", // *GET, POST, PUT, DELETE, etc
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response => {
        const token = response.json();
        console.log(token);
    }).catch(error => console.error('Error:', error))
; // parses JSON response into native Javascript objects 
}