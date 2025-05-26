const { Store, Rating } = require('../models');

exports.getStores = async (req, res) => {
  const stores = await Store.findAll({ include: [Rating] });
  const data = await Promise.all(stores.map(async store => {
    const avg = store.Ratings.length ? store.Ratings.reduce((a, b) => a + b.value, 0) / store.Ratings.length : null;
    const userRating = await Rating.findOne({ where: { StoreId: store.id, UserId: req.user.id } });
    return {
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating: avg,
      yourRating: userRating?.value || null,
    };
  }));
  res.json(data);
};

exports.submitRating = async (req, res) => {
  const { storeId, value } = req.body;
  const existing = await Rating.findOne({ where: { UserId: req.user.id, StoreId: storeId } });
  if (existing) {
    existing.value = value;
    await existing.save();
    return res.json({ message: 'Rating updated' });
  }
  await Rating.create({ value, StoreId: storeId, UserId: req.user.id });
  res.status(201).json({ message: 'Rating submitted' });
};
