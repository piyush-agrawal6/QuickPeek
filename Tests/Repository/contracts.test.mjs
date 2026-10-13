import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import os from 'node:os';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
// Read the generated OpenStep project as data, not by searching source text.
function parseProject(source) {
  const tokens=source.replace(/^\/\/.*\n/, '').match(/"(?:\\.|[^"\\])*"|[{}()=;,]|\d+/g);
  let i=0;
  function take(t) {assert.equal(tokens[i++], t);}
  function value() {
    if(tokens[i]==='{') { i++; const o={}; while(tokens[i]!=='}') {const k=value(); take('='); o[k]=value(); take(';');} i++; return o; }
    if(tokens[i]==='(') { i++; const a=[]; while(tokens[i]!==')') {a.push(value()); if(tokens[i]!==')') take(',');} i++; return a; }
    return JSON.parse(tokens[i++]);
  }
  const result=value(); assert.equal(i,tokens.length); return result;
}
const project=parseProject(read('PeekProbe.xcodeproj/project.pbxproj'));
const objects=project.objects;
const targets=Object.values(objects).filter(o=>o.isa==='PBXNativeTarget');

test('project has reachable host, two embedded extensions and matching target dependencies',()=>{
  const app=targets.find(t=>t.productType==='com.apple.product-type.application');
  const exts=targets.filter(t=>t.productType==='com.apple.product-type.app-extension');
  assert.ok(app); assert.equal(exts.length,2);
  const embed=app.buildPhases.map(id=>objects[id]).find(p=>p.isa==='PBXCopyFilesBuildPhase');
  assert.equal(embed.dstSubfolderSpec,13);
  assert.deepEqual(new Set(embed.files.map(id=>objects[id].fileRef)),new Set(exts.map(t=>t.productReference)));
  assert.deepEqual(new Set(app.dependencies.map(id=>objects[objects[id].target].name)),new Set(exts.map(t=>t.name)));
  assert.equal(objects[project.rootObject].targets.length,3);
});

test('CI scheme is shared and covers the audited configuration and bundle identities',()=>{
  const scheme=read('PeekProbe.xcodeproj/xcshareddata/xcschemes/PeekProbe.xcscheme');
  const host=Object.entries(objects).find(([,o])=>o.isa==='PBXNativeTarget' && o.name==='PeekProbe');
  assert.ok(scheme.includes(`BlueprintIdentifier="${host[0]}"`));
  assert.ok(scheme.includes('buildImplicitDependencies="YES"'));
  assert.ok(scheme.includes('buildForRunning="YES"'));
  const config=read('Config/Product.xcconfig');
  assert.match(config,/MACOSX_DEPLOYMENT_TARGET = 14\.0/);
  assert.match(config,/SWIFT_VERSION = 6\.0/);
  const expected={PeekProbe:'$(PEEK_BUNDLE_PREFIX)',PeekPreview:'$(PEEK_BUNDLE_PREFIX).preview',PeekThumbnail:'$(PEEK_BUNDLE_PREFIX).thumbnail'};
  for(const target of targets) {
    const configs=objects[target.buildConfigurationList].buildConfigurations.map(id=>objects[id]);
    assert.deepEqual(configs.map(c=>c.name).sort(),['Debug','Release']);
    for(const c of configs) assert.equal(c.buildSettings.PRODUCT_BUNDLE_IDENTIFIER,expected[target.name]);
  }
});

test('all object references resolve and all source/config paths exist',()=>{
  const refs=new Set(['buildConfigurationList','baseConfigurationReference','fileRef','containerPortal','target','targetProxy','mainGroup','productRefGroup','productReference','remoteGlobalIDString']);
  const arrays=new Set(['children','buildConfigurations','buildPhases','dependencies','files','targets']);
  for(const o of Object.values(objects)) {
    for(const [k,v] of Object.entries(o)) {
      if(refs.has(k)) assert.ok(objects[v],`Unresolved ${k}: ${v}`);
      if(arrays.has(k)) for(const id of v) assert.ok(objects[id],`Unresolved ${k}: ${id}`);
    }
    if(o.isa==='PBXFileReference' && o.sourceTree==='SOURCE_ROOT') assert.ok(fs.existsSync(path.join(root,o.path)),o.path);
    if(o.isa==='XCBuildConfiguration' && o.buildSettings.INFOPLIST_FILE) {
      assert.ok(fs.existsSync(path.join(root,o.buildSettings.INFOPLIST_FILE)));
      assert.ok(fs.existsSync(path.join(root,o.buildSettings.CODE_SIGN_ENTITLEMENTS)));
    }
  }
});

