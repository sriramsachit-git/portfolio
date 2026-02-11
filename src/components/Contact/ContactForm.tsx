import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { siteConfig } from '@/data/config';
import styles from './ContactForm.module.scss';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // spam
    setStatus('sending');
    try {
      // Placeholder: replace with EmailJS or your backend
      await new Promise((r) => setTimeout(r, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <a href={`mailto:${siteConfig.email}`} className={styles.infoItem}>
          <Mail size={20} />
          {siteConfig.email}
        </a>
        <a href={`tel:${siteConfig.phone}`} className={styles.infoItem}>
          <Phone size={20} />
          {siteConfig.phone}
        </a>
        <p className={styles.infoItem}>
          <MapPin size={20} />
          {siteConfig.location}
        </p>
        <div className={styles.social}>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={24} />
          </a>
        </div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Your name"
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="you@example.com"
          />
        </label>
        <label className={styles.label}>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            required
            rows={4}
            placeholder="Your message"
          />
        </label>
        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'success' && <p className={styles.success}>Thanks! I'll get back to you soon.</p>}
        {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
