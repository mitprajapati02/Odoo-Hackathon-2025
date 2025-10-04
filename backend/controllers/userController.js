import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const getUserProfile = async (req, res) => {
  try {
    // Step 1: Get token from request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    // Step 2: Find the user and populate social media apps
    const user = await User.findOne({ token })
      .select('-password -token') // Exclude password & token
      .populate('socialMediaApps', 'mediaName _id ') // Populate apps
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 3: Format social media apps with icons
    const formattedApps = user.socialMediaApps.map((app) => ({
      id: app._id,
      platform: app.mediaName,
      icon: getPlatformIcon(app.mediaName),
    }));

    // Step 4: Send user data along with their social media apps
    res.json({
      user,
      apps: formattedApps,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

function getPlatformIcon(platform) {
  const icons = {
    Facebook: 'bi bi-facebook',
    Instagram: 'bi bi-instagram',
    Twitter: 'bi bi-twitter',
    LinkedIn: 'bi bi-linkedin',
    YouTube: 'bi bi-youtube',
  };
  return icons[platform] || 'bi bi-globe';
}

const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ token })
      .select('-password -token')
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profession = req.body.profession || user.profession;
    user.age = req.body.age || user.age;

    // Update profile picture if a new file is uploaded
    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        profession: updatedUser.profession,
        profilePic: updatedUser.profilePic, // Return updated profile picture
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ token })
      .select('-password -token')
      .exec();
    if (user) {
      user.password = req.body.password;
      const updatedUser = await user.save();
      res.json({
        message: 'Password updated successfully',
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          profession: updatedUser.profession,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, token } = req.body;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized. No token provided.' });
    }

    // Find user by token
    const user = await User.findOne({ token });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found or invalid token.' });
    }

    // Verify if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Current password is incorrect.' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${user.token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'craftora7@gmail.com',
        pass: 'tdtg gdwm ujbg uyuz', // Use App Password
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL issue
      },
    });

    const mailOptions = {
      from: 'craftora7@gmail.com',
      to: user.email,
      subject: 'Reset Your Password',
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <p><a href="${resetLink}" style="color: blue;">Reset Password</a></p>
        <p>If you didn't request this, ignore this email.</p>
        <p>Thanks,<br/>Your App Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Reset link sent to your email' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'Token is valid' });
};


export {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  changePassword,
  resetPassword,
  forgotPassword,
  checkToken,
};