test('preview compiles shared access probe and thumbnail never links it',()=>{
  const sourcePaths=t=>t.buildPhases.map(id=>objects[id]).filter(p=>p.isa==='PBXSourcesBuildPhase').flatMap(p=>p.files.map(id=>objects[objects[id].fileRef].path));
  assert.ok(sourcePaths(targets.find(t=>t.name==='PeekPreview')).includes('POC/Shared/FileProbe.swift'));
  assert.deepEqual(sourcePaths(targets.find(t=>t.name==='PeekThumbnail')),['POC/Thumbnail/ThumbnailProvider.swift']);
});

test('format inventory covers every requested suffix without blanket handlers',()=>{
  const formats=JSON.parse(read('POC/formats.json'));
  const extensions=new Set(formats.flatMap(f=>f.extensions));
  for(const ext of ['json','jsonl','ndjson','yaml','yml','toml','xml','csv','tsv','env','log','sqlite','sqlite3','db','md']) assert.ok(extensions.has(ext));
  for(const target of ['Preview','Thumbnail']) {
    const plist=read(`POC/${target}/Info.plist`);
    const supported=plist.match(/<key>QLSupportedContentTypes<\/key><array>(.*?)<\/array>/s)[1];
    const declared=[...supported.matchAll(/<string>(.*?)<\/string>/g)].map(m=>m[1]);
    assert.deepEqual(new Set(declared),new Set(formats.map(f=>f.type)));
    assert.ok(!declared.includes('public.data') && !declared.includes('public.text'));
  }
  assert.ok(!read('POC/Host/Info.plist').includes('UTExportedTypeDeclarations'));
});

test('POC entitlements only grant app sandbox',()=>{
  for(const t of ['Host','Preview','Thumbnail']) {
    const xml=read(`POC/${t}/${t}.entitlements`);
    assert.deepEqual([...xml.matchAll(/<key>(.*?)<\/key>/g)].map(m=>m[1]),['com.apple.security.app-sandbox']);
    assert.ok(xml.includes('<true/>'));
  }
});

test('all 21 phases have actionable plans and required sections',()=>{
  const files=fs.readdirSync(path.join(root,'docs/phases')).sort();
  assert.equal(files.length,21);
  const master=read('docs/MASTER_PLAN.md');
  for(let i=0;i<files.length;i++) {
    assert.ok(files[i].startsWith(`PHASE_${String(i).padStart(2,'0')}_`));
    assert.ok(master.includes(`phases/${files[i]}`));
    const doc=read('docs/phases/'+files[i]);
    for(const h of ['Goal','Dependencies','Technical Decisions','Tasks','Testing Requirements','Acceptance Criteria','Risks','Deliverables','Completion Summary','Status']) assert.ok(doc.includes(`## ${h}\n`),`${files[i]}: ${h}`);
    assert.ok((doc.match(/^- \[[ x]\]/gm)||[]).length>=9);
    assert.match(doc,/## Status\n(?:Not Started|In Progress|Blocked|Review Required|Complete)\n/);
  }
});

test('relative documentation links point to existing files',()=>{
  function walk(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
  for(const file of [path.join(root,'README.md'),...walk(path.join(root,'docs'))].filter(f=>f.endsWith('.md'))) {
    for(const m of fs.readFileSync(file,'utf8').matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if(/^(https?:|#)/.test(m[1])) continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file),m[1].split('#')[0])),`${file}: ${m[1]}`);
    }
  }
});

test('checked-in project artifacts match deterministic regeneration',()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'peek-project-'));
  try {
    for(const f of ['scripts/generate-project.mjs','POC/formats.json']) {
      fs.mkdirSync(path.dirname(path.join(temp,f)),{recursive:true});
      fs.copyFileSync(path.join(root,f),path.join(temp,f));
    }
    execFileSync(process.execPath,[path.join(temp,'scripts/generate-project.mjs')]);
    const generated=['PeekProbe.xcodeproj/project.pbxproj','PeekProbe.xcodeproj/xcshareddata/xcschemes/PeekProbe.xcscheme',
      ...['Host','Preview','Thumbnail'].flatMap(t=>[`POC/${t}/Info.plist`,`POC/${t}/${t}.entitlements`])];
    for(const f of generated) assert.equal(fs.readFileSync(path.join(temp,f),'utf8').replaceAll('\r\n','\n'),read(f).replaceAll('\r\n','\n'),f);
  } finally { fs.rmSync(temp,{recursive:true,force:true}); }
});
