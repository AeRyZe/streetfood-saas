import express from 'express';
const router = express.Router();

import { getPlanning, addPlanning, confirmReserv, storeReserv } from '../controllers/waiting.js';

router.get('/:fastfoodId/plan-get', getPlanning);
router.post('/:fastfoodId/plan-add', addPlanning);
router.put('/:fastfoodId/plan-verif', confirmReserv);
router.put('/:fastfoodId/plan-store', storeReserv);
router.delete('/:fastfoodId/plan-del');

export default router