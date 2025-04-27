export class UserAlreadyExistsError extends Error {
    constructor(username: string) {
        super(`Username ${username} already taken`);
    }
}