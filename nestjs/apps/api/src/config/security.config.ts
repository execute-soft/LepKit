import helmet from 'helmet';

export const securityConfig = () =>
  helmet({
    contentSecurityPolicy: { directives: { defaultSrc: ["'none'"] } },
    crossOriginEmbedderPolicy: false,
  });
