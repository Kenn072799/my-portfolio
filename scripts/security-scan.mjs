import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rules = [
  ['public-secret-env', /import\.meta\.env\.VITE_(?:ADMIN_API_KEY|GROQ_API_KEY|OPENAI_API_KEY|CLIENT_SECRET|PRIVATE_KEY)\b/g],
  ['private-key', /-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g],
  ['admin-key', /KAltes_Admin_[A-Za-z0-9_-]{16,}/g],
  ['provider-token', /\b(?:gsk_[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{30,}|AKIA[A-Z0-9]{16})\b/g],
  ['credential-url', /\b(?:postgres(?:ql)?|mongodb(?:\+srv)?):\/\/[^\s:"']+:[^\s@"']+@[^\s"']+/g],
  ['database-password', /\bPassword\s*=\s*([^;\r\n"']+)/gi],
  ['configured-secret', /"(?:AdminApiKey|ApiKey|ClientSecret|DefaultConnection)"\s*:\s*"([^"\r\n]+)"/gi],
  ['environment-secret', /^(?:VITE_ADMIN_API_KEY|GROQ_API_KEY|OPENAI_API_KEY|ADMIN_API_KEY|AdminApiKey|ConnectionStrings__DefaultConnection)\s*=\s*["']?([^\r\n"']+)/gm],
  ['request-api-key', /^X-Api-Key\s*:\s*([^\r\n]+)/gim],
];
const placeholder = /^(?:your(?:[_ -]|password)|replace|change[_-]?me|example|placeholder|<|\$\{|process\.|import\.|env:|qa-only|test-only|dummy|REDACTED|\.{3}$)/i;
export function scanSecrets(content) {
  const findings = [];
  for (const [kind, pattern] of rules) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      const value = (match[1] || match[0]).trim();
      if (!value || (kind !== 'public-secret-env' && placeholder.test(value))) continue;
      findings.push({ kind, line: content.slice(0, match.index).split('\n').length });
    }
  }
  return findings;
}
export function forbiddenPath(name) {
  const normalized = name.replaceAll('\\', '/');
  const base = path.posix.basename(normalized);
  if (/(^|\/)(?:\.vs|\.idea|node_modules|bin|obj|dist|dist-ssr|coverage|\.tools|playwright-report|test-results)(\/|$)/i.test(normalized)) return true;
  if (/^\.env(?:\..*)?$/.test(base) && !/^\.env\.(?:example|template)$/.test(base)) return true;
  if (/^appsettings\..*\.json$/i.test(base) && !/^appsettings\.(?:example|template)\.json$/i.test(base)) return true;
  return /(?:\.(?:pem|key|pfx|p12|jks|keystore|user|suo|http|log|db|sqlite3?|dump|bak|backup)$|^secrets\.json$|^\.npmrc$)/i.test(base);
}
function git(args, input) {
  return execFileSync('git', args, { input, maxBuffer: 96 * 1024 * 1024 });
}
function gitText(args, input) { return git(args, input).toString('utf8'); }
function objectEntries(revisions) {
  const objects = gitText(['rev-list', '--objects', ...revisions]).trim().split('\n').filter(Boolean).map((line) => {
    const separator = line.indexOf(' ');
    return { oid: separator < 0 ? line : line.slice(0, separator), name: separator < 0 ? '' : line.slice(separator + 1) };
  });
  if (!objects.length) return [];
  const metadata = gitText(['cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)'], objects.map(({ oid }) => oid).join('\n') + '\n').trim().split('\n');
  return objects.filter((_, index) => metadata[index]?.split(' ')[1] === 'blob');
}
function main() {
  const mode = process.argv[2] || '--worktree';
  process.chdir(gitText(['rev-parse', '--show-toplevel']).trim());
  const findings = [];
  let scanned = 0;
  const inspect = (name, buffer, source = '', checkPath = true) => {
    scanned++;
    if (checkPath && forbiddenPath(name)) findings.push({ path: name, kind: 'local-or-sensitive-file', source });
    if (/\.(?:png|jpe?g|webp|gif|ico|woff2?|ttf|zip|gz|pdf)$/i.test(name)) return;
    for (const match of scanSecrets(buffer.toString('utf8'))) findings.push({ path: name, ...match, source });
    if (buffer.includes(0)) for (const match of scanSecrets(buffer.toString('utf16le'))) findings.push({ path: name, ...match, source, encoding: 'utf16' });
  };
  if (mode === '--worktree') {
    const names = [...new Set(gitText(['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean))];
    for (const name of names) if (fs.existsSync(name) && fs.statSync(name).isFile()) inspect(name, fs.readFileSync(name));
  } else if (mode === '--bundle') {
    const directory = 'web-porfolio/my-portfolio/dist';
    if (!fs.existsSync(directory)) throw new Error('Build output is missing');
    const visit = (folder) => {
      for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
        const name = path.join(folder, entry.name);
        if (entry.isDirectory()) visit(name);
        else if (entry.isFile()) inspect(name, fs.readFileSync(name), 'build', false);
      }
    };
    visit(directory);
  } else if (mode === '--staged') {
    const names = gitText(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']).split('\0').filter(Boolean);
    for (const name of names) inspect(name, git(['show', `:${name}`]), 'index');
  } else if (mode === '--history' || mode === '--push') {
    const revisions = mode === '--history' ? ['--all'] : [];
    if (mode === '--push') {
      const updates = fs.readFileSync(0, 'utf8').trim().split('\n').filter(Boolean);
      for (const update of updates) {
        const [, local, , remote] = update.trim().split(/\s+/);
        if (/^0+$/.test(local)) continue;
        revisions.push(local);
        if (!/^0+$/.test(remote)) revisions.push(`^${remote}`);
      }
      if (!revisions.length) { console.log('Security scan: no commits to push.'); return; }
    }
    const entries = objectEntries(revisions);
    for (const { oid, name } of entries) inspect(name || oid, git(['cat-file', 'blob', oid]), oid.slice(0, 12), mode === '--push');
  } else throw new Error('Use --worktree, --staged, --history, --bundle, or --push.');
  const unique = [...new Map(findings.map((item) => [JSON.stringify(item), item])).values()];
  for (const item of unique) console.error(`${item.path}${item.line ? `:${item.line}` : ''} [${item.kind}]${item.source ? ` (${item.source})` : ''}`);
  console.log(`Security scan ${mode}: ${scanned} files/objects checked; ${unique.length} findings. Secret values are never printed.`);
  if (unique.length) process.exitCode = 1;
}
if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) {
    // Git errors might contain blob data; expose only a generic failure.
    console.error(`Security scan failed (${error.code || error.status || 'scan error'}). Review configuration before committing or pushing.`);
    process.exitCode = 2;
  }
}
