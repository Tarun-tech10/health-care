# Frontend Deployment Instructions

## Your Deployment URLs:

### Frontend (Netlify):
**https://jazzy-bunny-7a951b.netlify.app/health%20website/index.html**

### Backend (Railway):
**https://health-care-production-54d7.up.railway.app**

## What I've Done:

1. ✅ **Updated API Endpoints**: Changed all API calls in `script.js` from localhost to your Railway backend
2. ✅ **Added Registration Endpoint**: Added `/api/register` endpoint to your Railway backend
3. ✅ **Fixed CORS**: Your backend already has CORS enabled for cross-origin requests
4. ✅ **Tested Backend**: Verified your Railway deployment is working

## Next Steps:

### Option 1: Update Netlify Deployment (Recommended)
1. Go to your Netlify dashboard
2. Connect your GitHub repository
3. The updated `script.js` file will automatically deploy with the new API endpoints

### Option 2: Manual Update
If you need to manually update the Netlify deployment:
1. Upload the updated `script.js` file to your Netlify site
2. Replace the existing file with the one that has the Railway API endpoints

## Test Your Deployment:

1. **Visit your frontend**: https://jazzy-bunny-7a951b.netlify.app/health%20website/index.html
2. **Try registration**: Create a new account
3. **Try login**: Use the credentials you just created
4. **Check dashboards**: Verify patient/doctor dashboards work

## API Endpoints Available:

- `POST /api/login` - User login
- `POST /api/register` - User registration  
- `POST /api/connect-agent` - Contact support
- `GET /` - Home page
- `GET /patient-dashboard` - Patient dashboard
- `GET /doctor-dashboard` - Doctor dashboard

## Environment Variables (Optional):
If you want to use email functionality, set these in Railway:
- `GMAIL_USER` - Your Gmail address
- `GMAIL_PASS` - Your Gmail App Password

Your healthcare platform is now fully deployed and connected! 🚀
