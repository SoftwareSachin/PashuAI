# PashuAI - AI-Powered Agricultural Intelligence Platform

## Overview

PashuAI is a multilingual AI agricultural advisory platform designed to empower farmers with intelligent guidance for crop management, livestock care, disease detection, and market insights. The platform provides a conversational AI interface powered by Google's Gemini AI, supporting 20+ Indian languages to make agricultural expertise accessible to farmers across India.

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
- **Pages:** Home (landing/dashboard) and Chat (conversational interface)
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
- Language selector for multilingual support
- Responsive design optimized for mobile field use

### Backend Architecture

**Express.js REST API**
- **Server Framework:** Express.js with TypeScript
- **API Design:** RESTful endpoints for conversations, messages, and AI chat
- **Development Server:** Vite middleware integration for HMR in development
- **Production Build:** ESBuild bundling for Node.js deployment

**Key API Endpoints**
- `POST /api/conversations` - Create new conversation sessions
- `GET /api/messages/:conversationId` - Retrieve message history
- `POST /api/chat` - Send messages and receive AI responses
- Frontend-only endpoints (not implemented): `/api/weather`, `/api/market-prices`, `/api/crops`

**AI Integration Layer**
- Google Gemini AI integration via `@google/genai` SDK
- System prompt engineering for agricultural domain expertise
- Conversation history management for contextual responses
- Multilingual response generation based on selected language

**Database Layer**
- **ORM:** Drizzle ORM with type-safe schema definitions
- **Connection:** Neon Serverless PostgreSQL with WebSocket support
- **Schema Design:** Conversation-based message storage with cascade deletion
- **Migration Strategy:** Drizzle Kit for schema migrations

### Data Storage Solutions

**PostgreSQL Database Schema**

**Conversations Table:**
- Primary entity for chat sessions
- Fields: id (UUID), language (text), createdAt (timestamp)
- Purpose: Track individual user sessions with language preference

**Messages Table:**
- Stores conversation message history
- Fields: id (UUID), conversationId (FK), role (user/assistant), content (text), createdAt (timestamp)
- Relationship: Many messages belong to one conversation (cascade delete)
- Purpose: Maintain full conversation context for AI responses

**Frontend-Only Types (No Persistence):**
- WeatherData, MarketPrice, CropRecommendation defined as TypeScript interfaces
- These represent future features not yet connected to backend data sources

**Design Rationale:**
- Simple two-table schema keeps conversation management lightweight
- Cascade deletion ensures data consistency
- UUID primary keys for distributed system compatibility
- Conversation-level language preference simplifies multilingual support

### Authentication and Authorization

**Current State:** No authentication implemented
- Application is open-access for MVP/demo purposes
- All conversations are anonymous
- No user accounts or sessions

**Future Considerations:**
- User authentication would be required for personalized farm data
- Session management would enable multi-device access
- Role-based access for enterprise vs. farmer features

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