
const Homecontroller = () => {
    return {
        indexpage(req, res) {
            res.send("hello");
        },
        notFound(req, res) {
            res.send("Not found");
        }
    }
}


module.exports = Homecontroller;