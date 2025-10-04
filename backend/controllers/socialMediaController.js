


import mongoose from 'mongoose';
import SocialMediaApp from '../models/SocialMediaApp.js';
import User from '../models/user.js';

// Utility function to decode token and get userId
const getUserIdFromToken = async (token) => {
  try {
    const user = await User.findOne({ token })
      .select('-password -token')
      .exec();
    if (user) {
      return user._id;
    }
  } // eslint-disable-next-line no-unused-vars
  catch (error) {
    throw new Error('Invalid or expired token');
  }
};

async function createSocialMediaApp(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const userId = await getUserIdFromToken(token);

    const {
      mediaName,
      inMediaUsername,
      bio = '',
      states = {},
      values = {},
      tags = [],
      url = '',
    } = req.body;

    if (!mediaName || !inMediaUsername) {
      return res
        .status(400)
        .json({ error: 'mediaName and inMediaUsername are required.' });
    }

    const socialApp = new SocialMediaApp({
      user: userId,
      mediaName,
      inMediaUsername,
      bio,
      states,
      values,
      tags,
      url,
    });

    await socialApp.save();

    await User.findByIdAndUpdate(userId, {
      $push: { socialMediaApps: socialApp._id },
    });

    // Step 7: Respond with the newly created social media app
    res.status(201).json(socialApp);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getAppsByUser(req, res) {
  try {

    const token = req.headers.authorization.split(' ')[1];


    const userId = await getUserIdFromToken(token);


    const apps = await SocialMediaApp.find({ user: userId })
      .populate('reminders') 
      .populate('todoLists');
    
    const user = await User.findById(userId)


    const formattedResponse = apps.map((app) => ({
      id: app._id, 
      platform: app.mediaName,
      icon: getPlatformIcon(app.mediaName),
      tasks: app.todoLists.at(0)?.tasks || [],
      profilePic : user.profilePic,
    }));

    // Step 5: Send formatted response
    res.json(formattedResponse);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getTasksByUser(req, res) {
  try {
    // Step 1: Get token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Step 2: Extract userId from the token
    const userId = await getUserIdFromToken(token);

    // Step 3: Fetch SocialMediaApp documents for the user
    const apps = await SocialMediaApp.find({ user: userId })
      .populate('reminders') // Populate reminders
      .populate('todoLists'); // Populate todoLists

    // Step 4: Filter apps that have both reminders and tasks
    let filteredApps = apps.filter(
      (app) => app.reminders.length > 0 || app.todoLists.length > 0
    );

    // Step 5: Select up to 3 random apps from the filtered list
    if (filteredApps.length > 3) {
      filteredApps = filteredApps.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    // Step 6: Format the response
    const formattedResponse = filteredApps.map((app) => ({
      id: app._id,
      platform: app.mediaName,
      tasks: app.todoLists.at(0)?.tasks.slice(0, 2) || [], // Get first 2 tasks
      reminders: app.reminders.slice(0, 2) || [], // Get first 2 reminders
    }));

    // Step 7: Send formatted response
    res.json(formattedResponse);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Utility function to get icons based on platform name
function getPlatformIcon(platform) {
  const icons = {
    Facebook: 'bi bi-facebook',
    Instagram: 'bi bi-instagram',
    Twitter: 'bi bi-twitter',
    LinkedIn: 'bi bi-linkedin',
    YouTube: 'bi bi-youtube',
  };
  return icons[platform] || 'bi bi-globe'; // Default icon if not found
}

async function getAppById(req, res) {
  try {
    const { appId } = req.params;

    // Step 1: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(appId)) {
      return res.status(400).json({ error: 'Invalid app ID format' });
    }

    // Step 2: Find the SocialMediaApp by ID
    const app = await SocialMediaApp.findById(appId)
      .populate('reminders') // Populate reminders
      .populate('todoLists'); // Populate todoLists

    // Step 3: Check if the app exists
    if (!app) {
      return res.status(404).json({ error: 'SocialMediaApp not found' });
    }

    // Step 4: Send the formatted response
    res.status(200).json({
      id: app._id,
      mediaName: app.mediaName,
      inMediaUsername: app.inMediaUsername,
      bio: app.bio || '',
      states: app.states || {},
      values: app.values || {},
      tags: app.tags || [],
      reminders: app.reminders || [],
      todoLists: app.todoLists || [],
      url: app.url || '',
      createdAt: app.createdAt,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in getAppById:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function removeApp(req, res) {
  try {
    const app = await SocialMediaApp.findById(req.params.appId);

    if (!app) {
      return res.status(404).json({ error: 'SocialMediaApp not found' });
    }

    // Remove the app from the user's socialMediaApps array
    const userUpdate = User.findByIdAndUpdate(
      app.user,
      { $pull: { socialMediaApps: app._id } },
      { new: true }
    );

    // Corrected: Use deleteOne() instead of delete()
    const appDelete = SocialMediaApp.deleteOne({ _id: app._id });

    // Run both operations concurrently
    await Promise.all([userUpdate, appDelete]);

    res.json({ message: 'App deleted successfully' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function updateBio(req, res) {
  try {
    const appId = req.headers.authorization.split(' ')[1];

    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({ error: 'bio is required.' });
    }

    const updatedAppBio = await SocialMediaApp.findByIdAndUpdate(
      appId,
      { bio },
      { new: true }
    );

    res.status(200).json(updatedAppBio);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const appId = req.headers.authorization.split(' ')[1];

    const {
      mediaName = '',
      inMediaUsername = '',
      states = {},
      values = {},
      url = '',
    } = req.body;

    const updatedAppProfile = await SocialMediaApp.findByIdAndUpdate(
      appId,
      { mediaName, inMediaUsername, states, values, url },
      { new: true }
    );
    await updatedAppProfile.save();
    const socialApp = await SocialMediaApp.findById(appId);
    res.status(201).json(socialApp);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function forAdminPanelLol(req, res) {
  try {
    // Ensure token is present
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Extract user ID
    const userId = await getUserIdFromToken(token);
    console.log("Extracted User ID:", userId);

    // Fetch social media apps for the user
    const apps = await SocialMediaApp.find({ user: userId })
      .populate('reminders')
      .populate('todoLists');


    // Ensure apps is an array
    if (!Array.isArray(apps)) {

      return res.status(500).json({ error: "Unexpected response format from database." });
    }

    res.json(apps); // ✅ Send as JSON response

  } catch (error) {
    console.error("Error in forAdminPanelLol:", error);
    res.status(500).json({ error: error.message });
  }
}


export {
  createSocialMediaApp,
  getAppsByUser,
  removeApp,
  getAppById,
  getTasksByUser,
  updateBio,
  updateProfile,
  forAdminPanelLol,
};
