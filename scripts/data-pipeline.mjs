import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const python=process.env.PYTHON || (process.platform==='win32'?'python':'python3');
const result=spawnSync(python,[fileURLToPath(new URL('./data-pipeline.py',import.meta.url)),...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,PYTHONUTF8:'1'}});
if(result.error)throw result.error;
process.exit(result.status??1);
