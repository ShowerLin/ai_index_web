import {existsSync} from 'node:fs';
import {homedir} from 'node:os';
import {join,resolve} from 'node:path';
export function sharedDataRoot(){
 const explicit=process.env.AI_INDEX_DATA_ROOT;
 const candidates=explicit?[explicit]:[
  ...['OneDrive','OneDriveConsumer','OneDriveCommercial'].filter(k=>process.env[k]).map(k=>join(process.env[k],'AI_Index')),
  join(homedir(),'OneDrive','AI_Index'),join(homedir(),'Library','CloudStorage','OneDrive-Personal','AI_Index')];
 const found=[...new Set(candidates.map(p=>resolve(p)).filter(p=>existsSync(join(p,'pipeline','run.py'))))];
 if(found.length!==1)throw new Error('Set AI_INDEX_DATA_ROOT to the synced AI_Index folder');
 return found[0];
}
