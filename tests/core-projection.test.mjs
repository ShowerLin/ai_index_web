import test from 'node:test';
import assert from 'node:assert/strict';
import {coreProjectionSnapshot as projection} from '../app/core-projection-snapshot.ts';
import {coreContributionSnapshot as core} from '../app/core-contribution-snapshot.ts';
import {cloudReferenceSnapshot as cloud} from '../app/cloud-reference-snapshot.ts';

test('conditional projection preserves the actual anchor and weighted score identity',()=>{
  const anchor=core.months.find(m=>m.month===projection.metadata.anchorMonth);
  const capex=anchor.rows.find(r=>r.pillar==='Hyperscaler CapEx');
  assert.equal(projection.months[0].value,anchor.score);
  assert.equal(projection.months.at(-1).month,'2027-12');
  assert.equal(projection.quarters.length,6);
  for(const q of projection.quarters){
    assert.equal(Object.keys(q.companies).length,5);
    assert.ok(Math.abs(q.composite-(anchor.score+.2*(q.capexScore-capex.score)))<1e-10);
    assert.ok(q.capexScore>=0&&q.capexScore<=100);
    for(const [name,item] of Object.entries(q.rawEstimates)){
      assert.ok(Math.abs(q.companies[name]-item.value*projection.metadata.bridgeFactors[name])<1e-10);
    }
  }
});

test('cloud references retain estimate flags, fiscal scopes and Oracle profit definition',()=>{
  assert.equal(cloud.observations.length,102);
  assert.ok(cloud.observations.every(r=>r.estimate&&r.sourceCell));
  assert.ok(cloud.observations.some(r=>r.metric==='Gross profit proxy'));
  assert.equal(cloud.metadata.sourceRetrievedAt,null);
});
