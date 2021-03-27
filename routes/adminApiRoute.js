const router = require('express').Router();
const Homecontroller = require('../controllers/admin/Homecontroller');

router.get('/', Homecontroller().indexpage);
router.get('*', Homecontroller().notFound);


module.exports = router;
