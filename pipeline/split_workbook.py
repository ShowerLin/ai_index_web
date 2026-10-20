"""One-time OOXML sheet removal preserving every retained worksheet byte.

Artifact Tool does not expose sheet removal in this runtime's documented API.
This package-level fallback changes only workbook membership and related metadata.
Run only after exporting non-Bloomberg inputs and taking a full backup.
"""
from pathlib import Path
import hashlib,json,posixpath,zipfile
from lxml import etree as E

ROOT=Path(__file__).resolve().parents[1]
BACKUP=ROOT/'backups/2026-10-15-portable-migration'
SOURCE=ROOT/'Indexlist.xlsx'
NS='http://schemas.openxmlformats.org/spreadsheetml/2006/main'
REL='http://schemas.openxmlformats.org/officeDocument/2006/relationships'
PNS='http://schemas.openxmlformats.org/package/2006/relationships'
REMOVED={'Cost Useful Task','OpenAI','Anthropic','Ramp AI Data'}
tag=lambda n:'{'+NS+'}'+n
serialize=lambda e:E.tostring(e,encoding='UTF-8',xml_declaration=True,standalone=True)
sha=lambda b:hashlib.sha256(b).hexdigest()

def main():
 original=(BACKUP/'Indexlist.before-split.xlsx').read_bytes()
 assert SOURCE.read_bytes()==original,'Workbook changed since backup; stop migration'
 for relative in ['data/research/task_economics/observations.csv','data/research/frontier_labs/openai_legacy_notes.json','data/research/frontier_labs/anthropic_legacy_notes.json','data/raw/ramp/latest/normalized.json']:
  assert (ROOT/relative).is_file(),relative
 with zipfile.ZipFile(SOURCE) as z:
  contents={n:z.read(n) for n in z.namelist()}
 result=dict(contents);wb=E.fromstring(contents['xl/workbook.xml']);sheets=wb.find(tag('sheets'))
 rels=E.fromstring(contents['xl/_rels/workbook.xml.rels']);relmap={r.get('Id'):r for r in rels}
 original_sheets=list(sheets);deleted_parts=set();kept=[];old_to_new={};removed_ids=set()
 for index,s in enumerate(original_sheets):
  rid=s.get('{'+REL+'}id');r=relmap[rid];target=r.get('Target')
  part=target.lstrip('/') if target.startswith('/') else posixpath.normpath('xl/'+target)
  if s.get('name') in REMOVED:
   sheets.remove(s);rels.remove(r);deleted_parts.add(part);removed_ids.add(s.get('sheetId'))
  else:
   kept.append((s.get('name'),part));old_to_new[index]=len(kept)-1
 assert len(kept)==14
 # No retained formulas may depend on removed sheets, including quoted references.
 for name,part in kept:
  tree=E.fromstring(contents[part])
  for f in tree.iter(tag('f')):
   formula=''.join(f.itertext())
   assert not any((n+'!' in formula or "'"+n+"'!" in formula) for n in REMOVED),(name,formula)
 names=wb.find(tag('definedNames'))
 if names is not None:
  for n in list(names):
   if n.get('localSheetId') is not None:
    old=int(n.get('localSheetId'))
    if old not in old_to_new:names.remove(n);continue
    n.set('localSheetId',str(old_to_new[old]))
   assert not any((v+'!' in (n.text or '') or "'"+v+"'!" in (n.text or '')) for v in REMOVED)
 for view in wb.iter(tag('workbookView')):
  for key in ['activeTab','firstSheet']:
   if view.get(key) is not None:view.set(key,str(old_to_new.get(int(view.get(key)),0)))
 # Remove sheet-owned relationship parts (tables/drawings/comments) recursively.
 pending=list(deleted_parts)
 while pending:
  part=pending.pop();folder,name=posixpath.split(part);rp=folder+'/_rels/'+name+'.rels'
  if rp not in contents:continue
  deleted_parts.add(rp)
  for r in E.fromstring(contents[rp]):
   if r.get('TargetMode')=='External':continue
   target=r.get('Target');child=target.lstrip('/') if target.startswith('/') else posixpath.normpath(folder+'/'+target)
   if child not in deleted_parts:deleted_parts.add(child);pending.append(child)
 # Protect any part also referenced by a retained relationship.
 for rp,body in contents.items():
  if not rp.endswith('.rels') or rp in deleted_parts or rp=='xl/_rels/workbook.xml.rels':continue
  folder=posixpath.dirname(posixpath.dirname(rp))
  for r in E.fromstring(body):
   if r.get('TargetMode')=='External':continue
   target=r.get('Target');child=target.lstrip('/') if target.startswith('/') else posixpath.normpath(folder+'/'+target)
   assert child not in deleted_parts,('Shared part would be removed',rp,child)
 if 'xl/calcChain.xml' in contents:
  chain=E.fromstring(contents['xl/calcChain.xml']);current=None
  for c in list(chain):
   current=c.get('i',current)
   if current in removed_ids:chain.remove(c)
   elif current:c.set('i',current)
  result['xl/calcChain.xml']=serialize(chain)
 result['xl/workbook.xml']=serialize(wb);result['xl/_rels/workbook.xml.rels']=serialize(rels)
 ct=E.fromstring(contents['[Content_Types].xml'])
 for entry in list(ct):
  if entry.get('PartName','').lstrip('/') in deleted_parts:ct.remove(entry)
 result['[Content_Types].xml']=serialize(ct)
 for part in deleted_parts:result.pop(part,None)
 # Update the Office sheet-title metadata without touching worksheet contents.
 if 'docProps/app.xml' in contents:
  app=E.fromstring(contents['docProps/app.xml']);en={'ep':'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties','vt':'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes'}
  titles=app.find('ep:TitlesOfParts/vt:vector',en)
  if titles is not None:
   for child in list(titles):
    if child.text in REMOVED:titles.remove(child)
   titles.set('size',str(len(titles)))
  pairs=app.find('ep:HeadingPairs/vt:vector',en)
  if pairs is not None:
   for i,child in enumerate(pairs):
    if ''.join(child.itertext())=='Worksheets' and i+1<len(pairs):
     count=next(iter(pairs[i+1]));count.text=str(len(kept))
  result['docProps/app.xml']=serialize(app)
 candidate=SOURCE.with_name('Indexlist.migration.tmp.xlsx')
 with zipfile.ZipFile(candidate,'w',compression=zipfile.ZIP_DEFLATED) as z:
  for part,body in result.items():z.writestr(part,body)
 with zipfile.ZipFile(candidate) as z:
  assert z.testzip() is None
  for name,part in kept:assert z.read(part)==contents[part],name
 report={'removedSheets':sorted(REMOVED),'retainedSheets':[n for n,p in kept],'retainedWorksheetBytesIdentical':True,'beforeSha256':sha(original),'afterSha256':sha(candidate.read_bytes()),'deletedPackageParts':sorted(deleted_parts),'changedRetainedPackageParts':[p for p in result if p in contents and result[p]!=contents[p]],'method':'OOXML package membership edit; retained worksheets, styles, shared strings, formula caches and external links preserved. No Bloomberg recalculation.'}
 (BACKUP/'workbook-verification.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
 candidate.replace(SOURCE)
 print(json.dumps(report,indent=2))

if __name__=='__main__':main()
