import {readdir,readFile} from 'node:fs/promises';
import {relative,resolve,extname} from 'node:path';
import {execFileSync} from 'node:child_process';

const root=resolve(import.meta.dirname,'..');
const skip=new Set(['.git','node_modules','dist','coverage','test-results']);
const rootFiles=new Set(['.gitignore','pnpm-workspace.yaml','package.json','pnpm-lock.yaml','index.html','tsconfig.json','vite.config.ts','README.md','LICENSE','CONTRIBUTING.md','SECURITY.md','THIRD_PARTY_NOTICES.md']);
const directories=new Set(['src','tests','scripts','docs','.github']);
const extensions=new Set(['.ts','.tsx','.mjs','.json','.css','.html','.md','.yaml','.yml']);
const failures=[];
const files=[];
async function walk(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    if(skip.has(entry.name)&&directory===root)continue;
    const path=resolve(directory,entry.name),name=relative(root,path).replaceAll('\\','/');
    if(entry.isSymbolicLink()){failures.push('Symbolic link: '+name);continue;}
    if(directory===root&&!rootFiles.has(entry.name)&&!directories.has(entry.name)){failures.push('Not in export allowlist: '+name);continue;}
    if(entry.isDirectory()){await walk(path);continue;}
    if(!rootFiles.has(name)&&!extensions.has(extname(name))){failures.push('Non-source file: '+name);continue;}
    const buffer=await readFile(path);
    let content;try{content=new TextDecoder('utf-8',{fatal:true}).decode(buffer);}catch{failures.push('Non-UTF-8 file: '+name);continue;}
    if(buffer.includes(0))failures.push('Binary content: '+name);
    // Heuristics supplement the strict allowlist; they are not a legal review.
    const secrets=[/gh[pousr]_[A-Za-z0-9]{30,}/,/github_pat_[A-Za-z0-9_]{30,}/,/-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,/AKIA[A-Z0-9]{16}/];
    if(secrets.some(pattern=>pattern.test(content)))failures.push('Credential candidate: '+name);
    if(/https?:\/\/(?:\d{1,3}\.){3}\d{1,3}/.test(content))failures.push('Literal server address: '+name);
    if(/(?:[A-Z]:[\\/](?:Users|Codex)|wcbk\.top)/i.test(content))failures.push('Private environment reference: '+name);
    files.push(name);
  }
}
await walk(root);
try{
  const tracked=execFileSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).split('\0').filter(Boolean);
  for(const name of tracked)if(!files.includes(name))failures.push('Tracked file outside checked export: '+name);
}catch{/* A newly created folder need not be a repository yet. */}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Public export checks passed: ${files.length} UTF-8 source/document files; no media files.`);
