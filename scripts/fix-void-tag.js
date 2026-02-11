/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../node_modules/node-html-parser/dist/void-tag.js');

try {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('exports.default = VoidTag;')) {
      content = content.replace('exports.default = VoidTag;', 'module.exports = VoidTag;');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Successfully fixed void-tag.js export');
    } else {
      console.log('void-tag.js already fixed or content mismatch');
    }
  } else {
    console.log('void-tag.js not found at:', filePath);
  }
} catch (error) {
  console.error('Error fixing void-tag.js:', error);
}
