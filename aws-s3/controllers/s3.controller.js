const uuidV4 = require('uuid').v4;
const s3Service = require('../services/s3.service');

module.exports = {
    getAvatar: async (req, res, next) => {
        try {
            const uploadedData = await s3Service.uploadPublicFile(req.files.avatar, 'user', uuidV4());
            res.json(uploadedData.Location);
        } catch (e) {
            next(e);
        }
    },

    uploadAvatar: async (req, res, next) => {
        try {
            const path = require('node:path');
            const {avatar} = req.files;

            const ext = path.extname(avatar.name);
            const uploadPath = path.join(process.cwd(), 'static', `${uuidV4()}${ext}`);

            avatar.mv(uploadPath, (err) => {
                if (err) {
                    throw err;
                }
            });

            const {data: _, ...rest} = avatar;

            res.json(rest);
        } catch (e) {
            next(e);
        }
    },
};
