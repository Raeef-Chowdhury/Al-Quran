# Islamic Foundations 🕌

A beautifully crafted **React.js** portfolio website showcasing modern web development techniques with stunning animations and interactive UI elements.  
The project demonstrates advanced frontend capabilities using **Motion One** animations, custom cursor effects, and scroll-based interactions.  
**Live Demo:** [Islamic Foundations](https://islamic-foundations.netlify.app/)

![Show Image](https://github.com/Raeef-Chowdhury/Al-Quran/blob/main/Screenshot%202025-11-26%20200059.png?raw=true)

---

## 🌟 Overview

**Islamic Foundations** is a dynamic portfolio website built with React, focusing on fluid animations, user interaction, and visual storytelling.  

It showcases a collection of projects with interactive hover effects, scroll-triggered animations, and a custom cursor implementation — demonstrating mastery of **Motion One** animation library and modern React patterns.  

This project highlights the ability to create engaging, production-ready web experiences with component-based architecture while maintaining clean, maintainable code and exceptional user experience.

---

## ✨ Features

- Interactive project cards with hover effects and dynamic dimming  
- Scroll-triggered animations from multiple directions (left, right, down)  
- Custom cursor with tracking and press animations  
- Hero slider with automatic rotation and smooth transitions  
- Staggered animations for sequential element reveals  
- Hover interactions on navigation, profile images, and CTA buttons  
- Tooltip system with mouse tracking and smooth fade effects  
- React Router navigation for seamless page transitions  
- Fully responsive design optimized for all devices  

---

## 🎯 Motivation & Goals

This project was built to:  

- Master **Motion One** animation library for performance-optimized animations  
- Create engaging user experiences through interactive micro-interactions  
- Demonstrate **React** proficiency with modern hooks and component patterns  
- Explore advanced DOM manipulation and event handling in React context  
- Build a visually striking portfolio that showcases frontend capabilities  
- Practice performance optimization with efficient animation implementations  
- Learn **React Router** for client-side routing and navigation  

---

## 🛠️ Tech Stack

- **React.js (Vite)** → Component architecture, fast builds & HMR  
- **Tailwind CSS** → Utility-first, responsive styling  
- **React Router** → Client-side routing and navigation  
- **JavaScript (ES6+)** → Interactive logic, animations, and DOM manipulation  
- **Motion One** → Lightweight, performant animation library  

## 🚀 Getting Started

### Clone the Repository & Setup
```bash
git clone https://github.com/yourusername/islamic-foundations.git
cd islamic-foundations
npm install
npm run dev
npm run build
```


# Project Structure
``` markdown
islamic-foundations/
├── node_modules/
├── public/
│ └── assets/
├── src/
│ ├── components/
│ │ ├── SurahSection.jsx
│ │ ├── SurahPage.jsx
│ │ ├── SurahDetails.jsx
│ │ ├── DuaSection.jsx
│ │ ├── DuaPage.jsx
│ │ ├── DuaDetails.jsx
│ │ ├── Hero.jsx
│ │ ├── Header.jsx
│ │ ├── Button.jsx
│ │ ├── PrayerSection.jsx
│ │ └── PrayerPage.jsx
│ ├── data/
│ ├── utils/
│ ├── App.jsx
│ ├── App.css
│ ├── index.jsx
│ └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 💡 Challenges Faced

### 🎭 Animation Performance
- Balancing visual richness with smooth 60fps performance  
- Optimized using `transform` and `opacity` for GPU acceleration  
- Implemented `will-change` hints for complex animations  


### ⚛️ React Integration with Motion One
- Coordinating React lifecycle with animation lifecycles  
- Managing animation cleanup in `useEffect` hooks  
- Ensuring animations work seamlessly with React Router page transitions  

### 📱 Responsive Design
- Ensuring animations work smoothly on both mobile and desktop  
- Adjusted animation distances and timing for different viewports  
- Used Tailwind responsive utilities combined with JavaScript logic  

---

## 🔮 Future Improvements
- Add dark/light theme toggle with smooth transitions  
- Implement content filtering by category (e.g., duas, surahs, prayers)  
- Integrate contact form with validation and submission handling  
- Improve accessibility (ARIA labels, keyboard navigation)  
- Create loading animations for initial page load  
- Implement lazy loading for images and content  
- Add scroll progress indicator in header  
- Introduce page transition animations between routes  

---

## 📖 What I Learned
- Mastering **Motion One** for declarative, performant animations  
- Building custom cursor systems with precise tracking  
- Implementing **IntersectionObserver** for efficient scroll effects  
- Managing animation lifecycles in React components  
- Creating engaging micro-interactions that enhance user experience  
- Integrating **React Router** for smooth navigation  
- Structuring scalable React applications with clean architecture  
- Optimizing animation performance using CSS transforms  
- Using **Tailwind CSS** for rapid, responsive UI development  
- Building production-ready React applications with **Vite**  
