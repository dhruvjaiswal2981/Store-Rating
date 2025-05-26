const { Rating, Store, User } = require('../models');

exports.getDashboard = async (req, res) => {
  const store = await Store.findOne({ where: { UserId: req.user.id }, include: [Rating] });
  if (!store) return res.status(404).json({ error: 'Store not found' });

  const users = await Promise.all(store.Ratings.map(async rating => {
    const user = await User.findByPk(rating.UserId);
    return { name: user.name, rating: rating.value };
  }));

  const avgRating = store.Ratings.length ? store.Ratings.reduce((a, b) => a + b.value, 0) / store.Ratings.length : null;

  res.json({ users, averageRating: avgRating });
};
