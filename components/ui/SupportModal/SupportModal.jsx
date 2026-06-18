'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';

export default function SupportModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', age: '', thoughts: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setFormData({ name: '', age: '', thoughts: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button className="modal-close" onClick={handleClose} aria-label="Close form">
              <MdClose size={24} />
            </button>

            {success ? (
              <div className="modal-success">
                <h3 className="modal-title">Thank You</h3>
                <p className="modal-subtitle" style={{ marginBottom: '2rem' }}>
                  Your voice has been heard. Thank you for standing with <span className="red-manipur">Manipur</span>.
                </p>
                <div style={{ position: 'relative' }}>
                  <button className="btn btn-primary" onClick={handleShare} style={{ width: '100%' }}>
                    Share The Story
                  </button>
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: -45, x: '-50%' }}
                        exit={{ opacity: 0, y: -55, x: '-50%' }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '50%',
                          background: 'var(--accent-gold)',
                          color: '#000',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          pointerEvents: 'none',
                        }}
                      >
                        Link copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <>
                <h2 id="modal-title" className="modal-title">Join The Movement</h2>
                <p className="modal-subtitle">Share your thoughts to stand in solidarity.</p>
                
                {error && <div className="modal-error">{error}</div>}
                
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      id="age"
                      required
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Your Age"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="thoughts">Your Thoughts on Manipur</label>
                    <textarea
                      id="thoughts"
                      required
                      rows="4"
                      value={formData.thoughts}
                      onChange={(e) => setFormData({ ...formData, thoughts: e.target.value })}
                      placeholder="What does standing with Manipur mean to you?"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                    {loading ? 'Submitting...' : 'Support'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
