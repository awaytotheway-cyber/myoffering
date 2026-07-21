# Srila Prabhupada Knowledge Portal

A beautiful, spiritually respectful web application dedicated to the life, teachings, and lectures of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada. This interactive knowledge portal features a RAG AI search interface connected via n8n webhook.

## ✨ Features

### 1. **Interactive Timeline (1896 – 1977)**
- Smooth scrollable timeline covering Srila Prabhupada's life journey
- Click/tap on any year to reveal detailed historical events
- Elegant animations and transitions
- Key milestones including:
  - Birth and early life
  - Meeting with spiritual master
  - Journey to America (1965)
  - Founding of ISKCON (1966)
  - Global expansion
  - Final departure (1977)

### 2. **RAG AI Search Interface**
- Beautiful search bar with intuitive design
- Connects to your n8n webhook backend
- Displays retrieved answers with source references
- Loading states and error handling
- Smooth response animations

### 3. **Daily Wisdom Quote Widget**
- Floating widget with rotating quotes
- Copy to clipboard functionality
- Share feature (native sharing or clipboard fallback)
- Refresh button for new quotes
- Curated collection of profound teachings

## 🎨 Design Philosophy

- **Color Palette**: Traditional ISKCON-inspired colors
  - Saffron/Orange: `#FF9933`
  - Gold: `#D4842A`
  - Spiritual Blue: `#1E3A5F`
  - Cream: `#FAF9F6`
  - Slate: `#2D3748`

- **Typography**: 
  - Headings: Playfair Display (elegant serif)
  - Body: Inter (clean sans-serif)

- **Responsive**: Fully optimized for mobile, tablet, and desktop

## 🚀 Quick Start

### 1. Clone or Download
```bash
cd prabhupada-portal
```

### 2. Configure n8n Webhook

Open `index.html` and locate line ~460:

```javascript
const BACKEND_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';
```

Replace `'YOUR_N8N_WEBHOOK_URL_HERE'` with your actual n8n webhook URL.

### 3. n8n Webhook Setup

Your n8n workflow should:

1. **Webhook Node** (POST method)
   - Accept JSON body with `query` field
   - Return JSON response with:
     ```json
     {
       "answer": "Your RAG-generated answer here",
       "sources": ["Source 1", "Source 2"]
     }
     ```

2. **RAG Processing** (optional nodes)
   - Vector database query
   - LLM processing
   - Source retrieval

3. **Response Node**
   - Return formatted JSON response

### 4. Deploy

#### Option A: Static Hosting (Recommended)
Upload to any static hosting service:
- **Netlify**: Drag & drop the folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push to gh-pages branch
- **Cloudflare Pages**: Connect repository

#### Option B: Local Testing
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📁 File Structure

```
prabhupada-portal/
├── index.html          # Main application (single file)
└── README.md          # This file
```

## 🔧 Customization

### Adding More Timeline Events
Edit the `timelineData` array in `index.html` (around line 465):

```javascript
{
    year: 1970,
    title: "Your Event Title",
    summary: "Brief summary",
    details: [
        "Detail 1",
        "Detail 2",
        "Detail 3"
    ]
}
```

### Adding More Quotes
Edit the `dailyQuotes` array (around line 580):

```javascript
{
    quote: "Your quote here",
    source: "Source reference"
}
```

### Styling Modifications
Customize the Tailwind config in the `<head>` section to adjust colors, fonts, or add custom styles.

## 🌐 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive layout
- Optimized loading times
- Native share support on mobile devices

## 🔒 Security Notes

- The webhook URL is exposed in client-side code (acceptable for public webhooks)
- For production, consider implementing API authentication if needed
- Use HTTPS for your n8n webhook endpoint

## 🙏 Devotional Note

This application is built with devotion for ISKCON devotees worldwide. May it help spread the transcendental knowledge of Srila Prabhupada and inspire Krishna consciousness in all who use it.

**Hare Krishna Hare Krishna, Krishna Krishna Hare Hare  
Hare Rama Hare Rama, Rama Rama Hare Hare**

---

## 📞 Support

For questions or contributions, please reach out to your local ISKCON temple or visit [ISKCON.org](https://www.iskcon.org)

## 📄 License

This project is dedicated to the service of Srila Prabhupada and the ISKCON community.

---

*Built with 💛 for devotees worldwide*
