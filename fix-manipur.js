const fs = require('fs');

let content = fs.readFileSync('constants/websiteData.js', 'utf-8');

const header = `import React from 'react';

export const hm = (text) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(Manipur)/g);
  return parts.map((part, index) => 
    part === 'Manipur' ? <span key={index} className="red-manipur">Manipur</span> : part
  );
};

`;

content = content.replace(/([a-zA-Z0-9_]+):\s*('[^']*Manipur[^']*'|`[^`]*Manipur[^`]*`|\"[^\"]*Manipur[^\"]*\")/g, (match, key, str) => {
  // Ignore imageAlt and logo
  if (key === 'imageAlt' || key === 'logo') {
    return match;
  }
  return `${key}: hm(${str})`;
});

// For arrays like body: [...]
content = content.replace(/body:\s*\[([\s\S]*?)\]/, (match, arrContent) => {
  const newArr = arrContent.replace(/('[^']*Manipur[^']*'|\"[^\"]*Manipur[^\"]*\")/g, 'hm($1)');
  return `body: [${newArr}]`;
});

content = header + content;

fs.writeFileSync('constants/websiteData.js', content);
console.log('Modified websiteData.js successfully');
