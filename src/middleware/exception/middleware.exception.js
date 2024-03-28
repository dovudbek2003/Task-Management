class AuthorizationTokenRequiredException extends Error {
    constructor() {
        super("token must be required");
        this.statusCode = 401;
    }
}

class AuthorizationUserIdRequiredException extends Error {
    constructor() {
        super("userId must be required");
        this.statusCode = 401;
    }
}

class ForbidenRoleException extends Error {
    constructor(message) {
        super(`Forbidden ${message} role`);
        this.statusCode = 403;
    }
}

module.exports = {
    AuthorizationTokenRequiredException,
    AuthorizationUserIdRequiredException,
    ForbidenRoleException
}