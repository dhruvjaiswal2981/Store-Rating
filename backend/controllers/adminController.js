const { User, Store, Rating } = require('../models');

exports.dashboard = async (req, res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();
  res.json({ users, stores, ratings });
};

exports.createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed, address, role });
  res.status(201).json({ message: 'User created' });
};

exports.createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  await Store.create({ name, email, address, UserId: ownerId });
  res.status(201).json({ message: 'Store added' });
};

exports.listStores = async (req, res) => {
  const stores = await Store.findAll({ include: [{ model: Rating }] });
  res.json(stores.map(store => ({
    ...store.toJSON(),
    rating: store.Ratings.length ? store.Ratings.reduce((a, r) => a + r.value, 0) / store.Ratings.length : null,
  })));
};

exports.listUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
