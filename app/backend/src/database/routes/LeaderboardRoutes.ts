import { Router } from 'express';

import LeaderboardController from '../controllers/LeaderboradController';
import LeaderboardService from '../services/LeaderboardService';

import Matches from '../models/Matches';
import Teams from '../models/Teams';

const router = Router();

const leaderboardService = new LeaderboardService(Matches, Teams);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/:team', leaderboardController.getLeaderboard);

export default router;
