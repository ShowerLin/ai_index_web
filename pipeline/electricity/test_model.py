import datetime as dt
import unittest
from .model import cohort_energy, replace_embedded

class PhysicalAccountingTests(unittest.TestCase):
    def test_leap_and_regular_full_year(self):
        self.assertAlmostEqual(cohort_energy(1000,'IT',2024,dt.date(2020,1,1),1,1.2),10.5408)
        self.assertAlmostEqual(cohort_energy(1000,'IT',2025,dt.date(2020,1,1),1,1.2),10.512)
    def test_partial_year_and_conditional_states(self):
        value=cohort_energy(1000,'IT',2024,dt.date(2024,7,1),.5,1.2,.8,.75)
        self.assertAlmostEqual(value,1000*.5*1.2*184*24*.8*.75/1e6)
        expected=cohort_energy(1000,'IT',2025,dt.date(2025,1,1),1,date_states=[(dt.date(2025,1,1),.25),(dt.date(2026,1,1),.75)])
        self.assertAlmostEqual(expected,2.19)
    def test_facility_basis_omits_pue_and_unknown_blocks(self):
        self.assertAlmostEqual(cohort_energy(1000,'facility',2025,dt.date(2020,1,1),1,1.5),8.76)
        with self.assertRaises(ValueError):cohort_energy(1000,'unknown',2025,dt.date(2020,1,1),1)
    def test_overlap_and_probability(self):
        self.assertEqual(replace_embedded(4000,200,300),4100)
        with self.assertRaises(ValueError):replace_embedded(4000,None,300)
        with self.assertRaises(ValueError):cohort_energy(1000,'IT',2025,dt.date(2020,1,1),1,completion=1.1)
        with self.assertRaises(ValueError):cohort_energy(1000,'IT',2025,dt.date(2020,1,1),1,date_states=[(dt.date(2020,1,1),.5)])
    def test_retirement(self):
        self.assertEqual(cohort_energy(1000,'facility',2025,dt.date(2020,1,1),1,retirement=dt.date(2024,1,1)),0)
if __name__=='__main__':unittest.main()
