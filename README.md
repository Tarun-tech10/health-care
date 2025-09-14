# Healthcare Connect Platform

A comprehensive healthcare platform that connects patients with healthcare providers, featuring user authentication, appointment scheduling, and communication tools.

## Features

- **User Authentication**: Separate login systems for patients and doctors
- **Dashboard**: Personalized dashboards for both patients and healthcare providers
- **Appointment Management**: Schedule and manage medical appointments
- **Email Integration**: Automated email notifications using Nodemailer
- **Responsive Design**: Modern, mobile-friendly interface with dark mode support
- **Real-time Communication**: Connect with healthcare agents

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Email Service**: Nodemailer with Gmail integration
- **Styling**: Custom CSS with dark mode support

## Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)
- Gmail account with App Password (for email functionality)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lakshyachaudhary499/health-care.git
cd health-care
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `env.example` to `.env`
   - Update the following variables:
     ```
     GMAIL_USER=your-email@gmail.com
     GMAIL_PASS=your-app-password
     PORT=3000
     NODE_ENV=production
     ```

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GMAIL_USER` | Gmail address for sending emails | `your-email@gmail.com` |
| `GMAIL_PASS` | Gmail App Password | `your-app-password` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `production` |

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration (Flask server)

### Communication
- `POST /api/connect-agent` - Send message to healthcare agent

### Static Routes
- `GET /` - Home page
- `GET /patient-dashboard` - Patient dashboard
- `GET /doctor-dashboard` - Doctor dashboard
- `GET /services` - Services page
- `GET /about` - About page

## Deployment

### Using Docker

1. Build the Docker image:
```bash
docker build -t healthcare-connect .
```

2. Run the container:
```bash
docker run -p 3000:3000 -e GMAIL_USER=your-email@gmail.com -e GMAIL_PASS=your-app-password healthcare-connect
```

### Using Railway/Railpack

The project includes a `railpack-plan.json` configuration file for easy deployment on Railway or similar platforms.

### Environment Setup

Make sure to set the following environment variables in your deployment platform:
- `GMAIL_USER`
- `GMAIL_PASS`
- `PORT` (optional, defaults to 3000)
- `NODE_ENV` (optional, defaults to production)

## Project Structure

```
health-care-1/
├── server.js              # Main Express server
├── package.json           # Node.js dependencies and scripts
├── railpack-plan.json     # Railway deployment configuration
├── Dockerfile            # Docker configuration
├── .mise.toml            # Mise tool configuration
├── env.example           # Environment variables template
├── index.html            # Home page
├── patient-dashboard.html # Patient dashboard
├── doctor-dashboard.html  # Doctor dashboard
├── services.html         # Services page
├── about.html            # About page
├── styles.css            # Main stylesheet
├── dashboard.css         # Dashboard-specific styles
├── services.css          # Services page styles
├── about.css             # About page styles
├── script.js             # Main JavaScript functionality
├── dashboard.js          # Dashboard functionality
├── doctor-dashboard.js   # Doctor dashboard functionality
├── services.js           # Services page functionality
├── theme.js              # Dark mode functionality
├── darkMode.js           # Dark mode toggle
├── users.json            # User database (Flask server)
├── server.py             # Flask server for user management
└── requirements.txt      # Python dependencies
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm run build` - Build the application (no build step required)
- `npm test` - Run tests (no tests specified)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email your-email@gmail.com or create an issue in the repository.

## Acknowledgments

- Express.js community for the excellent framework
- Nodemailer for email functionality
- All contributors who helped improve this project