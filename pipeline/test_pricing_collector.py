"""Pricing asset layout regression tests; no requests or shared-data writes."""
import importlib.util
from pathlib import Path
import sys
import tempfile
import types
import unittest
from unittest.mock import patch


class PricingTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        paths = types.ModuleType('paths')
        for name in ('DATA_ROOT', 'BUILD_ROOT', 'REFERENCE', 'RAMP', 'OPENROUTER'):
            setattr(paths, name, root)
        spec = importlib.util.spec_from_file_location('pricing_collector', Path(__file__).parent / 'builders/download-epoch-model-pricing.py')
        self.module = importlib.util.module_from_spec(spec)
        with patch.dict(sys.modules, {'paths': paths}):
            spec.loader.exec_module(self.module)

    def test_current_models_asset(self):
        self.assertEqual(self.module.locate_data_asset('import{t as a}from"./models.B8NP4AAl.js";'),
                         'https://epoch.ai/_astro/models.B8NP4AAl.js')

    def test_previous_asset_layout(self):
        self.assertEqual(self.module.locate_data_asset('import{a}from"./organizationLogos.old.js";'),
                         'https://epoch.ai/_astro/organizationLogos.old.js')

    def test_unknown_layout_fails(self):
        with self.assertRaises(RuntimeError): self.module.locate_data_asset('import x from"./other.js";')


if __name__ == '__main__': unittest.main()
