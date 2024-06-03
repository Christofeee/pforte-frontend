"use client"
import React from 'react';
import Image from 'next/image';

const styles = {
  virtualClassroom: {
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem', // Spacing between sections
  },
  description: {
    flex: 1, // Take up available space
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap', // Allow features to wrap on smaller screens
    justifyContent: 'space-evenly', // Distribute features evenly
  },
  feature: {
    width: 'calc(33% - 2rem)', // Adjust width for desired layout
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textAlign: 'center',
    backgroundColor: '#98fb98'
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  cta: {
    marginTop: '2rem',
    textAlign: 'center',
  },
};

const About = () => {
  return (
    <>
      <div style={{ height: '400px', position: 'relative' }}>
        <Image
          src="/assets/images/welcome_bg.jpg"
          alt="My Logo"
          fill
          sizes='100vw'
          style={{ objectFit: 'cover', padding: '50px' }}
        />
      </div>
      <section style={styles.virtualClassroom}>
        <h1>P F O R T E `</h1>
        <div style={styles.description}>
          <p>
            Experience a seamless learning environment from the comfort of your home. Our virtual classroom provides a dynamic and interactive platform for you to connect with instructors and classmates.
          </p>
        </div>
        <div style={styles.features}>
          <div style={styles.feature}>
            <i className="fas fa-comments" style={styles.featureIcon}></i>
            <h4>Live Chat and Q&A</h4>
            <p>Ask questions, participate in discussions, and receive instant feedback.</p>
          </div>
          <div style={styles.feature}>
            <i className="fas fa-file-alt" style={styles.featureIcon}></i>
            <h4>Shared Resources</h4>
            <p>Access course materials, recordings, and assignments anytime, anywhere.</p>
          </div>
        </div>
        <div style={styles.cta}>
          <button>Get Started</button>
        </div>
      </section>
    </>
  );
};

export default About;