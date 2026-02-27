import { defineMiddleware } from 'astro:middleware';
import crypto from 'node:crypto';

export const onRequest = defineMiddleware(async (context, next) => {
  // CSRF token (double submit cookie pattern)
  const csrfToken = crypto.randomBytes(32).toString('hex');
  context.locals.csrfToken = csrfToken;

  const response = await next();

  // Set CSRF cookie (SameSite=Strict prevents cross-origin requests from sending it)
  response.headers.append(
    'Set-Cookie',
    `csrf_token=${csrfToken}; Path=/; HttpOnly; SameSite=Strict${import.meta.env.PROD ? '; Secure' : ''}`
  );

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Content-Security-Policy
  // Note: 'unsafe-inline' for script-src is required because Astro injects
  // inline scripts for React hydration and ViewTransitions.
  // All other directives remain strict to limit the attack surface.
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-src 'self' https://www.youtube.com https://my.matterport.com",
      "form-action 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
  );

  return response;
});
