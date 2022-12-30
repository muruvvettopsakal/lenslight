import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

router.route('/').get( pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/logout').get(pageController.getLogout);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendMail);
router.route('/blog').get(pageController.getblogPage);
router.route('/contact').get(pageController.getcontactPage);
router.route('/photos').get(pageController.getphotosPage);
router.route('/projects').get(pageController.getprojectsPage);
router.route('/services').get(pageController.getservicesPage);



export default router;