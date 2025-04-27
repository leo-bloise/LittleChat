export class UserNotFoundError extends Error {
    constructor(username: string) {
        super(`User of username ${username} was not found`);
    }
}