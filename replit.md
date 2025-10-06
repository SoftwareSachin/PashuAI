# PashuAI - AI-Powered Agricultural Intelligence Platform

## Overview

PashuAI is a multilingual AI agricultural advisory platform designed to empower farmers with intelligent guidance for crop management, livestock care, disease detection, and market insights. The platform provides a conversational AI interface powered by Google's Gemini AI, supporting 25+ Indian languages to make agricultural expertise accessible to farmers across India.

**Core Purpose:** Democratize agricultural knowledge through AI-powered advisory services that understand local context, support multiple languages, and provide actionable insights for farming communities.

**Technology Stack:**
- Frontend: React + TypeScript with Vite
- Backend: Express.js (Node.js)
- Database: PostgreSQL with Drizzle ORM
- AI: Google Gemini AI (gemini-2.0-flash-exp)
- UI: Shadcn/ui components with Tailwind CSS
- State Management: TanStack Query (React Query)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component-Based React Application**
- **Routing:** Wouter for lightweight client-side routing
- **Pages:** Home (landing/dashboard), Login, Signup, and Chat (conversational interface)
- **Protected Routes:** Chat page requires authentication, redirects to login if not authenticated
- **Component Library:** Shadcn/ui components providing a professional, agricultural-themed design system
- **Styling:** Tailwind CSS with custom agricultural color palette (Forest Green, Deep Teal, Slate Gray)
- **Design Philosophy:** Professional credibility through clean design, mobile-first for field use, high readability in bright conditions (no dark mode)

**State Management**
- TanStack Query for server state management and API data fetching
- Local React state for UI interactions
- Query client configured with manual refetching (staleTime: Infinity) to control data freshness

**Key UI Patterns**
- Card-based information display for agricultural data (weather, market prices, crop recommendations)
- Conversational chat interface with message history
- **Image Upload Interface:** In-chat image upload with preview, remove capability, and optional text description
- Language selector for multilingual support
- Responsive design optimized for mobile field use
- Toast notifications for errors and validation feedback

### Backend Architecture

**Express.js REST API**
- **Server Framework:** Express.js with TypeScript
- **API Design:** RESTful endpoints for conversations, messages, and AI chat
- **Development Server:** Vite middleware integration for HMR in development
- **Production Build:** ESBuild bundling for Node.js deployment

**Key API Endpoints**

**Authentication Endpoints:**
- `POST /api/auth/register` - User registration (email/phone + password)
- `POST /api/auth/login` - User login (returns JWT in cookie)
- `POST /api/auth/logout` - User logout (clears cookie)
- `GET /api/auth/me` - Get current user profile (protected)

**Chat Endpoints (All Protected):**
- `POST /api/conversations` - Create new conversation sessions (links to user)
- `GET /api/messages/:conversationId` - Retrieve message history (ownership verified)
- `POST /api/chat` - Send messages and receive AI responses (ownership verified)
- `POST /api/analyze-image` - Upload and analyze agricultural images (ownership verified)

**Frontend-only endpoints (not implemented):**
- `/api/weather`, `/api/market-prices`, `/api/crops`

**AI Integration Layer**
- Google Gemini AI integration via `@google/genai` SDK
- **Vision Analysis:** Gemini-powered image analysis for crop diseases, livestock health, pest detection, and soil conditions
- System prompt engineering for agricultural domain expertise
- Conversation history management for contextual responses
- Multilingual response generation supporting 25+ Indian languages (English, Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Bhojpuri, Magahi, Maithili, Rajasthani, Chhattisgarhi, Sindhi, Kashmiri, Nepali, Sanskrit, Konkani, Manipuri, Santali)

**Image Upload & Analysis (NEW)**
- **File Handling:** Multer middleware with memory storage (10MB limit)
- **Supported Formats:** All image formats (JPEG, PNG, WEBP, etc.)
- **Analysis Capabilities:** 
  - Crop disease detection and diagnosis
  - Livestock health assessment (cattle, buffalo, goats, sheep)
  - Pest identification
  - Nutrient deficiency detection
  - Soil quality evaluation
  - Plant growth stage analysis
- **Production-Ready:** Serverless-compatible, optimized for Vercel deployment

**Database Layer**
- **ORM:** Drizzle ORM with type-safe schema definitions
- **Connection:** Neon Serverless PostgreSQL with WebSocket support
- **Schema Design:** Conversation-based message storage with cascade deletion
- **Migration Strategy:** Drizzle Kit for schema migrations

### Data Storage Solutions


**Frontend-Only Types (No Persistence):**
- WeatherData, MarketPrice, CropRecommendation defined as TypeScript interfaces
- These represent future features not yet connected to backend data sources

**Design Rationale:**
- Simple two-table schema keeps conversation management lightweight
- Cascade deletion ensures data consistency
- UUID primary keys for distributed system compatibility
- Conversation-level language preference simplifies multilingual support

### Authentication and Authorization

**Current State:** JWT-based authentication fully implemented
- User registration with email OR phone number + password (no OTP/2FA)
- Simple login using email/phone + password
- JWT tokens stored in secure httpOnly cookies
- Protected chat routes - users must authenticate before accessing copilot
- All conversations and messages linked to user accounts

**Authentication Flow:**
1. Users sign up with email OR phone + password (min 6 characters)
2. Passwords hashed with bcryptjs (12 rounds)
3. JWT tokens generated and stored in httpOnly cookies
4. Protected routes verify JWT and user ownership
5. Authorization checks prevent cross-user data access

**Security Features:**
- JWT_SECRET required from environment (no fallback)
- Conversation ownership verification on all endpoints
- 403 Forbidden for unauthorized access attempts
- HTTP-only cookies prevent XSS attacks
- Password hashing prevents credential exposure

### External Dependencies

**Google Gemini AI**
- **Service:** Google GenAI SDK (`@google/genai`)
- **Model:** gemini-2.0-flash-exp
- **Purpose:** Core conversational AI for agricultural advisory
- **Configuration:** API key-based authentication via environment variable
- **System Instruction:** Custom prompt engineering for agricultural domain expertise covering crops, livestock, diseases, markets, and Indian agricultural context

**Neon Serverless PostgreSQL**
- **Service:** Neon Database (`@neondatabase/serverless`)
- **Purpose:** Primary data persistence layer
- **Configuration:** Connection via DATABASE_URL environment variable
- **Features:** WebSocket-based connection pooling for serverless environments

**Shadcn/ui Component Library**
- **Purpose:** Pre-built accessible React components
- **Integration:** Radix UI primitives with custom Tailwind styling
- **Components Used:** Buttons, Cards, Dialogs, Forms, Inputs, Selects, Toasts, and 20+ other UI primitives
- **Customization:** Agricultural color palette with professional design tokens

**Tailwind CSS**
- **Purpose:** Utility-first CSS framework
- **Configuration:** Custom design system with agricultural color scheme
- **Features:** CSS variables for theming, custom border radius, hover/active states

**Development Tools**
- **Vite:** Frontend build tool and dev server
- **Drizzle Kit:** Database migration tool
- **TypeScript:** Type safety across full stack
- **Replit Plugins:** Development banner, cartographer, runtime error overlay

**Future External Services (Planned but Not Implemented):**
- Weather API integration for real-time forecasts
- Market price data feed (Mandi API or similar)
- Image recognition service for disease detection
- Voice-to-text service for multilingual voice input