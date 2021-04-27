const jwt = require('jsonwebtoken');
const registerModal = require('../model/registration');

const validatetoken = async (req, res, next) => {
    try {
        const token = req.headers.authrization.split(" ")[1];
        const userinfo = jwt.verify(token, process.env.JWT_SECRET);
        if (!userinfo) {
            return res.status(500).json({ errors: [{ message: "Token not provided", status: false }] });
        }
        const isuserexist = await registerModal.findById(userinfo.user._id);
        if(isuserexist){
            req.user = userinfo.user;
            next();
        }else{
            return res.status(500).json({ errors: [{ message: "Logout and Login again", status: false, errs: error }] });
        }
    } catch (error) {
        return res.status(500).json({ errors: [{ message: "Token is expire or invalid", status: false, errs: error }] });
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwODY3NzRkOWRhMDI4NjZlYzI1NTM1OSIsIm5hbWUiOiJhcnVuIiwiZW1haWwiOiJhcnVuQGdtYWlsLmNvbSIsInBob25lIjo5ODQ4NTQ4NDg0LCJpZCI6IkMwNTU3MTI1NTEiLCJpc1BheW1lbnRkb25lIjpmYWxzZX0sImlhdCI6MTYxOTQyNTEzMX0.M35SWc8Q21MhkgYO1MimcrTGIAwDiztV-hX7rYwK-0g
module.exports = validatetoken;
