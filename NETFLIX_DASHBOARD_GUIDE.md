# Netflix-Inspired Dark Theme Dashboard Guide

## 🎬 Overview
Your personal trainer profile page has been redesigned with a modern, Netflix-inspired dark theme dashboard. This guide explains all the features, customization options, and component structure.

---

## 🎨 Color Palette

### Dark Theme Colors
```css
--bg-primary: #121212         /* Main background - Deep black */
--bg-secondary: #1f1f1f       /* Secondary background - Dark gray */
--bg-tertiary: #333333        /* Tertiary background - Medium gray */
--text-primary: #ffffff       /* Main text - White */
--text-secondary: #e0e0e0     /* Secondary text - Light gray */
--text-muted: #b3b3b3         /* Muted text - Medium gray */
--accent-blue: #4169e1        /* Primary accent - Royal blue */
--accent-red: #ff0000         /* Secondary accent - Red */
```

---

## 📱 Layout Structure

### 1. **Sticky Header Navigation**
- **Class**: `.netflix-header`
- **Features**:
  - Sticky positioning (stays at top while scrolling)
  - Blurred backdrop effect
  - Profile picture with gradient border
  - User greeting with role
  - Navigation links: Dashboard, My Profile, Settings, Log Out
  - Smooth underline animation on link hover

**Customization**:
```css
.netflix-header {
  /* Change blur intensity */
  backdrop-filter: blur(10px);
  
  /* Adjust padding */
  padding: 16px 32px;
}
```

---

### 2. **Profile Hero Section**
- **Class**: `.netflix-profile-hero`
- **Features**:
  - Two-column layout (avatar + info)
  - Large profile picture with hover scale animation
  - User name and role
  - Info cards (Email, Username, Experience, Rating)
  - Upload photo button with gradient
  - Responsive flex layout

**Customization**:
```css
.netflix-avatar-large {
  width: 160px;                    /* Avatar size */
  height: 160px;
  border-radius: 50%;              /* Make it circular */
  box-shadow: 0 12px 40px...;      /* Shadow depth */
}
```

---

### 3. **Metrics Section**
- **Class**: `.netflix-metrics-section`
- **Features**:
  - Grid layout (auto-fit columns)
  - Individual metric cards with:
    - Icon
    - Label
    - Value
    - Change percentage
    - Progress bar with gradient
  - Hover effects with glow shadow
  - Top accent line animation on hover

**Sample Metrics**:
```javascript
const metrics = [
  { 
    label: 'Total Earnings', 
    value: '$12,450', 
    change: '+12.5%', 
    icon: '💰', 
    bar: 85  // 0-100 percentage
  },
  // ... more metrics
];
```

**Customization**:
```css
.netflix-metric-card {
  /* Change card size */
  padding: 24px;
  
  /* Adjust grid columns */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  /* Modify colors */
  background: rgba(31, 31, 31, 0.8);
  border-color: rgba(65, 105, 225, 0.2);
}
```

---

### 4. **Services Section - Horizontal Scroll**
- **Class**: `.netflix-services-container`
- **Features**:
  - Horizontal scrolling cards (Netflix-style)
  - Each card has:
    - Icon/Image area (60% of height)
    - Content area (40% of height)
    - Service title
    - Price
    - Client count
    - "Book Now" button (appears on hover)
  - Smooth scroll behavior
  - Custom scrollbar styling

**Sample Services**:
```javascript
const services = [
  { 
    id: 1, 
    title: '1-1 Coaching', 
    price: '$50/hr', 
    clients: 12, 
    icon: '💪', 
    details: 'Personal training' 
  },
  // ... more services
];
```

**Customization**:
```css
.netflix-service-card {
  flex: 0 0 280px;          /* Card width */
  height: 400px;            /* Card height */
  border-radius: 12px;      /* Corner radius */
}

.netflix-services-container::-webkit-scrollbar {
  height: 6px;              /* Scrollbar height */
}
```

---

## 🎭 Hover Effects & Animations

### Card Hover Effects
All cards have smooth hover animations:

```css
.netflix-metric-card:hover {
  transform: translateY(-4px);        /* Lift effect */
  box-shadow: 0 12px 32px ...;        /* Enhanced shadow */
  border-color: var(--accent-blue);   /* Highlight border */
}

.netflix-service-card:hover {
  transform: translateY(-8px);        /* More pronounced lift */
  box-shadow: 0 12px 32px ...;
}
```

### Button Animations
```css
.netflix-upload-btn:hover,
.netflix-service-button:hover {
  transform: translateY(-2px);        /* Subtle lift */
  box-shadow: 0 6px 24px ...;         /* Shadow increase */
}
```

### Link Underline Animation
```css
.netflix-nav-links a::after {
  transition: width 0.3s ease;        /* Smooth width change */
}

.netflix-nav-links a:hover::after {
  width: 100%;                        /* Animate from 0% to 100% */
}
```

---

## 📊 Progress Bars

The metric cards include animated progress bars:

```css
.netflix-metric-bar-fill {
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-red));
  transition: width 0.4s ease;        /* Smooth animation */
}
```

