const { execSync } = require('child_process');
const fs = require('fs');

// Load environment variables only in development
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('VERCEL:', process.env.VERCEL ? 'Yes' : 'No');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if we're in production (Vercel sets this)
const isProduction = process.env.NODE_ENV === 'production' ||
                     process.env.VERCEL === '1' ||
                     process.env.VERCEL_ENV;

console.log('Build environment:', isProduction ? 'production' : 'development');

try {
  if (isProduction) {
    console.log('Setting up production schema...');
    // Change schema to PostgreSQL for production
    let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
    schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
    fs.writeFileSync('prisma/schema.prisma', schema);

    console.log('Running production build...');
    // Generate Prisma client
    execSync('npx prisma generate', { stdio: 'inherit' });
    // In production, run migrations and seed
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    execSync('npm run db:seed', { stdio: 'inherit' });
  } else {
    console.log('Running development build...');
    // In development, just push schema
    execSync('npx prisma db push', { stdio: 'inherit' });
  }

  // Always run Next.js build
  execSync('next build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}