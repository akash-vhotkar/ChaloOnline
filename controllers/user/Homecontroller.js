const generateUniqueId = require('generate-unique-id');

const Homecontroller = () => {
    return {
        indexpage(req, res) {
            const id = generateUniqueId({
                useLetters: false,
                length: 8
            });
            res.send("C0" + id);
        },
        notFound(req, res) {
            res.send("Not found");
        }
    }
}


module.exports = Homecontroller;