// Deployment configuration
const deploymentConfig = {
  name: 'healthcare-connect',
  port: process.env.PORT || 3000,
  environment: {
    NODE_ENV: 'production',
    GMAIL_USER: process.env.GMAIL_USER || 'your-email@gmail.com',
    GMAIL_PASS: process.env.GMAIL_PASS || 'your-app-password'
  }
};

console.log('Deployment configuration:', deploymentConfig);
console.log('Ready for deployment!');
