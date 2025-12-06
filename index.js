const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');


/**
 * Build Professional SVG Card with Advanced Gradients & Full Customization
 */
function buildSVG({name, desc, lang, theme, bg_color, text_color, muted_color, accent_color, secondary_accent, stars, forks, issues}) {
  // Input validation and defaults
  const title = esc(name || 'Untitled Repository');
  const description = esc(desc || 'No description provided');
  const language = esc(lang || 'Unknown');
  
  // Theme configuration
  const isDark = theme !== 'light';
  const bg = bg_color || (isDark ? '#0d1117' : '#ffffff');
  const textColor = text_color || (isDark ? '#e6edf3' : '#1f2328');
  const mutedColor = muted_color || (isDark ? '#8b949e' : '#656d76');
  const accentColor = accent_color || (isDark ? '#58a6ff' : '#0969da');
  const secondaryAccent = secondary_accent || (isDark ? '#a371f7' : '#8250df');
  
  // Card dimensions
  const width = 720;
  const height = 200;
  
  // Stats configuration
  const hasStats = stars !== undefined || forks !== undefined || issues !== undefined;
  const statsY = height - 45;

  return `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="50%" stop-color="${adjustColor(bg, isDark ? 15 : -5)}"/>
      <stop offset="100%" stop-color="${adjustColor(bg, isDark ? 8 : -3)}"/>
    </linearGradient>
    
    <!-- Glow gradients -->
    <radialGradient id="glow1" cx="15%" cy="20%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>
    
    <radialGradient id="glow2" cx="85%" cy="75%">
      <stop offset="0%" stop-color="${secondaryAccent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${secondaryAccent}" stop-opacity="0"/>
    </radialGradient>

    <!-- Badge gradient -->
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.08"/>
    </linearGradient>

    <!-- Border gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="${secondaryAccent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.4"/>
    </linearGradient>

    <!-- Filters -->
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="2"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="glow">
      <feGaussianBlur stdDeviation="2"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" rx="16" fill="url(#bgGrad)"/>
  
  <!-- Glow effects -->
  <rect width="${width}" height="${height}" rx="16" fill="url(#glow1)"/>
  <rect width="${width}" height="${height}" rx="16" fill="url(#glow2)"/>
  
  <!-- Border -->
  <rect width="${width-2}" height="${height-2}" x="1" y="1" rx="16" fill="none" 
        stroke="url(#borderGrad)" stroke-width="1.5" opacity="0.6"/>

  <!-- Decorative circles -->
  <g opacity="${isDark ? '0.04' : '0.03'}">
    <circle cx="60" cy="40" r="140" fill="${accentColor}"/>
    <circle cx="${width-80}" cy="${height-50}" r="120" fill="${secondaryAccent}"/>
  </g>

  <!-- Content -->
  <g font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica', 'Arial', sans-serif">
    
    <!-- Header Section -->
    <g transform="translate(32, 32)">
      <!-- Repo icon -->
      <g opacity="0.9">
        <rect x="0" y="0" width="20" height="20" rx="3" fill="${accentColor}" opacity="0.15"/>
        <path d="M4 6h12M4 10h12M4 14h8" stroke="${accentColor}" stroke-width="1.5" 
              stroke-linecap="round" opacity="0.9" transform="translate(2, 2)"/>
      </g>
      
      <!-- Repository name -->
      <text x="28" y="15" font-size="20" font-weight="700" fill="${textColor}" 
            letter-spacing="-0.02em" filter="url(#shadow)">
        ${truncateText(title, 50)}
      </text>
    </g>

    <!-- Description -->
    <foreignObject x="32" y="68" width="${width-64}" height="60">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        font-family: inherit;
        color: ${mutedColor};
        font-size: 15px;
        line-height: 1.6;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        font-weight: 400;
        letter-spacing: 0.005em;
        margin: 0;
        padding: 0;
      ">
        ${description}
      </div>
    </foreignObject>

    <!-- Language badge -->
    <g transform="translate(32, 145)">
      <rect rx="10" width="120" height="28" fill="url(#badgeGrad)" 
            stroke="${accentColor}" stroke-width="1" stroke-opacity="0.3"/>
      <circle cx="12" cy="14" r="4" fill="${accentColor}" opacity="0.9"/>
      <text x="22" y="18" font-size="13" fill="${textColor}" font-weight="600">
        ${truncateText(language, 12)}
      </text>
    </g>

    ${hasStats ? `
    <!-- Stats Section -->
    <g transform="translate(170, 145)">
      ${stars !== undefined ? `
      <g>
        <path d="M8 1l2.163 4.382 4.837.703-3.5 3.413.826 4.817L8 12.347l-4.326 2.968.826-4.817-3.5-3.413 4.837-.703L8 1z" 
              fill="${accentColor}" opacity="0.8" transform="scale(0.9)"/>
        <text x="18" y="18" font-size="13" fill="${mutedColor}" font-weight="500">
          ${formatNumber(stars)}
        </text>
      </g>
      ` : ''}
      
      ${forks !== undefined ? `
      <g transform="translate(${stars !== undefined ? 70 : 0}, 0)">
        <path d="M8 0C6.9 0 6 .9 6 2c0 .74.41 1.38 1 1.72v1.56L5 7.28c-.59.34-1 .98-1 1.72v1c-.59.34-1 .98-1 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.02-.76-1.66-1-1.72V9c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v1.28c-.59.34-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-1.02-.76-1.66-1-1.72v-1c0-1.1-.9-2-2-2h-.28L11 5.28V3.72c.59-.34 1-.98 1-1.72 0-1.1-.9-2-2-2zm0 1c.56 0 1 .44 1 1s-.44 1-1 1-1-.44-1-1 .44-1 1-1zM5 11c.56 0 1 .44 1 1s-.44 1-1 1-1-.44-1-1 .44-1 1-1zm6 0c.56 0 1 .44 1 1s-.44 1-1 1-1-.44-1-1 .44-1 1-1z" 
              fill="${accentColor}" opacity="0.8" transform="scale(0.9)"/>
        <text x="18" y="18" font-size="13" fill="${mutedColor}" font-weight="500">
          ${formatNumber(forks)}
        </text>
      </g>
      ` : ''}
      
      ${issues !== undefined ? `
      <g transform="translate(${(stars !== undefined ? 70 : 0) + (forks !== undefined ? 70 : 0)}, 0)">
        <circle cx="8" cy="8" r="7" fill="none" stroke="${accentColor}" stroke-width="1.5" opacity="0.8"/>
        <circle cx="8" cy="11" r="1" fill="${accentColor}" opacity="0.8"/>
        <line x1="8" y1="4" x2="8" y2="8" stroke="${accentColor}" stroke-width="1.5" 
              stroke-linecap="round" opacity="0.8"/>
        <text x="18" y="18" font-size="13" fill="${mutedColor}" font-weight="500">
          ${formatNumber(issues)}
        </text>
      </g>
      ` : ''}
    </g>
    ` : ''}

    <!-- Footer -->
    <g transform="translate(${width-32}, ${height-16})">
      <text text-anchor="end" font-size="11" fill="${mutedColor}" opacity="0.6" font-weight="500">
        readme-card-api
      </text>
    </g>

    <!-- Decorative accent line -->
    <line x1="32" y1="${height-38}" x2="140" y2="${height-38}" 
          stroke="url(#borderGrad)" stroke-width="1.5" stroke-opacity="0.25" stroke-linecap="round"/>
  </g>
</svg>`;
}

