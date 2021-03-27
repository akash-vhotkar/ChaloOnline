const Homecontroller = () => {
    return {
        indexpage(req, res) {
            res.send("hello amdin home page");
        },
        notFound(req, res) {
            res.send("Not found");
        }
    }
}

module.exports = Homecontroller;