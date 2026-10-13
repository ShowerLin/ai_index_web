import copy
import importlib.util
import pathlib
import unittest

path=pathlib.Path(__file__).resolve().parents[1]/'scripts/integrate-token-core.py'
spec=importlib.util.spec_from_file_location('token_builder',path);builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)

class WindowChecks(unittest.TestCase):
    def test_source_metrics_are_not_double_counted(self):
        openrouter={'data':[{'date':'2026-01-01','model_permaslug':'a/model','total_tokens':'100'}]}
        records=[dict(metric_key=key,dimension_type='model',period_grain='weekly',period_start='2026-01-05',period_end='2026-01-11',series_key='a',metric_value=value) for key,value in [('token_volume',700),('token_spend',99)]]
        daily,weekly=builder.aggregate(openrouter,{'tokenVolumes':records,'tokenPrices':[{'token_count_7d':100000}]})
        self.assertEqual(daily,{'2026-01-01':100});self.assertEqual(weekly,{'2026-01-11':700})
        with self.assertRaises(AssertionError):builder.aggregate(openrouter,{'tokenVolumes':records+[records[0]]})

    def test_later_observations_do_not_recalibrate_june(self):
        root=path.parent.parent;base=builder.read_ts(root/'data/core-v2.3.ts');snapshot=builder.read_ts(root/'app/token-activity-snapshot.ts');windows=copy.deepcopy(snapshot['monthly'])
        original=builder.integrate(base,windows)
        for row in windows:
            if row['month']>'2026-06' and row['complete']:row['openrouter']*=100;row['ramp']*=100
        changed=builder.integrate(base,windows)
        self.assertEqual(original['metadata']['tokenBaseline'],changed['metadata']['tokenBaseline'])
        self.assertEqual(original['months'][29],changed['months'][29])

if __name__=='__main__':unittest.main()
