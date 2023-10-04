import express from 'express';
import User from '../models/User.ts';
import { changeBio, changeFullName, changeUserName, checkUserNameUniqueness } from '../controllers/settings.ts';

const router = express.Router();

router.put('/change-bio', changeBio);
router.put('/change-full-name', changeFullName);
router.put('/change-user-name', changeUserName);
router.get('/check-user-name-uniqueness', checkUserNameUniqueness);
export default router