/**
 * Adjust color brightness
 */
function adjustColor(color, amount) {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Escape HTML/SVG special characters
 */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Truncate text to max length
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format numbers (1000 -> 1k, 1000000 -> 1M)
 */
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

/**
 * Updated /pin endpoint with full customization support
 */
app.get('/pin', async (req, res) => {
  const name = req.query.name;
  const desc = req.query.desc;
  const lang = req.query.lang;
  const theme = (req.query.theme || 'dark').toLowerCase();
  const bg_color = req.query.bg_color;
  const text_color = req.query.text_color;
  const muted_color = req.query.muted_color;
  const accent_color = req.query.accent_color;
  const secondary_accent = req.query.secondary_accent;
  const stars = req.query.stars ? parseInt(req.query.stars) : undefined;
  const forks = req.query.forks ? parseInt(req.query.forks) : undefined;
  const issues = req.query.issues ? parseInt(req.query.issues) : undefined;

  if (!name || !desc) {
    return res.status(400).send('Missing required parameters: ?name= & ?desc=');
  }

  const svg = buildSVG({ 
    name, 
    desc, 
    lang, 
    theme, 
    bg_color,
    text_color,
    muted_color,
    accent_color,
    secondary_accent,
    stars, 
    forks, 
    issues 
  });

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

app.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(PORT, () => {
  console.log(`🚀 Readme Card API running on http://localhost:${PORT}`);
});
