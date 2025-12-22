require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Define allowed origins
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL 
        ? process.env.CLIENT_URL.split(',') // Split comma-separated URLs
        : ['https://fwl-cpa.com', 'https://www.fwl-cpa.com']
      : ['http://localhost:3000', 'http://109.176.198.116:3000'];
    
    // Check if origin is explicitly allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Check for www/non-www variations
      const normalizedOrigin = origin.replace(/^https?:\/\/(www\.)?/, '');
      const isVariation = allowedOrigins.some(allowedOrigin => {
        const normalizedAllowed = allowedOrigin.replace(/^https?:\/\/(www\.)?/, '');
        return normalizedAllowed === normalizedOrigin;
      });
      
      if (isVariation) {
        callback(null, true);
      } else {
        console.log(`CORS blocked origin: ${origin}. Allowed: ${allowedOrigins.join(', ')}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connection established successfully');
    console.log(`🛢️  Database: ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Routes
app.use('/api/appointments', appointmentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    allowedOrigins: process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL 
        ? process.env.CLIENT_URL.split(',')
        : ['https://fwl-cpa.com', 'https://www.fwl-cpa.com']
      : ['http://localhost:3000', 'http://109.176.198.116:3000']
  });
});

// CORS preflight handler
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  console.error(err.stack);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS Error',
      message: 'Origin not allowed',
      requestOrigin: req.get('origin'),
      allowedOrigins: process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL 
          ? process.env.CLIENT_URL.split(',')
          : ['https://fwl-cpa.com', 'https://www.fwl-cpa.com']
        : ['http://localhost:3000', 'http://109.176.198.116:3000']
    });
  }
  
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌍 Allowed Origins: ${process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://fwl-cpa.com, https://www.fwl-cpa.com'
    : 'http://localhost:3000, http://109.176.198.116:3000'
  }`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});