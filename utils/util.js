// Get the LoggedInUser Role
const getMyRole = (req) => {
    let result = '';
    if (req.user) {
        result = req.user.role; // assuming role is stored in the req.user object
    }
    return result;
};

// Get the LoggedInUser Id
const loggedInUser = (req) => {
    let result = '';
    if (req.user) {
        result = req.user.id; // assuming id is stored in the req.user object
    }
    return result;
};

// Get the LoggedInUser email id
const userEmail = (req) => {
    let result = '';
    if (req.user) {
        result = req.user.email; // assuming email is stored in the req.user object
    }
    return result;
};
