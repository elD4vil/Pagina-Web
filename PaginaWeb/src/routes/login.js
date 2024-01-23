// En tu archivo login.js
const express = require('express');

const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/', LoginController.inicio); // Cambia '/login' por '/' si quieres que sea la ruta principal
router.get('/index', LoginController.index);
router.get('/register', LoginController.register);
router.post('/auth', LoginController.auth);
router.get('/inicio', LoginController.inicio);
router.get('/subirM', LoginController.subirM);
router.post('/subir', LoginController.subir);
router.get('/subirA', LoginController.subirA);
router.post('/subir1', LoginController.subir1);
router.get('/descargarM', LoginController.descargarM);
router.get('/descargarA', LoginController.descargarA);
router.get('/verManuales', LoginController.verManuales);
router.post('/login/destroy', LoginController.destroy);
router.get('/verAplicaciones', LoginController.verAplicaciones);
router.post('/login/destroy1', LoginController.destroy1);
router.get('/login/descargarArchivo/:id', LoginController.descargarArchivo);
router.get('/login/descargarArchivo1/:id', LoginController.descargarArchivo1);


module.exports = router;
