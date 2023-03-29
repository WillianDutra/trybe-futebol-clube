import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import Matches from '../models/Matches';

import TeamService from '../services/TeamService';
import Teams from '../models/Teams';

import validateToken from '../middlewares/validateToken';

const router = Router();

const teamService = new TeamService(Teams);

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService, teamService);

router.get('/', matchesController.getAllMatches);
router.patch('/:id/finish', validateToken, matchesController.finishMatch);
router.patch('/:id', validateToken, matchesController.updateMatch);
router.post('/', validateToken, matchesController.createMatch);

export default router;
