"""Compatibility entrypoint; implementation and data live in OneDrive."""
from _shared_pipeline import dispatch
dispatch('build-useful-task-snapshot.py', globals())
