import * as fs from 'fs';
import * as path from 'path';
import type { NodeVersionSpec } from '../../src/features/node-version';

async function downloadNodeVersions() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/actions/node-versions/main/versions-manifest.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Create the output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', '..', 'resources');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the data to a file
    const outputPath = path.join(outputDir, 'node-versions.json');
    fs.writeFileSync(outputPath, JSON.stringify(cleanData(data), null, 2));

    console.log('Successfully downloaded and saved node versions manifest');
  } catch (error) {
    console.error('Error downloading node versions manifest:', error);
    process.exit(1);
  }
}


function cleanData(data: object[]): NodeVersionSpec[] {
  const all = data.map((item) => {
    const { version, stable, lts } = item as any;
    return { version, stable, lts };
  }).sort((a, b) => {
    const aVersion = a.version.split('.').map(Number);
    const bVersion = b.version.split('.').map(Number);
    for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
      if (aVersion[i] < bVersion[i]) return -1;
      if (aVersion[i] > bVersion[i]) return 1;
    }
    return 0;
  })
    .reverse()
    .reduce((allSpecs, current) => {
      const major = current.version.split('.')[0];
      if (allSpecs[major]) {
        return allSpecs;
      }
      allSpecs[major] = {
        major,
        ...current,
      };
      return allSpecs;
    }, {});

  return Object.values(all);
}

// Execute the download
void downloadNodeVersions();
