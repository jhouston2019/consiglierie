const fs = require('fs');
const path = require('path');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
];

console.log('🔍 Checking environment variables...\n');

const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local not found');
  console.log('   Run: cp .env.example .env.local');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const missing = [];

requiredVars.forEach((varName) => {
  const regex = new RegExp(`^${varName}=.+`, 'm');
  if (!regex.test(envContent)) {
    missing.push(varName);
  }
});

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:\n');
  missing.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.log('\n   Edit .env.local and add these variables.');
  process.exit(1);
}

console.log('✅ All required environment variables present\n');
