/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */


var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        "associatedApplications": [
          {
            "applicationId": process.env.CLIENT_ID
          }
        ]
      });
});

module.exports = router;