const Authcontroller = () => {
    return {
        login(req, res) {
            res.send("hello from login");
        },

        register(req, res) {
            res.send("register");
        }
    };
}

module.exports = Authcontroller;