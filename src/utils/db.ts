import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection success');
  } catch (err) {
    console.error('Hiba az adatbázis kapcsolatban:', err);
  }
};

testConnection();

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('db synced');
  } catch (error) {
    console.error('Hiba az adatbázis szinkronizálása során:', error);
  }
};

syncDatabase();

export default sequelize;
