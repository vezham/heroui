const path = require('path');
const fs = require('fs').promises;

const { getPackages } = require('@manypkg/get-packages');
const readChangesets = require('@changesets/read').default;

// Cache for packages and changesets
let packagesCache = null;
let changesetsCache = null;

async function getPackagesFromRepo() {
  if (packagesCache) {
    return packagesCache;
  }

  try {
    const { packages } = await getPackages(process.cwd());

    packagesCache = packages;

    return packages;
  } catch (error) {
    console.error('Failed to get packages:', error.message);
    throw new Error('Package retrieval failed');
  }
}

async function getChangesets() {
  if (changesetsCache) {
    return changesetsCache;
  }

  try {
    const changesets = await readChangesets(process.cwd());

    changesetsCache = changesets;

    return changesets;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn('No changesets found. Run `npx changeset` to create one.');

      return [];
    }
    console.error('Failed to read changesets:', error.message);
    throw new Error('Changeset reading failed');
  }
}

function getVersionBumpType(releases, packageName) {
  const bumpTypes = releases.reduce((types, changeset) => {
    const release = changeset.releases.find(r => r.name === packageName);

    if (release) {
      types.add(release.type);
    }

    return types;
  }, new Set());

  // Return highest priority bump type
  if (bumpTypes.has('major')) return 'major';
  if (bumpTypes.has('minor')) return 'minor';
  if (bumpTypes.has('patch')) return 'patch';

  return 'unknown';
}

function calculateNextVersion(currentVersion, bumpType) {
  const [major, minor, patch] = currentVersion.replace(/^v/, '').split('.').map(Number);
  
  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return currentVersion;
  }
}

async function saveToJson(data, filename = '.vezham/publish-check-result.json') {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    console.log(`\nResults saved to ${filename}`);
  } catch (error) {
    console.error('Failed to save JSON file:', error.message);
  }
}

async function getPublishablePackages() {
  try {
    console.time('Publishing check');

    // Parallel fetch of packages and changesets
    const [packages, changesets] = await Promise.all([
      getPackagesFromRepo(),
      getChangesets()
    ]);

    if (!changesets.length) {
      console.log('No changesets found. No packages ready for publishing.');
      await saveToJson({ publishablePackages: [] });

      return [];
    }

    // Create a map of package names to their changes
    const changedPackagesMap = new Map();

    changesets.forEach(changeset => {
      changeset.releases.forEach(release => {
        if (!changedPackagesMap.has(release.name)) {
          changedPackagesMap.set(release.name, []);
        }
        changedPackagesMap.get(release.name).push(changeset);
      });
    });

    // Filter packages and collect information
    const publishablePackages = packages.filter(pkg => 
      changedPackagesMap.has(pkg.packageJson.name)
    );

    if (publishablePackages.length === 0) {
      console.log('No packages ready for publishing.');
      await saveToJson({ publishablePackages: [] });

      return [];
    }

    // Prepare data for both console output and JSON
    const publishData = {
      timestamp: new Date().toISOString(),
      publishablePackages: publishablePackages.map(pkg => {
        const pkgName = pkg.packageJson.name;
        const currentVersion = pkg.packageJson.version;
        const bumpType = getVersionBumpType(changesets, pkgName);
        const nextVersion = calculateNextVersion(currentVersion, bumpType);
        const relativePath = path.relative(process.cwd(), pkg.dir);
        const absolutePath = pkg.dir;
        const packageChangesets = changedPackagesMap.get(pkgName);

        // Console output for this package
        console.log(`\nPackage: ${pkgName}`);
        console.log(`Directory:`);
        console.log(`  - Relative: ${relativePath}`);
        console.log(`  - Absolute: ${absolutePath}`);
        console.log('Version:');
        console.log(`  - Current: ${currentVersion}`);
        console.log(`  - Bump Type: ${bumpType}`);
        console.log(`  - Next Version: ${nextVersion}`);
        
        if (packageChangesets.length > 0) {
          console.log('Changes:');
          packageChangesets.forEach(changeset => {
            console.log(`  - ${changeset.summary}`);
          });
        }

        // Return structured data for JSON
        return {
          name: pkgName,
          directory: {
            relative: relativePath,
            absolute: absolutePath
          },
          version: {
            current: currentVersion,
            bumpType: bumpType,
            next: nextVersion
          },
          changes: packageChangesets.map(changeset => changeset.summary)
        };
      })
    };

    // Save to JSON file
    await saveToJson(publishData);

    console.timeEnd('Publishing check');

    return publishablePackages;
  } catch (error) {
    console.error('\nError checking publishable packages:', error.message);
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  getPublishablePackages();
}

// Export for potential programmatic use
module.exports = {
  getPublishablePackages,
  getPackagesFromRepo,
  getChangesets
};