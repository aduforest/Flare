const { ValidateProps } = require('../../../api-lib/constants');
const { updateUserPasswordByOldPassword } = require('../../../api-lib/db');
const { auths, validateBody } = require('../../../api-lib/middlewares');
const { getMongoDb } = require('../../../api-lib/mongodb');
const express = require('express');
const router = express.Router();

// Middleware for authentication
router.use(...auths);

// PUT handler to update password
router.put(
  validateBody({
    type: 'object',
    properties: {
      oldPassword: ValidateProps.user.password,
      newPassword: ValidateProps.user.password,
    },
    required: ['oldPassword', 'newPassword'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const { oldPassword, newPassword } = req.body;

    const success = await updateUserPasswordByOldPassword(
      db,
      req.user._id,
      oldPassword,
      newPassword
    );

    if (!success) {
      return res.status(401).json({
        error: { message: 'The old password you entered is incorrect.' },
      });
    }

    res.status(204).end();
  }
);

module.exports = router;
