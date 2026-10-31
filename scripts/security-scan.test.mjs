import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanSecrets, forbiddenPath } from './security-scan.mjs';
const scanner = fileURLToPath(new URL('./security-scan.mjs', import.meta.url));
const syntheticKey = ['KAltes', 'Admin', 'x'.repeat(32)].join('_');

test('finds secrets without exposing values in findings', () => {
  const sample = `const key = "${syntheticKey}";`;
  const findings = scanSecrets(sample);
  assert.equal(findings[0].kind, 'admin-key');
  assert.equal(JSON.stringify(findings).includes(syntheticKey), false);
  assert.ok(scanSecrets('-----BEGIN ' + 'PRIVATE KEY-----').length);
  assert.ok(scanSecrets('Password=' + 'actual-secret-value').length);
});
test('permits empty settings and placeholders, but blocks public secret references', () => {
  assert.deepEqual(scanSecrets('{"AdminApiKey":"","ApiKey":""}'), []);
  assert.deepEqual(scanSecrets('Password=yourpassword; Password=...'), []);
  const reference = ['import', 'meta', 'env', 'VITE_ADMIN_API_KEY'].join('.');
  assert.equal(scanSecrets(`const key = ${reference};`)[0].kind, 'public-secret-env');
});
test('protects environment files and artifacts while allowing examples and source', () => {
  for (const name of ['.env', 'backend/.env.production', 'a/.vs/sessions/data', 'a/appsettings.Production.json', 'cert.pfx', 'data.dump', 'a/node_modules/package.json']) assert.equal(forbiddenPath(name), true, name);
  for (const name of ['.env.example', 'a/.env.template', 'a/appsettings.json', 'a/appsettings.example.json', 'src/App.jsx', 'scripts/security-scan.mjs']) assert.equal(forbiddenPath(name), false, name);
});
test('scans staged content and outgoing history, not merely working-tree files', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-security-'));
  const git = (...args) => execFileSync('git', args, { cwd: directory, stdio: 'pipe' }).toString().trim();
  const run = (mode, input) => spawnSync(process.execPath, [scanner, mode], { cwd: directory, input, encoding: 'utf8' });
  try {
    git('init', '-q'); git('config', 'user.name', 'Security Test'); git('config', 'user.email', 'test@example.invalid');
    git('config', 'core.hooksPath', fileURLToPath(new URL('../.githooks/', import.meta.url)));
    git('config', 'security.nodePath', process.execPath);
    fs.mkdirSync(path.join(directory, 'scripts'));
    fs.copyFileSync(scanner, path.join(directory, 'scripts/security-scan.mjs'));
    fs.writeFileSync(path.join(directory, 'safe.js'), 'export const value = 1;');
    git('add', 'safe.js'); git('-c', 'core.hooksPath=', 'commit', '-qm', 'safe');
    const base = git('rev-parse', 'HEAD');
    fs.writeFileSync(path.join(directory, 'secret.js'), `const key="${syntheticKey}";`);
    git('add', 'secret.js');
    fs.writeFileSync(path.join(directory, 'secret.js'), 'const key="";');
    const staged = run('--staged');
    assert.equal(staged.status, 1);
    assert.equal((staged.stdout + staged.stderr).includes(syntheticKey), false);
    const commitHook = spawnSync('git', ['hook', 'run', 'pre-commit'], { cwd: directory, encoding: 'utf8' });
    assert.equal(commitHook.status, 1);
    assert.ok((commitHook.stdout + commitHook.stderr).includes('[admin-key]'));
    git('-c', 'core.hooksPath=', 'commit', '-qm', 'fixture with secret');
    fs.writeFileSync(path.join(directory, 'secret.js'), 'const key="";');
    git('add', 'secret.js'); git('-c', 'core.hooksPath=', 'commit', '-qm', 'remove fixture secret');
    const tip = git('rev-parse', 'HEAD');
    const push = run('--push', `refs/heads/main ${tip} refs/heads/main ${base}\n`);
    assert.equal(push.status, 1, 'an intermediate secret commit must block a push');
    assert.equal((push.stdout + push.stderr).includes(syntheticKey), false);
    const updatesFile = path.join(directory, '.git', 'push-updates');
    fs.writeFileSync(updatesFile, `refs/heads/main ${tip} refs/heads/main ${base}\n`);
    const pushHook = spawnSync('git', ['hook', 'run', `--to-stdin=${updatesFile}`, 'pre-push'], {
      cwd: directory, encoding: 'utf8',
    });
    assert.equal(pushHook.status, 1);
    assert.ok((pushHook.stdout + pushHook.stderr).includes('[admin-key]'));
    const output = path.join(directory, 'web-porfolio', 'my-portfolio', 'dist');
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(output, 'index.js'), `const key="${syntheticKey}";`);
    const bundle = run('--bundle');
    assert.equal(bundle.status, 1, 'a built client secret must fail the build scan');
    assert.equal((bundle.stdout + bundle.stderr).includes(syntheticKey), false);
  } finally {
    // Only remove the verified temporary fixture directory created above.
    assert.ok(directory.startsWith(path.join(os.tmpdir(), 'portfolio-security-')));
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
