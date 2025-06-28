import * as fs from 'node:fs';
import * as path from 'node:path';

export function resource(res: string): string {
  return path.join(__dirname, '..', '..', 'resources', res);
}

export function jsonResource<T>(res: string): T {
  return JSON.parse(fs.readFileSync(resource(res), 'utf8'));
}
