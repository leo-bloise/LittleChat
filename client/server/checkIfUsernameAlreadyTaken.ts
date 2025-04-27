export const usernameAlreadyTaken = async (username: string) => {
    const response = await fetch(`http://localhost:8080/user?username=${username}`)
    if(response.status !== 200) {
        const data = await response.json()
        throw new Error(data);
    }
    const { alreadyTaken } = await response.json();
    return alreadyTaken;
}