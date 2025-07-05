# 🎵 Sound Heal

<div align="center">
  <img src="public/thumbnail.svg" alt="Sound Heal - Your Emotional Companion" width="600" style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
  
  <p align="center">
    <strong>A safe space to share your feelings and receive AI-powered comfort, understanding, and musical healing through sound therapy</strong>
  </p>
  
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#installation">Installation</a> •
    <a href="#api-setup">API Setup</a> •
    <a href="#usage">Usage</a>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-3.4.1-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Vite-5.4.2-purple?style=for-the-badge&logo=vite" alt="Vite">
  </p>
</div>

---

## 🌟 Overview

Sound Heal is a revolutionary emotional wellness platform that combines artificial intelligence, sound therapy, and interactive healing techniques to provide personalized emotional support. Built with modern web technologies, it offers a beautiful, accessible interface for users to explore their feelings and receive compassionate guidance.

### 🎯 Mission
To create a safe, judgment-free digital space where anyone can share their emotions and receive immediate, personalized support through the healing power of AI, music, and mindfulness.

---

## ✨ Features

### 🧠 **AI-Powered Emotional Intelligence**
- **Smart Emotion Detection**: Advanced AI analyzes your feelings and identifies primary emotions
- **Personalized Responses**: Tailored comfort messages based on your specific emotional state
- **Perplexity AI Integration**: Cutting-edge language models for empathetic support
- **Fallback Intelligence**: Local emotional responses ensure functionality without internet

### 🎵 **Sound Therapy & Music Healing**
- **Curated Song Recommendations**: Emotion-specific music therapy suggestions
- **YouTube Integration**: Direct access to healing music and sounds
- **Audio Breathing Guides**: Synchronized breathing sounds for meditation
- **Multi-Sensory Experience**: Visual, audio, and interactive healing elements

### 🧘‍♂️ **Interactive Breathing Exercises**
- **4-7-8 Breathing Pattern**: Scientifically-backed relaxation technique
- **Animated Visual Guide**: Beautiful breathing circle that scales with your breath
- **Audio Feedback**: Gentle breathing sounds using Web Audio API
- **Cycle Tracking**: Monitor your breathing session progress
- **Educational Benefits**: Learn about the science behind breathing exercises

### 📹 **Live Video Conversations**
- **AI Guru Sessions**: Real-time video conversations with empathetic AI
- **Emotion-Aware Greetings**: Personalized session introductions
- **Tavius Integration**: Advanced conversational video AI platform
- **Flexible Viewing**: Embedded player or external window options

### 🎨 **Beautiful Design & UX**
- **Premium Aesthetics**: Apple-level design quality with attention to detail
- **Responsive Design**: Perfect experience across all devices
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Accessibility First**: High contrast, keyboard navigation, screen reader support

### 🖼️ **Mood-Responsive Visuals**
- **Dynamic Imagery**: Unsplash integration for mood-appropriate visuals
- **Healing Color Palettes**: Carefully chosen colors for emotional wellness
- **Animated Elements**: Floating decorative elements with pulse animations
- **Glass Morphism**: Modern backdrop blur effects and translucent design

---

## 🚀 Demo

