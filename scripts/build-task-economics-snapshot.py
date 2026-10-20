"""Compatibility entrypoint; implementation and data live in OneDrive."""
from _shared_pipeline import dispatch
dispatch('build-task-economics-snapshot.py', globals())
