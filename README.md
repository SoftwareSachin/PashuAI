# Pashu AI - Agricultural Intelligence Platform

## Overview
AI-Powered Agricultural Intelligence platform with multilingual support, user authentication, and comprehensive admin analytics.

## Features

### 🌾 Core Features
- Multilingual AI advisory (20+ Indian languages)
- Crop management guidance
- Livestock care assistance
- Disease detection
- Real-time market insights
- Weather information

### 🔐 Authentication System
- User signup with email and phone number
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Session management
- Protected routes

### 📊 User Query Tracking
- All user questions automatically tracked
- Complete conversation history per user
- Linked to user accounts in database
- Real-time data collection

### 👨‍💼 Admin Dashboard
- View all registered users
- See user emails and phone numbers
- Track all user queries and conversations
- Real-time analytics
- Secure admin access with password protection

## Technology Stack

### Frontend
- React 18
- TypeScript
- Wouter (routing)
- TanStack Query (data fetching)
- Shadcn UI + Tailwind CSS
- Framer Motion (animations)

### Backend
- Node.js 20
- Express.js
- JWT authentication
- bcryptjs (password hashing)

### Database
- PostgreSQL (Neon)
- Drizzle ORM
- Database schema with users, conversations, and messages

### AI
- Google Gemini API
- Multilingual support

## Database Schema

```sql
-- Users table
users:
  - id (UUID)
  - email (unique)
  - phone (unique)
  - passwordHash
  - name
  - createdAt
  - updatedAt

-- Conversations table (linked to users)
conversations:
  - id (UUID)
  - userId (FK → users)
  - language
  - createdAt

-- Messages table (user questions & AI responses)
messages:
  - id (UUID)
  - conversationId (FK → conversations)
  - role (user/assistant)
  - content
  - createdAt
```

## Environment Variables

### Required for Development (Replit)
```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_random_secret_key
ADMIN_PASSWORD=your_admin_password
```

### Required for Production (Vercel)
```env
DATABASE_URL=your_neon_postgresql_url
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_random_secret_key (same as dev)
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env` file with required variables listed above.

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```
Server runs on http://localhost:5000

### 5. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

## User Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration

### Protected Routes (Requires Login)
- `/chat` - AI chat interface
- `/profile` - User profile and chat history

### Admin Routes (Requires Admin Password)
- `/admin` - Admin dashboard
  - View all registered users
  - See user emails and phone numbers
  - Track all user queries
  - Real-time analytics

## How It Works

### User Flow
1. **Signup**: User visits `/signup` and registers with email + phone number
2. **Login**: User logs in with email and password
3. **Chat**: User asks questions to AI bot at `/chat`
4. **Tracking**: All questions automatically saved with user ID in database
5. **History**: User can view their own chat history

### Admin Flow
1. **Access**: Admin visits `/admin` 
2. **Login**: Enter admin password
3. **Dashboard**: View all users and their data:
   - User email addresses
   - Phone numbers
   - All questions asked
   - Conversation timestamps
4. **Real-time**: Data updates automatically as users interact

### Authentication Flow
1. User submits login credentials
2. Backend verifies password (bcrypt comparison)
3. Server generates JWT token
4. Token stored in HTTP-only cookie
5. All subsequent requests include token
6. Protected routes verify token before access

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Chat
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/:id` - Get conversation
- `POST /api/messages` - Send message

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users
- `GET /api/admin/queries` - Get all user queries

### Data
- `GET /api/weather/:location` - Get weather data
- `GET /api/market-prices` - Get market prices
- `GET /api/crops` - Get crop recommendations

## Security Features

### Password Security
- Passwords hashed with bcryptjs (12+ rounds)
- Never stored in plain text
- Secure comparison during login

### JWT Tokens
- Signed with secret key
- Short expiration time
- HTTP-only cookies (prevents XSS)
- Secure flag in production

### Database Security
- Unique constraints on email and phone
- Foreign key relationships
- Cascade deletes for data integrity
- Environment-based connection strings

### Admin Protection
- Separate admin authentication
- Password-protected dashboard
- Role-based access control

## Data Tracking

### What Gets Tracked
✅ User email and phone number (from signup)
✅ All questions asked to AI bot
✅ Complete conversation history
✅ Timestamps for all interactions
✅ User registration date

### What Admin Can See
- Complete list of registered users
- User contact information (email, phone)
- Every question each user has asked
- When questions were asked
- Full conversation threads

### Privacy Considerations
- User data stored securely in database
- Passwords properly hashed
- Admin access protected
- HTTPS in production (Vercel)

## Production Deployment (Vercel)

### Advantages
- ✅ Same codebase for dev and production
- ✅ Same PostgreSQL database (Neon)
- ✅ JWT works identically
- ✅ All features work the same
- ✅ Admin dashboard accessible

### Access in Production
- Main app: `yourdomain.vercel.app`
- Login: `yourdomain.vercel.app/login`
- Signup: `yourdomain.vercel.app/signup`
- Chat: `yourdomain.vercel.app/chat`
- Admin: `yourdomain.vercel.app/admin`

### Environment Setup
1. Deploy to Vercel
2. Add environment variables in Vercel dashboard
3. Connect to Neon PostgreSQL database
4. All features work immediately

## Development vs Production

Both environments work identically:

| Feature | Development (Replit) | Production (Vercel) |
|---------|---------------------|---------------------|
| Database | Neon PostgreSQL | Same Neon PostgreSQL |
| Authentication | JWT tokens | Same JWT tokens |
| User tracking | Automatic | Automatic |
| Admin dashboard | `/admin` route | Same `/admin` route |
| API endpoints | Same routes | Same routes |

## Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:push          # Push schema to database

# Production
npm run build           # Build for production
npm start              # Start production server

# Type checking
npm run check          # Run TypeScript checks
```

## Support

For questions or issues, contact the development team.

## License

MIT
