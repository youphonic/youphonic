const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const rootPath = path.join(__dirname, '..', '..');
const publicPath = path.join(rootPath, 'public');
const nodeModulesPath = path.join(rootPath, 'node_modules');

router.use(express.static(rootPath));
router.use(express.static(publicPath));
router.use(express.static(nodeModulesPath));
