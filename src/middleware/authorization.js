const { verifyToken } = require("../lib/jwt.js")
const { roles } = require("../common/enums/roles.js")
const UserService = require("../modules/user/user.service.js")
const ResData = require("../common/resData.js")
const {
    AuthorizationTokenRequiredException,
    AuthorizationUserIdRequiredException,
    ForbidenRoleException
} = require("./exception/middleware.exception.js")

class AuthorizationMiddleware {
    async checkToken(req, res, next) {
        try {
            const token = req.headers.token
            if (!token) {
                throw new AuthorizationTokenRequiredException()
            }

            const { userId } = verifyToken(token)
            if (!userId) {
                throw new AuthorizationUserIdRequiredException()
            }

            req.userId = userId
            return next()
        } catch (error) {
            const resData = new ResData(error.message, 401, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkUser(req, res, next) {
        try {
            const userId = req.userId
            if (!userId) {
                throw new AuthorizationUserIdRequiredException()
            }

            const userService = new UserService()

            const { data: currentUser } = await userService.getOneUserById(userId)
            req.currentUser = currentUser

            return next()
        } catch (error) {
            const resData = new ResData(error.message, 401, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkAdminRole(req, res, next) {
        try {
            const currentUser = req.currentUser
            if (currentUser.role !== roles.ADMIN) {
                throw new ForbidenRoleException("admin")
            }

            return next()
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkManagerRole(req, res, next) {
        try {
            const currentUser = req.currentUser
            if (currentUser.role !== roles.MANAGER) {
                throw new ForbidenRoleException("manager")
            }

            return next()
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkWorkerRole(req, res, next) {
        try {
            const currentUser = req.currentUser
            if (currentUser.role !== roles.WORKER) {
                throw new ForbidenRoleException("worker")
            }

            return next()
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkSuperAdminRole(req, res, next) {
        try {
            const currentUser = req.currentUser
            if (currentUser.role !== roles.SUPERADMIN) {
                throw new ForbidenRoleException("superAdmin")
            }

            return next()
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkSuperAdminOrAdminRole(req, res, next) {
        try {
            const currentUser = req.currentUser

            if (currentUser.role !== roles.SUPERADMIN && currentUser.role !== roles.ADMIN) {
                throw new ForbidenRoleException("superAdmin or admin")
            }

            return next()

        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async checkSuperAdminOrAdminOrManagerRole(req, res, next) {
        try {
            const currentUser = req.currentUser
            if (currentUser.role !== roles.SUPERADMIN && currentUser.role !== roles.ADMIN && currentUser.role !== roles.MANAGER) {
                throw new ForbidenRoleException("superAdmin or admin or manager")
            }
            
            return next()
        } catch (error) {
            const resData = new ResData(error.message || "Server error", error.statusCode || 500, null, error);
            res.status(resData.statusCode).json(resData);
        }
    }
}

module.exports = AuthorizationMiddleware