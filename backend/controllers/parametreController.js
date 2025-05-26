const User = require('../models/user'); 

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
  
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;

      if (updates.password || updates._id || updates.createdAt) {
        return res.status(400).json({ message: 'Modification interdite sur certains champs' });
      }
  
      if (updates.email) {
        const existingUser = await User.findOne({ email: updates.email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        {
          new: true,
          runValidators: true
        }
      ).select('-password');
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      console.log('✅ Utilisateur mis à jour :', updatedUser);
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error('❌ Erreur dans updateUser :', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  