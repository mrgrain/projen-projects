import { readFileSync } from 'fs';
import { join } from 'path';
import { LogoSystemOptions } from '../LogoSystem';

export function findLogo(options: LogoSystemOptions = {}) {
  const dirName = options.dirName ?? 'images';
  const maybeLogoPath = join(dirName, options.logo?.file ?? 'logo.svg');
  const logo = loadLogo(maybeLogoPath);

  return {
    dirName,
    logo,
  };
}

export function loadLogo(filePath: string): string | undefined {
  try {
    return readFileSync(filePath).toString().trim();
  } catch {
    return;
  }
}
