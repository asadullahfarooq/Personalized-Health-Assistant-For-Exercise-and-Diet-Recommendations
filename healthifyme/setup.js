const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up HealthifyMe...\n');

// Function to run commands
function runCommand(command, cwd) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    return false;
  }
}

// Function to create .env file
function createEnvFile() {
  const envContent = `# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/healthifyme

# JWT Secret Key (change this to a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
`;

  const envPath = path.join(__dirname, 'healthifyme-backend', '.env');
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file in backend directory');
  } else {
    console.log('⚠️  .env file already exists in backend directory');
  }
}

// Main setup process
async function setup() {
  console.log('📦 Installing backend dependencies...');
  if (!runCommand('npm install', 'healthifyme-backend')) {
    console.error('❌ Failed to install backend dependencies');
    process.exit(1);
  }

  console.log('\n📦 Installing frontend dependencies...');
  if (!runCommand('npm install', 'healthifyme')) {
    console.error('❌ Failed to install frontend dependencies');
    process.exit(1);
  }

  console.log('\n🔧 Creating environment file...');
  createEnvFile();

  console.log('\n✅ Setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Start MongoDB server');
  console.log('2. Start backend: cd healthifyme-backend && npm run dev');
  console.log('3. Start frontend: cd healthifyme && npm start');
  console.log('4. Open Expo Go app on your device or use simulator');
}

setup().catch(console.error); 