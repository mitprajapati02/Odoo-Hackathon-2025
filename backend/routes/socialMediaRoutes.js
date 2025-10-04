import express from 'express';
import {
  createSocialMediaApp,
  getAppsByUser,
  removeApp,
  getAppById,
  getTasksByUser,
  updateBio,
  updateProfile,
  forAdminPanelLol,
} from '../controllers/socialMediaController.js';

const router = express.Router();

router.post('/socialApp', createSocialMediaApp);
router.get('/socialApps/', getAppsByUser);
router.delete('/socialApp/:appId', removeApp);
router.get('/socialApp/:appId', getAppById);
router.get('/tasks', getTasksByUser);
router.put('/socialApp/updateBio', updateBio);
router.patch('/socialApp/updateProfile', updateProfile);
router.get('/lol', forAdminPanelLol);

export default router;
