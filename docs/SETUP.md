# 🚀 Sound Heal Setup Guide

Complete setup instructions for developers and contributors.

---

## 📋 Prerequisites

### System Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher (or yarn v1.22.0+)
- **Git**: Latest version
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Development Tools (Recommended)
- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

---

## 🛠️ Installation

### 1. Clone Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/sound-heal.git
cd sound-heal

# Or use GitHub CLI
gh repo clone yourusername/sound-heal
cd sound-heal
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env  # or use your preferred editor
```

### 4. Start Development Server
```bash
# Start the development server
npm run dev

# Server will start at http://localhost:5173
```

---

## 🔑 API Configuration

### Required APIs for Full Functionality

#### 1. Perplexity AI Setup
1. **Create Account**: Visit [Perplexity AI](https://www.perplexity.ai/)
2. **Get API Key**: Go to [API Settings](https://www.perplexity.ai/settings/api)
3. **Add to Environment**:
   ```env
   VITE_PERPLEXITY_API_KEY=pplx-your-api-key-here
   ```

#### 2. Unsplash API Setup
1. **Create Developer Account**: Visit [Unsplash Developers](https://unsplash.com/developers)
2. **Create New Application**: 
   - Application name: "Sound Heal"
   - Description: "Emotional wellness platform with mood imagery"
3. **Get Credentials**:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your-access-key-here
   VITE_UNSPLASH_APPLICATION_ID=your-application-id-here
   VITE_UNSPLASH_SECRET_KEY=your-secret-key-here
   ```

#### 3. Tavius Video AI Setup
1. **Create Account**: Visit [Tavius](https://tavus.io/)
2. **Get API Credentials**: Access your dashboard for API keys
3. **Create Persona**: Set up an emotional support guru persona
4. **Add to Environment**:
   ```env
   VITE_TAVIUS_API_KEY=your-tavius-api-key-here
   VITE_TAVIUS_PERSONA_ID=your-persona-id-here
   VITE_TAVIUS_REPLICA_ID=your-replica-id-here
   ```

### Environment Variables Reference
```env
# Perplexity AI Configuration
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Unsplash API Configuration
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
VITE_UNSPLASH_APPLICATION_ID=your_unsplash_application_id_here
VITE_UNSPLASH_SECRET_KEY=your_unsplash_secret_key_here

# Tavius Conversational Video Interface Configuration
VITE_TAVIUS_API_KEY=your_tavius_api_key_here
VITE_TAVIUS_PERSONA_ID=your_tavius_persona_id_here
VITE_TAVIUS_REPLICA_ID=your_tavius_replica_id_here
```

---

## 🏗️ Project Structure

```
sound-heal/
├── public/                 # Static assets
│   ├── bolt.png           # Bolt.new badge
│   ├── life.jpg           # Fallback image
│   ├── favicon.svg        # Site favicon
│   └── thumbnail.svg      # Project thumbnail
├── src/
│   ├── components/        # React components
│   │   ├── BreathingExercise.tsx
│   │   └── VideoConversationInterface.tsx
│   ├── services/          # API integrations
│   │   ├── perplexityService.ts
│   │   ├── unsplashService.ts
│   │   ├── taviusService.ts
│   │   └── musicService.ts
│   ├── types.ts          # TypeScript definitions
│   ├── App.tsx           # Main application
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── docs/                 # Documentation
│   ├── FEATURES.md       # Feature documentation
│   ├── API.md           # API documentation
│   └── SETUP.md         # This file
├── .env.example         # Environment template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

---

## 🧪 Development Workflow

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Quality Tools

#### ESLint Configuration
```javascript
// eslint.config.js
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## 🎨 Styling & Design

### Tailwind CSS Setup
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom healing colors
        'healing-purple': '#667eea',
        'healing-pink': '#764ba2',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-ring': 'pulse 2s infinite',
      }
    },
  },
  plugins: [],
};
```

### Custom CSS Variables
```css
/* src/index.css */
:root {
  --healing-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --calm-gradient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  --energy-gradient: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
```

---

## 🔧 Build & Deployment

### Production Build
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output
```
dist/
├── assets/
│   ├── index-[hash].js     # Main JavaScript bundle
│   ├── index-[hash].css    # Compiled CSS
│   └── [asset]-[hash].*    # Static assets
├── index.html              # Main HTML file
└── favicon.svg             # Favicon
```

### Deployment Options

#### Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

#### GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run build
npx gh-pages -d dist
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Core Functionality
- [ ] Emotional input accepts text and validates length
- [ ] AI response generates appropriate comfort messages
- [ ] Emotion detection works for various inputs
- [ ] Song recommendations match emotional states
- [ ] Mood images load correctly

#### Breathing Exercise
- [ ] Breathing circle animates smoothly
- [ ] Audio plays correctly (with user permission)
- [ ] Cycle counting works accurately
- [ ] Mute/unmute controls function
- [ ] Reset button clears state

#### Video Conversations
- [ ] Video interface opens correctly
- [ ] Tavius integration works (with API keys)
- [ ] Embedded and external viewing options work
- [ ] Error handling for missing credentials

#### Responsive Design
- [ ] Mobile layout (320px - 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (1024px+)
- [ ] Touch interactions work on mobile

#### Accessibility
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility
- [ ] High contrast mode support
- [ ] Focus indicators visible

### Browser Testing
Test in the following browsers:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## 🐛 Troubleshooting

### Common Issues

#### Development Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be v18+
```

#### API Keys Not Working
```bash
# Verify environment variables are loaded
echo $VITE_PERPLEXITY_API_KEY

# Restart development server after adding keys
npm run dev
```

#### Build Errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

#### Audio Not Playing
- Ensure user has interacted with page (browser requirement)
- Check browser audio permissions
- Verify Web Audio API support

### Performance Issues
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for memory leaks
# Use browser dev tools Performance tab
```

---

## 🤝 Contributing

### Development Setup for Contributors
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Follow the setup instructions above
4. Make your changes
5. Test thoroughly
6. Submit pull request

### Code Style Guidelines
- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Test on multiple browsers

### Commit Message Format
```
type(scope): description

feat(breathing): add new breathing pattern
fix(api): handle perplexity timeout errors
docs(readme): update setup instructions
style(ui): improve button hover states
```

---

## 📞 Support

### Getting Help
- **Documentation**: Check `/docs` folder for detailed guides
- **Email**: lochanacharya0@gmail.com
- **Website**: [soundheal.online](https://soundheal.online)

### Reporting Bugs
Include the following information:
- Operating system and version
- Browser and version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

---

*This setup guide is maintained alongside the Sound Heal codebase. Last updated: [Current Date]*