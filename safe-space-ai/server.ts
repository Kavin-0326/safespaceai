import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Safe Space AI API is running" });
  });

  // Mock Data for Incidents
  let incidents = [
    {
      id: "1",
      title: "Suspicious Activity",
      description: "Observed someone loitering near the main entrance for over an hour.",
      category: "Suspicious Activity",
      status: "Resolved",
      timestamp: new Date().toISOString(),
      location: "Main Entrance",
    },
    {
      id: "2",
      title: "Broken Street Light",
      description: "The street light near the parking lot is completely out.",
      category: "Maintenance",
      status: "In Progress",
      timestamp: new Date().toISOString(),
      location: "Parking Lot B",
    }
  ];

  app.get("/api/incidents", (req, res) => {
    res.json(incidents);
  });

  app.post("/api/incidents", (req, res) => {
    const newIncident = {
      id: Math.random().toString(36).substr(2, 9),
      ...req.body,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };
    incidents = [newIncident, ...incidents];
    res.status(201).json(newIncident);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