### Live Application
Visit the live demo: [soundheal.online](https://soundheal.online)

### Feature Showcase

#### 1. Emotional Input & AI Response
```
User Input: "I'm feeling overwhelmed and anxious about work"
↓
AI Analysis: Detects "anxious" emotion
↓
Response: Personalized comfort message + calming imagery + relaxing music
```

#### 2. Breathing Exercise Flow
```
Click "Breathe With Me" → 4-7-8 Pattern Guide → Audio + Visual Sync → Cycle Tracking
```

#### 3. Video Conversation Journey
```
Share Feelings → AI Analysis → Video Session Setup → Live Guru Conversation
```

---

## 🛠️ Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Modern web browser** with Web Audio API support

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sound-heal.git
   cd sound-heal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🔑 API Setup

Sound Heal integrates with multiple APIs to provide enhanced functionality. While the app works with fallback responses, adding API keys unlocks the full experience.

### Required APIs

#### 1. **Perplexity AI** (Enhanced Emotional Responses)
```env
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here
```
- **Get API Key**: [Perplexity AI Settings](https://www.perplexity.ai/settings/api)
- **Purpose**: Advanced AI-powered emotional support responses
- **Fallback**: Local emotional response system

#### 2. **Unsplash** (Mood Imagery)
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
VITE_UNSPLASH_APPLICATION_ID=your_unsplash_application_id_here
VITE_UNSPLASH_SECRET_KEY=your_unsplash_secret_key_here
```
- **Get Credentials**: [Unsplash Developers](https://unsplash.com/developers)
- **Purpose**: Beautiful, mood-appropriate imagery
- **Fallback**: Local healing images

#### 3. **Tavius** (Video Conversations)
```env
VITE_TAVIUS_API_KEY=your_tavius_api_key_here
VITE_TAVIUS_PERSONA_ID=your_tavius_persona_id_here
VITE_TAVIUS_REPLICA_ID=your_tavius_replica_id_here
```
- **Get Credentials**: [Tavius Platform](https://tavus.io/)
- **Purpose**: Live video conversations with AI guru
- **Fallback**: Feature unavailable without credentials

### Environment Setup
1. Copy `.env.example` to `.env`
2. Add your API credentials
3. Restart the development server
4. Enjoy the full Sound Heal experience!

---

## 📖 Usage

### Basic Workflow

1. **Share Your Feelings**
   - Type how you're feeling in the text area (up to 500 characters)
   - Click "Share Your Heart" to submit

2. **Receive AI Support**
   - Get a personalized comfort message
   - View emotion identification and mood imagery
   - Receive curated song recommendations

3. **Engage in Healing Activities**
   - Try the guided breathing exercise
   - Listen to recommended healing music
   - Start a video conversation with the AI guru

4. **Continue Your Journey**
   - Reset to share new feelings
   - Explore different emotional states
   - Build a practice of emotional wellness

### Advanced Features

#### Breathing Exercise
- Click the wind icon (top-left) or "Breathe With Me" button
- Follow the 4-7-8 breathing pattern
- Use audio controls to mute/unmute breathing sounds
- Track your breathing cycles for progress

#### Video Conversations
- Available after sharing feelings and receiving AI response
- Choose between embedded player or external window
- Engage in real-time conversation with empathetic AI guru
- Sessions are personalized based on your emotional state

---

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom animations
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Audio**: Web Audio API
- **Video**: Tavius AI Platform

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── BreathingExercise.tsx
│   └── VideoConversationInterface.tsx
├── services/            # API integrations
│   ├── perplexityService.ts
│   ├── unsplashService.ts
│   ├── taviusService.ts
│   └── musicService.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

### Key Components

#### `BreathingExercise`
- Interactive 4-7-8 breathing pattern guide
- Web Audio API integration for breathing sounds
- Animated visual feedback with scaling circles
- Cycle tracking and progress monitoring

#### `VideoConversationInterface`
- Tavius AI video conversation integration
- Emotion-aware session initialization
- Flexible viewing options (embedded/external)
- Session management and status tracking

#### Service Layer
- **perplexityService**: AI-powered emotional support
- **unsplashService**: Mood-appropriate imagery
- **taviusService**: Video conversation management
- **musicService**: Curated song recommendations

---

## 🎨 Design Philosophy

### Visual Design Principles
- **Healing Colors**: Purple-to-pink gradients for emotional wellness
- **Soft Interactions**: Gentle animations and micro-interactions
- **Accessibility First**: High contrast, readable fonts, keyboard navigation
- **Mobile-First**: Responsive design for all screen sizes

### User Experience Goals
- **Immediate Comfort**: Instant emotional validation and support
- **Progressive Engagement**: Multiple levels of interaction depth
- **Non-Judgmental Space**: Safe environment for emotional expression
- **Holistic Healing**: Multi-sensory approach to emotional wellness

---

## 🤝 Contributing

We welcome contributions to make Sound Heal even better! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines
- **Code Quality**: Follow TypeScript best practices
- **Testing**: Ensure all features work across browsers
- **Documentation**: Update README for new features
- **Accessibility**: Maintain WCAG compliance
- **Design**: Follow existing design patterns

### Areas for Contribution
- 🎵 Additional music therapy algorithms
- 🧘‍♂️ New breathing exercise patterns
- 🌍 Internationalization and localization
- 📱 Mobile app development
- 🔊 Advanced audio therapy features
- 🎨 UI/UX improvements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Perplexity AI** for advanced language model capabilities
- **Unsplash** for beautiful, healing imagery
- **Tavius** for conversational video AI technology
- **Lucide** for beautiful, accessible icons
- **Tailwind CSS** for utility-first styling
- **React Team** for the amazing framework

---

## 📞 Support

Need help or have questions?

- 📧 **Email**: lochanacharya0@gmail.com
- 🌐 **Website**: [soundheal.online](https://soundheal.online)
- 📖 **Documentation**: Check the `/docs` folder for detailed guides

---

<div align="center">
  <p><strong>Made with 💜 for emotional wellness</strong></p>
  <p>Remember: Your feelings are valid, you are not alone, and this too shall pass.</p>
  
  <img src="https://img.shields.io/badge/Powered%20by-AI%20%26%20Sound%20Healing-purple?style=for-the-badge" alt="Powered by AI & Sound Healing">
</div>