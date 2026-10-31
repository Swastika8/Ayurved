from pathlib import Path
from urllib.request import Request, urlopen
import re

assets = Path(__file__).parent / 'dist' / 'assets'
photos = {
    'hero-spa': ('photo-1540555700478-4be289fbecef', 1600),
    'therapy': ('photo-1519823551278-64ac92734fb1', 900),
    'herbal-oil': ('photo-1608571423902-eed4a5ad8108', 900),
    'yoga': ('photo-1506126613408-eca07ce68773', 900),
    'nature': ('photo-1441974231531-c6227db76b6e', 1200),
    'tea': ('photo-1544787219-7f47ccb76574', 900),
    'doctor-man': ('photo-1622253692010-333f2da6031d', 650),
}
for name, (photo, width) in photos.items():
    destination = assets / f'{name}.jpg'
    if destination.exists():
        continue
    url = f'https://images.unsplash.com/{photo}?auto=format&fit=crop&w={width}&q=85'
    request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(request, timeout=40) as response:
        destination.write_bytes(response.read())
    print(name, destination.stat().st_size)

font_url = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=DM+Serif+Display:ital@0;1&display=swap'
with urlopen(Request(font_url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=40) as response:
    css = response.read().decode()
urls = list(dict.fromkeys(re.findall(r'url\((https:[^)]+)\)', css)))
for i, url in enumerate(urls):
    name = f'font-{i}.' + ('woff2' if 'woff2' in url else 'ttf')
    with urlopen(url, timeout=40) as response:
        (assets / name).write_bytes(response.read())
    css = css.replace(url, name)
(assets / 'fonts.css').write_text(css, encoding='utf-8')
print('Fonts downloaded')
