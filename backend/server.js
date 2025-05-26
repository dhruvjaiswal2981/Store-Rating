require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
