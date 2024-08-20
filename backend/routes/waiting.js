import express from 'express';
const router = express.Router();

import auth from '../middlewares/auth.js';

import { getPlanning, addPlanning, confirmPlanning, deletePlanning, editPlanning } from '../controllers/waiting.js';

router.get('/:fastfoodId/plan-get', getPlanning);
router.post('/:fastfoodId/plan-add', auth, addPlanning);
router.put('/:fastfoodId/plan-verif', auth, confirmPlanning);
router.delete('/:fastfoodId/plan-del', auth, deletePlanning);
router.put('/:fastfoodId/plan-edit', auth, editPlanning);

export default router