import winston from 'winston';

const { format } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.splat(), format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === 'production') {
  // 本番時の設定
}

module.exports = logger;
