require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Job = require('./models/Job');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected! :D"))
  .catch(err => console.log("DB Connection Error:", err));

// Routes
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New job
app.post('/jobs', async (req, res) => {
  const job = new Job({
    company: req.body.company,
    position: req.body.position,
    status: req.body.status,
    link: req.body.link 
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update status
app.put('/jobs/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id, 
      { 
        status: status,
        lastUpdated: new Date()
      }, 
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});