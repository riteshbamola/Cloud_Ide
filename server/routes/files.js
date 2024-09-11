const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const router = express.Router();

async function generateFileTree(directory) {
  async function buildTree(currentDir) {
    const files = await fs.readdir(currentDir);
    const tree = [];

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = await fs.stat(filePath);

      const node = {
        name: file,
        checked: 0,
        isOpen: false,
        routeofnode: filePath,
      };

      if (stat.isDirectory()) {
        node.isDir = true;
        node.children = await buildTree(filePath); // Recursively build the tree for directories
      }
      else {
        node.isDir = false;
      }

      tree.push(node); // Add the node to the tree array
    }


  }

  return {
    name: 'root',
    checked: 0,
    isOpen: true,
    children: await buildTree(directory),
    routeofnode: '/',
    isDir: true
  };
}

router.get('/files', async (req, res) => {
  try {
    const fileTree = await generateFileTree('./user');
    return res.json({ fileTree });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate file tree' });
  }
});


router.get('/files/content', async (req, res) => {
  try {
    const path = req.query.path; // Ensure this is the correct way to get the query parameter
    if (typeof path !== 'string') {
      return res.status(400).json({ error: 'Invalid path parameter' });
    }

    const content = await fs.readFile(`./${path}`, 'utf-8');
    return res.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).json({ error: 'Error reading file' });
  }
});

router.get('/collaborate/:id', async (req, res) => {
  try {
    const path = req.params.id; // Ensure this is the correct way to get the query parameter
    if (typeof path !== 'string') {
      return res.status(400).json({ error: 'Invalid path parameter' });
    }

    const content = await fs.readFile(`./${path}`, 'utf-8');
    return res.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).json({ error: 'Error reading file' });
  }
})
module.exports = router;
