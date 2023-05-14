class UserUtils {
    static GetMyRole(req) {
        let result = '';
        if (req.user) {
            result = req.user.role; // assuming role is stored in the req.user object
        }
        return result;
    }

    static LoggedInUser(req) {
        let result = '';
        if (req.user) {
            result = req.user.id; // assuming id is stored in the req.user object
        }
        return result;
    }

    static UserEmail(req) {
        let result = '';
        if (req.user) {
            result = req.user.email; // assuming email is stored in the req.user object
        }
        return result;
    }
}

export default UserUtils;