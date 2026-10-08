#!/usr/bin/env node
/**
 * Un solo comando: build → commit → push → firebase deploy.
 *   npm run ship                 → mensaje de commit automático
 *   npm run ship -- "mensaje"    → mensaje personalizado
 * Requisitos (una sola vez): `npm i -g firebase-tools` y `firebase login`.
 */
import { execSync } from 'node:child_process';

const run = (cmd, opts = {}) => {
  console.log(`\n▶ ${cmd}`);
  return execSync(cmd, { stdio: 'inherit', ...opts });
};
const out = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const msg = process.argv.slice(2).join(' ') || `Deploy ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`;

try {
  run('npm run build');

  const branch = out('git rev-parse --abbrev-ref HEAD');
  if (out('git status --porcelain')) {
    run('git add -A');
    run(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
  } else {
    console.log('\n(sin cambios que commitear)');
  }
  run(`git push origin ${branch}`);

  try { out('firebase --version'); } catch {
    console.error('\n✖ firebase-tools no está instalado: npm i -g firebase-tools && firebase login');
    process.exit(1);
  }
  run('firebase deploy --only hosting');
  console.log('\n✔ Publicado en https://productosbogota.com/');
} catch (e) {
  console.error('\n✖ Falló el proceso. Revisa el error de arriba.');
  process.exit(1);
}
