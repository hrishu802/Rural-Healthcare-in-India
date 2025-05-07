import React from 'react';

// This is a placeholder for a real CLD diagram component
// In a complete implementation, this would use D3.js or a similar library
// to render an interactive causal loop diagram

const CLDDiagram: React.FC = () => {
  return (
    <div className="cld-diagram text-center">
      {/* Primary iframe embedding method */}
      <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '65%', overflow: 'hidden', marginBottom: '20px' }}>
        <iframe 
          src="https://drive.google.com/file/d/1ZC8nQIF67B3-D0PuDAfnEHMfuSfprJdK/preview"
          title="Causal Loop Diagram showing relationships between healthcare workforce factors in rural India"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '1px solid #eee',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Fallback link if iframe doesn't display properly */}
      <div className="mt-2">
        <a 
          href="https://drive.google.com/file/d/1ZC8nQIF67B3-D0PuDAfnEHMfuSfprJdK/view" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary"
        >
          Click here to view the diagram in a new tab if it's not displaying properly
        </a>
      </div>
    </div>
  );
};

export default CLDDiagram;
