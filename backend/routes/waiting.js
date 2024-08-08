import express from 'express';
const router = express.Router();

import { getPlanning, addPlanning, confirmPlanning, deletePlanning, editPlanning } from '../controllers/waiting.js';

router.get('/:fastfoodId/plan-get', getPlanning);
router.post('/:fastfoodId/plan-add', addPlanning);
router.put('/:fastfoodId/plan-verif', confirmPlanning);
router.delete('/:fastfoodId/plan-del', deletePlanning);
router.put('/:fastfoodId/plan-edit', editPlanning);

export default router