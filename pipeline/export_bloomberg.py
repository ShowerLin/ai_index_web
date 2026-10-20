"""Export cached numeric XML without interpreting accidental date formatting."""
from pathlib import Path
import hashlib,json,posixpath,zipfile,xml.etree.ElementTree as E

def export(source,destination):
 ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
 with zipfile.ZipFile(source) as z:
  strings=[''.join(e.itertext()) for e in E.fromstring(z.read('xl/sharedStrings.xml'))]
  rel={e.get('Id'):e.get('Target') for e in E.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
  sheets=E.fromstring(z.read('xl/workbook.xml')).find('m:sheets',ns)
  records=[]
  for sheet in sheets:
   name=sheet.get('name')
   if name!='Index Price Value':continue
   target=rel[sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')]
   target=target.lstrip('/') if target.startswith('/') else posixpath.normpath('xl/'+target)
   rows=[]
   for row in E.fromstring(z.read(target)).findall('m:sheetData/m:row',ns):
    cells={}
    for c in row:
     if not c.tag.endswith('}c'):continue
     letters=''.join(filter(str.isalpha,c.get('r')));col=0
     for a in letters:col=col*26+ord(a)-64
     v=c.find('m:v',ns);value=None
     if c.get('t')=='inlineStr':value=''.join(c.find('m:is',ns).itertext())
     elif v is not None:
      value=v.text
      if c.get('t')=='s':value=strings[int(value)]
      elif c.get('t') not in ('str','e'):value=float(value) if value is not None else None
     cells[col]=value
    rows.append([cells.get(i) for i in range(1,max(cells,default=0)+1)])
   records.append({'kind':'table','sheet':name,'values':rows,'sourceSha256':hashlib.sha256(Path(source).read_bytes()).hexdigest()})
 destination=Path(destination);destination.parent.mkdir(parents=True,exist_ok=True)
 destination.write_text('\n'.join(json.dumps(r) for r in records)+'\n',encoding='utf-8')

if __name__=='__main__':
 root=Path(__file__).resolve().parents[1]
 export(root/'Indexlist.xlsx',root/'data/derived/bloomberg.inspect.ndjson')