**Usage in JSX**:
```jsx
<div className="netflix-metric-bar">
  <div 
    className="netflix-metric-bar-fill" 
    style={{ width: `${metric.bar}%` }}
  ></div>
</div>
```

---

## 📐 Responsive Breakpoints

### Desktop (> 768px)
- Full navigation visible
- 2-column hero section (avatar left, info right)
- Multi-column metrics grid
- Full-width service cards

### Tablet (480px - 768px)
- Simplified header
- Single-column hero section (stacked)
- Single-column metrics grid
- Smaller service cards (240px)

### Mobile (< 480px)
- Minimal header (no nav)
- Full-width sections
- Single-column layout
- Smaller avatars and fonts
- 200px service cards

**Customization**:
```css
@media (max-width: 768px) {
  .netflix-profile-hero {
    flex-direction: column;          /* Stack vertically */
    gap: 24px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .netflix-dashboard {
    padding: 20px 16px;              /* Reduce padding */
  }
}
```

---

## 🎬 Animations

### Slide In Animation
All major sections fade in and slide up on load:

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Applied to: Dashboard, Section Titles, Metric Cards, Service Cards

---

## 🔧 Customization Examples

### Change Primary Accent Color
```css
:root {
  --accent-blue: #6366f1;  /* Indigo instead of blue */
  --accent-red: #ec4899;   /* Pink instead of red */
}
```

### Modify Card Border Style
```css
.netflix-metric-card {
  border: 2px solid var(--accent-blue);  /* Thicker border */
  border-radius: 16px;                   /* More rounded */
}
```

### Adjust Service Card Size
```css
.netflix-service-card {
  flex: 0 0 320px;    /* Wider cards */
  height: 450px;      /* Taller cards */
}
```

### Change Font Family
```css
:root {
  font-family: 'Poppins', sans-serif;  /* Or any other font */
}
```

### Modify Background Darkness
```css
:root {
  --bg-primary: #1a1a1a;    /* Slightly lighter black */
  --bg-secondary: #242424;  /* Adjusted secondary */
}
```

---

## 📦 Component Classes Reference

| Class | Purpose | Example Usage |
|-------|---------|---------------|
| `.netflix-header` | Sticky navigation bar | `<header className="netflix-header">` |
| `.netflix-dashboard` | Main container | `<div className="netflix-dashboard">` |
| `.netflix-profile-hero` | Profile intro section | `<section className="netflix-profile-hero">` |
| `.netflix-metrics-section` | Metrics container | `<section className="netflix-metrics-section">` |
| `.netflix-metric-card` | Individual metric | `<div className="netflix-metric-card">` |
| `.netflix-services-section` | Services container | `<section className="netflix-services-section">` |
| `.netflix-service-card` | Individual service | `<div className="netflix-service-card">` |
| `.netflix-section-title` | Section heading | `<h2 className="netflix-section-title">` |
| `.netflix-upload-btn` | Upload button | `<button className="netflix-upload-btn">` |

---

## 🎯 Best Practices

1. **Maintain Contrast**: Keep text on dark backgrounds for readability
2. **Use Consistent Spacing**: Use multiples of 4px (16px, 20px, 24px, 32px)
3. **Smooth Transitions**: All interactive elements use 0.3s-0.4s ease transitions
4. **Icon Consistency**: Use emoji icons or SVG icons consistently
5. **Mobile First**: Test designs on mobile first, then enhance for larger screens
6. **Accessibility**: Maintain proper color contrast ratios (WCAG 2.1 AA)

---

## 🚀 Implementation Tips

### Adding New Metrics
```jsx
const metrics = [
  // Add your custom metrics here
  { 
    label: 'New Metric', 
    value: '1,234', 
    change: '+5%', 
    icon: '📈', 
    bar: 50 
  }
];
```

### Adding New Services
```jsx
const services = [
  // Add your custom services here
  { 
    id: 6, 
    title: 'New Service', 
    price: '$XX/unit', 
    clients: 0, 
    icon: '🎯', 
    details: 'Description here' 
  }
];
```

### Connecting Real Data
Replace mock data with API calls:
```jsx
useEffect(() => {
  // Fetch metrics from API
  fetchMetrics().then(data => setMetrics(data));
  
  // Fetch services from API
  fetchServices().then(data => setServices(data));
}, []);
```

---

## 💡 Features Implemented

✅ Dark theme with Netflix-inspired design  
✅ Sticky header with navigation  
✅ Large hero profile section  
✅ Interactive metrics with progress bars  
✅ Horizontal scrolling service cards  
✅ Smooth hover animations  
✅ Responsive design (mobile, tablet, desktop)  
✅ Custom scrollbar styling  
✅ Gradient accents and overlays  
✅ Blurred backdrop effects  
✅ Photo upload functionality  
✅ User information display  

---

## 📝 Notes

- Colors can be easily customized via CSS variables
- All animations use hardware-accelerated transforms
- Layout is fully responsive with 3 breakpoints
- Icons are emoji; can be replaced with SVG/images
- Component is ready for integration with real data

---

**Last Updated**: February 27, 2026
