import express from 'express';
const router = express.Router();

import { getPlanning, addPlanning } from '../controllers/reservation.js';

router.get('/:fastfoodId/plan-get', getPlanning);
router.post('/:fastfoodId/plan-add', addPlanning);
router.delete('/:fastfoodId/plan-del');

export default router