# StudioSpace 🎬

StudioSpace is a premium peer-to-peer workspace sharing marketplace. It connects filmmakers, photographers, and audio engineers with world-class production facilities, allowing them to discover, book, and manage creative spaces.

## 🚀 Live Demo
Frontend Live Link: [Insert Your Vercel Link Here]
Backend API Link: [Insert Your Backend Link Here]

## 🛠️ Technology Stack
* Frontend: Next.js, React, TypeScript, Tailwind CSS v4, DaisyUI, Axios
* Backend: Node.js, Express.js, TypeScript, Mongoose
* Database: MongoDB
* Authentication: JWT (JSON Web Tokens) with HTTPOnly Cookies
* Additional Libraries: Swiper.js (Carousels), Lucide React (Icons), html2pdf.js (Invoice Generation), React Hot Toast (Notifications)

## ✨ Key Features
* Cinematic UI/UX: A fully responsive, premium dark-themed interface with dynamic light/dark mode toggling (preserving Hero Banner contrast).
* Secure Authentication: Robust JWT-based login and registration system utilizing HTTPOnly cookies for enhanced security.
* Workspace Management: Users can instantly transition to hosts by publishing their own studios. Includes Base64 image uploading and full CRUD (Create, Read, Update, Delete) capabilities for listings.
* Live Search & Filtering: Dynamic search functionality on the Explore Studios page to find workspaces by title or category.
* Double-Booking Prevention: The backend actively intercepts and blocks reservation attempts for time slots that overlap with existing confirmed bookings.
* Automated PDF Invoicing: Users can instantly generate and download a beautifully styled PDF receipt for any confirmed booking using `html2pdf.js`.
* Creator Dashboard: A centralized hub displaying live statistics, recent bookings, and quick actions for both guests and hosts.

## 📦 Local Installation Guide

1. Clone the repositories:

git clone [https://github.com/your-username/studio-space-frontend.git](https://github.com/your-username/studio-space-frontend.git)
git clone [https://github.com/your-username/studio-space-backend.git](https://github.com/your-username/studio-space-backend.git)