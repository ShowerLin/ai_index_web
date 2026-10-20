"""Compatibility entrypoint; implementation and data live in OneDrive."""
from _shared_pipeline import dispatch
dispatch('download-swebench-results.py', globals())
