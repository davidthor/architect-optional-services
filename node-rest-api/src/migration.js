exports.runMigration = async (sequelize, logger) => {
  const DB_NAME = sequelize.getDatabaseName();

  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS "${DB_NAME}"`);
  } catch (err) {
    // To make this compatible with most database backends we do not want
    // to crash here when running a raw query. The `sequelize sync` will catch
    // the same issues.
  }

  try {
    await sequelize.sync();
  } catch (error) {
    logger.error(`Sequelize sync failed\n${error}`);
    throw error;
  }
};
