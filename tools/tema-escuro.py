"""Gera public/tema-escuro.css a partir de public/styles.css: as cores claras de cada regra viram as do tema escuro
(fundos brancos viram o cartão, textos pretos viram o texto claro, bordas claras viram a linha, tons pastel escurecem).
Rode de novo depois de mexer no styles.css:  python3 tools/tema-escuro.py"""
import re, colorsys, sys, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
css = (raiz / "public/styles.css").read_text()
src = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
HEX = re.compile(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')
RGBA = re.compile(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)')
NAMED = {'white': 'ffffff', 'black': '000000'}
def rgb(h):
    h = h if len(h) == 6 else ''.join(c*2 for c in h); return tuple(int(h[i:i+2], 16)/255 for i in (0, 2, 4))
def hls(c): return colorsys.rgb_to_hls(*c)
def is_neutral(c): return hls(c)[2] < 0.12 or max(c) - min(c) < 0.06
def lum(c): return hls(c)[1]

def map_color(c, prop, ctx, orig, alpha=None):
    """devolve a cor escura para uma cor c (tupla 0-1) num contexto"""
    L = lum(c); neu = is_neutral(c)
    bgprop = prop.startswith('background') or prop in ('fill',) and ctx.get('svgbg')
    if prop.startswith('background') or prop == 'box-shadow-bg':
        if alpha is not None:
            a = float(alpha)
            if L > 0.9: return f'rgba(22, 23, 27, {alpha})' if a >= 0.5 else None
            if L < 0.15: return f'rgba(255, 255, 255, {round(min(1, a * 1.4), 3)})' if a < 0.25 else None
            return None
        if neu:
            if L >= 0.97: return 'var(--card)'
            if L >= 0.86: return 'var(--secondary)'
            if L <= 0.12: return '#232429'
            return None
        if L > 0.8: return f'color-mix(in srgb, {orig} 18%, var(--bg))'
        return None
    if prop in ('color', 'fill', 'stroke', 'caret-color', '-webkit-text-fill-color'):
        if ctx.get('colorbg'): return None
        if alpha is not None:
            if L < 0.2: return f'rgba(255, 255, 255, {alpha})'
            return None
        if neu:
            if L <= 0.25: return 'var(--fg)'
            if 0.33 <= L <= 0.55: return 'var(--muted)'
            if L >= 0.86 and prop != 'color': return 'var(--line)'
            return None
        if L < 0.2: return 'var(--fg)'
        return None
    if prop.startswith('border') or prop.startswith('outline'):
        if alpha is not None:
            if L < 0.2: return f'rgba(255, 255, 255, {round(min(1, float(alpha) * 1.6 + .04), 3)})'
            if L > 0.9: return f'rgba(255, 255, 255, {round(float(alpha) * .25, 3)})'
            return None
        if neu and L >= 0.8: return 'var(--line)'
        if neu and L <= 0.12: return '#3a3b42'
        if not neu and L > 0.8: return f'color-mix(in srgb, {orig} 30%, var(--bg))'
        return None
    return None

def conv_value(prop, val, ctx):
    changed = False
    def h(m):
        nonlocal changed
        r = map_color(rgb(m.group(1)), prop, ctx, m.group(0))
        if r: changed = True; return r
        return m.group(0)
    def r_(m):
        nonlocal changed
        c = tuple(int(m.group(i))/255 for i in (1, 2, 3)); a = m.group(4)
        r = map_color(c, prop, ctx, m.group(0), alpha=a if a is not None else None)
        if r: changed = True; return r
        return m.group(0)
    def n(m):
        nonlocal changed
        r = map_color(rgb(NAMED[m.group(0)]), prop, ctx, m.group(0))
        if r: changed = True; return r
        return m.group(0)
    v = HEX.sub(h, val); v = RGBA.sub(r_, v); v = re.sub(r'\b(white|black)\b', n, v)
    return v if changed else None

PROPS = re.compile(r'^(background(-color|-image)?|color|fill|stroke|border(-top|-bottom|-left|-right)?(-color)?|outline(-color)?|caret-color|-webkit-text-fill-color)$')
out = []
def walk(text, wrap=None):
    i = 0
    while True:
        m = re.search(r'([^{}]+)\{', text[i:])
        if not m: break
        sel = m.group(1).strip(); start = i + m.end(); depth = 1; j = start
        while depth:
            if text[j] == '{': depth += 1
            elif text[j] == '}': depth -= 1
            j += 1
        body = text[start:j-1]; i = j
        if sel.startswith('@media') or sel.startswith('@supports'):
            if 'prefers-reduced-motion' in sel: continue
            walk(body, sel); continue
        if sel.startswith('@'): continue
        decls = [d.strip() for d in body.split(';') if ':' in d]
        dd = {}
        for d in decls:
            p, v = d.split(':', 1); dd[p.strip()] = v.strip()
        # o fundo da regra é colorido (não neutro)? então o texto dela fica como está
        ctx = {}
        for p in ('background', 'background-color'):
            if p in dd:
                cs = [rgb(x) for x in HEX.findall(dd[p])]
                if any(not is_neutral(c) for c in cs) or re.search(r'var\(--blue\)', dd[p]) or 'var(--danger' in dd[p] or 'gradient' in dd[p] and 'url' in dd[p]: ctx['colorbg'] = True
                if 'url(' in dd[p]: ctx['colorbg'] = True
        new = []
        for p, v in dd.items():
            if not PROPS.match(p) or 'var(--' in v and not HEX.search(v) and not RGBA.search(v): continue
            nv = conv_value(p, v, ctx)
            if nv: new.append(f'{p}: {nv}')
        if not new or re.search(r'login|btn-email|btn-google|onb-|qz-|fc-|fera-|carta-|gami-carta|es-|ms-|ch-|\.quiz|\.rk|\.video|backdrop|cf-mapa|musc img|cal-d i', sel): continue
        parts, depth, cur = [], 0, ''
        for ch in sel:
            if ch in '(': depth += 1
            if ch in ')': depth -= 1
            if ch == ',' and not depth: parts.append(cur); cur = ''
            else: cur += ch
        parts.append(cur)
        sels = ', '.join(('html[data-tema="escuro"] ' + s.strip()) if not s.strip().startswith(':root') else 'html[data-tema="escuro"]' for s in parts)
        rule = f'{sels} {{ {"; ".join(new)}; }}'
        out.append(f'{wrap} {{ {rule} }}' if wrap else rule)
walk(src)
manual = (raiz / "tools/tema-escuro-base.css").read_text()
(raiz / "public/tema-escuro.css").write_text("/* ---- gerado por tools/tema-escuro.py a partir do styles.css e do tools/tema-escuro-base.css: não edite à mão ---- */\n" + "\n".join(out) + "\n\n" + manual)
print(len(out), "regras")
