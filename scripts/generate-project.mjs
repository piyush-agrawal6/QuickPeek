// Dependency-free deterministic Xcode project generator. Run with Node 18+.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = (p, data) => { fs.mkdirSync(path.dirname(path.join(root, p)), {recursive:true}); fs.writeFileSync(path.join(root, p), data); };
const formats = JSON.parse(fs.readFileSync(path.join(root, 'POC/formats.json')));
const types = [...new Set(formats.map(f => f.type))];
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function xml(v) {
  if (Array.isArray(v)) return '<array>' + v.map(xml).join('') + '</array>';
  if (typeof v === 'object') return '<dict>' + Object.entries(v).map(([k,x])=>`<key>${escape(k)}</key>${xml(x)}`).join('') + '</dict>';
  if (typeof v === 'boolean') return v ? '<true/>' : '<false/>';
  if (typeof v === 'number') return `<integer>${v}</integer>`;
  return `<string>${escape(v)}</string>`;
}
const plist = v => '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">' + xml(v) + '</plist>\n';
const common = {
  CFBundleDevelopmentRegion:'en', CFBundleExecutable:'$(EXECUTABLE_NAME)',
  CFBundleIdentifier:'$(PRODUCT_BUNDLE_IDENTIFIER)', CFBundleName:'$(PRODUCT_NAME)',
  CFBundleDisplayName:'$(PEEK_DISPLAY_NAME)', CFBundleInfoDictionaryVersion:'6.0',
  CFBundleShortVersionString:'$(MARKETING_VERSION)', CFBundleVersion:'$(CURRENT_PROJECT_VERSION)',
  LSMinimumSystemVersion:'$(MACOSX_DEPLOYMENT_TARGET)'
};
const imports = formats.filter(f=>f.imported).map(f=>({
  UTTypeIdentifier:f.type, UTTypeDescription:f.name,
  UTTypeConformsTo:[f.text ? 'public.text' : 'public.data'],
  UTTypeTagSpecification:{'public.filename-extension':f.extensions}
}));
write('POC/Host/Info.plist', plist({...common, CFBundlePackageType:'APPL',
  NSPrincipalClass:'NSApplication', NSHighResolutionCapable:true,
  PeekWebsite:'$(PEEK_WEBSITE)', PeekSupportEmail:'$(PEEK_SUPPORT_EMAIL)',
  PeekPrivacyURL:'$(PEEK_PRIVACY_URL)', PeekTermsURL:'$(PEEK_TERMS_URL)',
  PeekAppStoreURL:'$(PEEK_APP_STORE_URL)', UTImportedTypeDeclarations:imports
}));
for (const [dir, point, cls] of [['Preview','preview','PreviewViewController'],['Thumbnail','thumbnail','ThumbnailProvider']]) {
  write(`POC/${dir}/Info.plist`, plist({...common, CFBundlePackageType:'XPC!',
    NSExtension:{NSExtensionPointIdentifier:`com.apple.quicklook.${point}`,
      NSExtensionPrincipalClass:`$(PRODUCT_MODULE_NAME).${cls}`,
      NSExtensionAttributes:{QLSupportedContentTypes:types,
        ...(dir==='Preview'?{QLIsDataBasedPreview:false, QLSupportsSearchableItems:false}:{QLThumbnailMinimumDimension:0})}}
  }));
}
for (const dir of ['Host','Preview','Thumbnail']) {
  write(`POC/${dir}/${dir}.entitlements`, plist({'com.apple.security.app-sandbox':true}));
}
// PBX identifiers are stable hashes, allowing reviewable diffs without XcodeGen.
const objects = {};
const id = s => crypto.createHash('sha256').update(s).digest('hex').slice(0,24).toUpperCase();
const add = (key, value) => { objects[id(key)] = value; return id(key); };
const file = (p,type) => add(p,{isa:'PBXFileReference',lastKnownFileType:type,path:p,sourceTree:'SOURCE_ROOT'});
const configRef = file('Config/Product.xcconfig','text.xcconfig');
const sourcePaths = ['POC/Host/ProbeApp.swift','POC/Shared/ProductConfiguration.swift','POC/Shared/FileProbe.swift','POC/Preview/PreviewViewController.swift','POC/Thumbnail/ThumbnailProvider.swift'];
const sources = Object.fromEntries(sourcePaths.map(p=>[p,file(p,'sourcecode.swift')]));
const productRefs = {};
const targetRefs = [];
for (const name of ['PeekProbe','PeekPreview','PeekThumbnail']) {
  productRefs[name] = add(`${name}-product`,{isa:'PBXFileReference',explicitFileType:name==='PeekProbe'?'wrapper.application':'wrapper.app-extension',includeInIndex:0,path:`${name}.${name==='PeekProbe'?'app':'appex'}`,sourceTree:'BUILT_PRODUCTS_DIR'});
}
function configs(key, settings) {
  const refs = ['Debug','Release'].map(name=>add(`${key}-${name}`,{isa:'XCBuildConfiguration',baseConfigurationReference:configRef,
    buildSettings:{...settings,SWIFT_OPTIMIZATION_LEVEL:name==='Debug'?'-Onone':'-O',DEBUG_INFORMATION_FORMAT:name==='Debug'?'dwarf':'dwarf-with-dsym'},name}));
  return add(`${key}-config-list`,{isa:'XCConfigurationList',buildConfigurations:refs,defaultConfigurationIsVisible:0,defaultConfigurationName:'Release'});
}
for (const name of ['PeekProbe','PeekPreview','PeekThumbnail']) {
  const isHost = name==='PeekProbe';
  const dir = isHost?'Host':name==='PeekPreview'?'Preview':'Thumbnail';
  const used = isHost ? sourcePaths.slice(0,2) : name==='PeekPreview' ? sourcePaths.slice(2,4) : sourcePaths.slice(4);
  const builds = used.map(p=>add(`${name}-${p}-build`,{isa:'PBXBuildFile',fileRef:sources[p]}));
  const phases = [add(`${name}-sources`,{isa:'PBXSourcesBuildPhase',buildActionMask:2147483647,files:builds,runOnlyForDeploymentPostprocessing:0}),
    add(`${name}-frameworks`,{isa:'PBXFrameworksBuildPhase',buildActionMask:2147483647,files:[],runOnlyForDeploymentPostprocessing:0})];
  const deps=[];
  if (isHost) {
    const embeds=['PeekPreview','PeekThumbnail'].map(ext=>add(`embed-${ext}`,{isa:'PBXBuildFile',fileRef:productRefs[ext],settings:{ATTRIBUTES:['RemoveHeadersOnCopy']}}));
    phases.push(add('embed-phase',{isa:'PBXCopyFilesBuildPhase',buildActionMask:2147483647,dstPath:'',dstSubfolderSpec:13,files:embeds,name:'Embed App Extensions',runOnlyForDeploymentPostprocessing:0}));
    for (const ext of ['PeekPreview','PeekThumbnail']) {
      const proxy=add(`proxy-${ext}`,{isa:'PBXContainerItemProxy',containerPortal:id('project'),proxyType:1,remoteGlobalIDString:id(ext),remoteInfo:ext});
      deps.push(add(`dependency-${ext}`,{isa:'PBXTargetDependency',target:id(ext),targetProxy:proxy}));
    }
  }
  targetRefs.push(add(name,{isa:'PBXNativeTarget',buildConfigurationList:configs(name,{
    PRODUCT_NAME:name,PRODUCT_BUNDLE_IDENTIFIER:`$(PEEK_BUNDLE_PREFIX)${isHost?'':'.'+dir.toLowerCase()}`,
    INFOPLIST_FILE:`POC/${dir}/Info.plist`,CODE_SIGN_ENTITLEMENTS:`POC/${dir}/${dir}.entitlements`,
    CODE_SIGN_STYLE:'Automatic',GENERATE_INFOPLIST_FILE:'NO',
    ENABLE_APP_SANDBOX:'YES',ENABLE_HARDENED_RUNTIME:'YES',
    APPLICATION_EXTENSION_API_ONLY:isHost?'NO':'YES',SKIP_INSTALL:isHost?'NO':'YES',
    LD_RUNPATH_SEARCH_PATHS:['$(inherited)','@executable_path/../Frameworks',...(isHost?[]:['@executable_path/../../../../Frameworks'])]
  }),buildPhases:phases,buildRules:[],dependencies:deps,name,productName:name,productReference:productRefs[name],productType:isHost?'com.apple.product-type.application':'com.apple.product-type.app-extension'}));
}
const products=add('products',{isa:'PBXGroup',children:Object.values(productRefs),name:'Products',sourceTree:'<group>'});
const main=add('main',{isa:'PBXGroup',children:[configRef,...Object.values(sources),products],sourceTree:'<group>'});
add('project',{isa:'PBXProject',attributes:{BuildIndependentTargetsInParallel:'YES',LastUpgradeCheck:'1600'},buildConfigurationList:configs('project',{
  SDKROOT:'macosx',CLANG_ENABLE_MODULES:'YES',SWIFT_STRICT_CONCURRENCY:'complete',
  GCC_WARN_INHIBIT_ALL_WARNINGS:'NO',ONLY_ACTIVE_ARCH:'NO'
}),compatibilityVersion:'Xcode 14.0',developmentRegion:'en',hasScannedForEncodings:0,knownRegions:['en','Base'],mainGroup:main,productRefGroup:products,projectDirPath:'',projectRoot:'',targets:targetRefs});
function pbx(v, level=0) {
  if (Array.isArray(v)) return '('+v.map(x=>pbx(x,level+1)).join(', ')+')';
  if (typeof v==='object') return '{\n'+Object.entries(v).map(([k,x])=>'\t'.repeat(level+1)+JSON.stringify(k)+' = '+pbx(x,level+1)+';').join('\n')+'\n'+'\t'.repeat(level)+'}';
  return typeof v==='number'?String(v):JSON.stringify(v);
}
write('PeekProbe.xcodeproj/project.pbxproj','// !$*UTF8*$!\n'+pbx({archiveVersion:1,classes:{},objectVersion:56,objects,rootObject:id('project')})+'\n');
write('PeekProbe.xcodeproj/xcshareddata/xcschemes/PeekProbe.xcscheme',`<?xml version="1.0" encoding="UTF-8"?>
<Scheme LastUpgradeVersion="1600" version="1.3">
 <BuildAction parallelizeBuildables="YES" buildImplicitDependencies="YES"><BuildActionEntries><BuildActionEntry buildForTesting="YES" buildForRunning="YES" buildForProfiling="YES" buildForArchiving="YES" buildForAnalyzing="YES"><BuildableReference BuildableIdentifier="primary" BlueprintIdentifier="${id('PeekProbe')}" BuildableName="PeekProbe.app" BlueprintName="PeekProbe" ReferencedContainer="container:PeekProbe.xcodeproj"/></BuildActionEntry></BuildActionEntries></BuildAction>
 <LaunchAction buildConfiguration="Debug" selectedDebuggerIdentifier="Xcode.DebuggerFoundation.Debugger.LLDB" selectedLauncherIdentifier="Xcode.IDEFoundation.Launcher.LLDB" launchStyle="0" useCustomWorkingDirectory="NO" ignoresPersistentStateOnLaunch="NO" debugDocumentVersioning="YES" debugServiceExtension="internal" allowLocationSimulation="YES"><BuildableProductRunnable runnableDebuggingMode="0"><BuildableReference BuildableIdentifier="primary" BlueprintIdentifier="${id('PeekProbe')}" BuildableName="PeekProbe.app" BlueprintName="PeekProbe" ReferencedContainer="container:PeekProbe.xcodeproj"/></BuildableProductRunnable></LaunchAction>
 <ProfileAction buildConfiguration="Release" shouldUseLaunchSchemeArgsEnv="YES" savedToolIdentifier="" useCustomWorkingDirectory="NO" debugDocumentVersioning="YES"/>
 <AnalyzeAction buildConfiguration="Debug"/><ArchiveAction buildConfiguration="Release" revealArchiveInOrganizer="YES"/>
</Scheme>\n`);
console.log('Generated Xcode project and probe configuration. macOS build still required.');
