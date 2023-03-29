import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';
import Teams from '../models/Teams';

const router = Router();
const teamService = new TeamService(Teams);
const teamController = new TeamController(teamService);

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);

export default router;
