"""Read only the OpenRouter rankings credential from the project settings."""
import os


def openrouter_key(directory):
    key = os.environ.get('OPENROUTER_API_KEY')
    if key:
        return key

    settings = directory / '.env'
    if not settings.is_file():
        return None

    from dotenv import dotenv_values

    return dotenv_values(settings, interpolate=False).get('OPENROUTER_API_KEY') or None
