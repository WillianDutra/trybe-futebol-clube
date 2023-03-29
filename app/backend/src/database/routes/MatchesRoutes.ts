import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import Matches from '../models/Matches';

const router = Router();
const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.getAllMatches);

export default router;
