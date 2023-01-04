const winston = require('winston');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { runMigration } = require('./migration');

const port = process.env.PORT;

const start = async () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'api' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${__dirname}/../logs/backend.log` }),
    ],
  });

  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${reason.message}`)
    process.exit(1)
  })

  const sequelize = new Sequelize(process.env.DB_ADDR, {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    retry: {
      max: 10,
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionRefusedError,
      ],
    },
  });

  const Items = sequelize.define('Item', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });

  console.log('Running migration...');
  await runMigration(sequelize, logger);
  console.log('Ran migration.');

  app.get('/', async (req, res) => {
    logger.info('GET /items');
    const rows = await Items.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    return res.status(200).json(rows);
  });

  app.get('/items', async (req, res) => {
    logger.info('GET /items');
    const rows = await Items.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    return res.status(200).json(rows);
  });

  app.post('/items', async (req, res) => {
    logger.info('POST /items');
    try {
      await sequelize.transaction(async (t) => {
        const item = await Items.create({
          name: req.body.name,
          rating: req.body.rating,
        }, {
          transaction: t,
        });
        return res.status(200).json(item);
      });
    } catch (err) {
      return res.status(409).json({ errors: err.errors });
    }
  });

  app.put('/items', async (req, res) => {
    try {
      logger.info('PUT /items');

      const { id, name } = req.body;
      logger.info(`id: ${id}, name: ${name}`);

      await sequelize.transaction(async (t) => {
        const item = await Items.update(
          { name },
          { returning: true, where: { id } },
          { transaction: t },
        );
        return res.status(200).json(item);
      });
    } catch (err) {
      return res.status(500).json({ errors: err.errors });
    }
  });

  app.delete('/items/:id', async (req, res) => {
    try {
      logger.info('DELETE /items');

      const { id } = req.params;

      await sequelize.transaction(async (t) => {
        const rows = await Items.destroy(
          {
            where: { id },
          },
          { transaction: t },
        );
        return rows ? res.status(204).end() : res.status(404).end();
      });
    } catch (err) {
      return res.status(500).json({ errors: err.errors });
    }
  });

  app.all('*', (req, res) => {
    res.status(200).json([]);
  });

  return app.listen(port, () => {
    logger.info(`> Listening on port: ${port}`);
  });
};

start();
