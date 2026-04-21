import express from 'express';
import { authenticateToken } from './auth.js';
import { getDatabase } from '../database/init.js';

const router = express.Router();

router.use(authenticateToken);

// Get all jobs for user
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const jobs = await db.all(
      'SELECT * FROM jobs WHERE userId = ? ORDER BY createdAt DESC',
      [req.user.id]
    );
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const job = await db.get(
      'SELECT * FROM jobs WHERE id = ? AND userId = ?',
      [req.params.id, req.user.id]
    );
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create job
router.post('/', async (req, res) => {
  try {
    const { title, link, status = 'Saved', applicationDate, keyContacts, salaryExpectations, notes } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Job title required' });
    }

    const db = await getDatabase();
    const result = await db.run(
      `INSERT INTO jobs (userId, title, link, status, applicationDate, keyContacts, salaryExpectations, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, title, link || null, status, applicationDate || null, keyContacts || null, salaryExpectations || null, notes || null]
    );

    const job = await db.get('SELECT * FROM jobs WHERE id = ?', [result.lastID]);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const { title, link, status, applicationDate, keyContacts, salaryExpectations, notes } = req.body;
    const db = await getDatabase();

    const job = await db.get(
      'SELECT * FROM jobs WHERE id = ? AND userId = ?',
      [req.params.id, req.user.id]
    );

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await db.run(
      `UPDATE jobs SET title = ?, link = ?, status = ?, applicationDate = ?, keyContacts = ?, salaryExpectations = ?, notes = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title || job.title,
        link !== undefined ? link : job.link,
        status || job.status,
        applicationDate !== undefined ? applicationDate : job.applicationDate,
        keyContacts !== undefined ? keyContacts : job.keyContacts,
        salaryExpectations !== undefined ? salaryExpectations : job.salaryExpectations,
        notes !== undefined ? notes : job.notes,
        req.params.id
      ]
    );

    const updatedJob = await db.get('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const job = await db.get(
      'SELECT * FROM jobs WHERE id = ? AND userId = ?',
      [req.params.id, req.user.id]
    );

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await db.run('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
