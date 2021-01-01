const { Router } = require('express');
const formController = require('../controllers/formController');

const router = Router();

router.post('/getform', formController.get_form);
router.post('/deleteform', formController.delete_form);
router.post('/submitform', formController.submit_form);
router.post('/saveform', formController.save_form);
router.post('/updateform', formController.update_form);

module.exports = router;