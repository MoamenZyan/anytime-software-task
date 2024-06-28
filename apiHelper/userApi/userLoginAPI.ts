
type propsTypes = {
    email: string,
    password: string
}

export default async function UserLoginAPI(userInfo: propsTypes) {
    return await fetch("/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
        })
     })
    .then((res) => res.json())
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
}