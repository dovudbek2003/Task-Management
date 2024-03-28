class UserNotFound extends Error {
    constructor() {
        super("user not found")
        this.statusCode = 404
    }
}

class UserLoginAlreadyExistException extends Error {
    constructor() {
        super("user login already exist");

        this.statusCode = 400;
    }
}

class UserDeleteException extends Error {
    constructor() {
        super("There is no such user in your campaign")
        this.statusCode = 404
    }
}

class UserLoginNotFound extends Error {
    constructor() {
        super("login or passwor wrong")
        this.statusCode = 400
    }
}

class UserLoginWrongException extends Error {
    constructor() {
        super("login or password wrong")

        this.statusCode = 400
    }
}

module.exports = { UserNotFound, UserLoginAlreadyExistException, UserDeleteException, UserLoginNotFound, UserLoginWrongException }