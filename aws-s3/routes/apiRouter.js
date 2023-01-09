const {Router} = require("express");

const {checkUploadImage} = require("../middlewares/file.middleware");
const s3Controller = require("../controllers/s3.controller");

const router = Router();

router.post('/s3', checkUploadImage, s3Controller.getAvatar);
router.post('/', s3Controller.uploadAvatar);

router.use('*', (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unexpected error',
        status: err.status || 500,
        ok: false
    });
});

module.exports = router;
