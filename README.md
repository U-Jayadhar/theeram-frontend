# 🌊 Theeram | RK Beach "Eco-Lifeline" Sentinel

**Theeram** is a master solution for beach safety (rip currents) and civic sanitation (marine debris) at RK Beach and Yarada in Visakhapatnam. 

This repository contains the frontend architecture, built by **Team Jaya** for the **GDG Vizag Agentic Premier League (APL)**. It features a mobile-optimized public reporting portal and a desktop-optimized command center for the Greater Visakhapatnam Municipal Corporation (GVMC), designed to interface seamlessly with our multi-agent AI backend.

---

## 🔗 Project Links

* **Live Frontend Deployment:** [theeram.ujayadhar.dev](https://theeram.ujayadhar.dev/)
* **Backend Repository (Agents):** [Theeram Backend](https://github.com/vijay-2155/theeram-backend)

---

## 🛠️ Tech Stack & Design System

* **Framework:** Next.js 16.2 (App Router)
* **Styling:** Tailwind CSS v4
* **Language:** TypeScript
* **Typography:** Plus Jakarta Sans (Headings) & Inter (Body)
* **Integration:** RESTful API polling and multi-part form data submission for Supabase & Gemini AI Studio.

---

## 🖥️ Core Frontend Features

### 1. Anonymous Field Reporter (Mobile-First)
A heavily optimized mobile web interface for citizens and beachgoers to report live incidents.
* **Smart Uploads:** Direct image capture and file upload for visual evidence.
* **Auto-Geolocation:** Utilizes the browser's Geolocation API to instantly acquire and append high-accuracy GPS coordinates (Latitude/Longitude).
* **Frictionless UX:** Requires minimal text input, offloading the heavy analysis to Backend Agent 1 (Gemini Vision).

### 2. GVMC Command Center (Desktop-Optimized)
A real-time dashboard for supervisors to monitor the coastline and manage automated dispatches.
* **Live Incident Feed:** Dynamically fetches and displays pending hazards and debris reports directly from the Supabase backend.
* **Metadata Parsing:** Visualizes AI-generated severity levels, classification tags, and location data in a clean data grid.
* **Agent 3 Trigger:** An interactive dispatch hub allowing supervisors to manually deploy automated responder emails (via Nodemailer) to cleanup teams or lifeguards.

---

## 🚀 Local Development Setup

To run this Next.js frontend locally:

**1. Clone the repository**
```bash
git clone [https://github.com/U-Jayadhar/theeram-frontend.git](https://github.com/U-Jayadhar/theeram-frontend.git)
cd theeram-frontend

```

**2. Install dependencies**

```bash
npm install

```

**3. Configure Environment Variables**
Ensure you have the backend running locally or map the API routes in `.env.local` to the deployed backend URL.

**4. Start the development server**

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to view the application.

---

## 👨‍💻 Team Jaya | Contributors

This project was built collaboratively during the GDG Vizag APL Hackathon.

* **Jayadhar Ummadisingu** (Frontend Architecture & UI/UX) - [GitHub](https://github.com/U-Jayadhar/)
* **Vijay Kumar Tholeti** (Backend API, AI Agents & Supabase) - [GitHub](https://github.com/vijay-2155/)
* **Reddy Velangani Ridhima** (Ideation & Support) - [GitHub](https://github.com/rvridhima)

```
