"""Gera os brasões das classes, as molduras de avatar e os emblemas do FIT.AI (SVG).
Uso: python3 tools/gerar-classes.py  → public/assets/classes/*.svg e public/assets/emblemas/*.svg
Arte original: brasão em vetor no azul do app, com um metal por faixa de classe."""
import math, os

RAIZ = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
AZUL, AZUL2, BRANCO = "#2b54ff", "#16249e", "#ffffff"
METAIS = {  # claro, médio, escuro
    "bronze": ("#f1c08e", "#c07a3e", "#6b3a16"),
    "prata": ("#f4f7fb", "#a9b3c1", "#4a5565"),
    "ouro": ("#fff1a8", "#e0aa22", "#7a560a"),
    "diamante": ("#e6fbff", "#5cc8ff", "#1d3f9e"),
}
CLASSES = [  # slug, nome, níveis, metal, glifo
    ("recruta", "Recruta", "1–5", "bronze", "chevron"),
    ("escudeiro", "Escudeiro", "6–10", "bronze", "broquel"),
    ("guerreiro", "Guerreiro", "11–15", "bronze", "espada"),
    ("cavaleiro", "Cavaleiro", "16–20", "prata", "elmo"),
    ("paladino", "Paladino", "21–25", "prata", "espada-sol"),
    ("campeao", "Campeão", "26–30", "prata", "louros"),
    ("mestre-de-armas", "Mestre de Armas", "31–35", "ouro", "espadas"),
    ("tita", "Titã", "36–40", "ouro", "montanha"),
    ("lenda", "Lenda", "41–45", "diamante", "chama"),
    ("imortal", "Imortal", "46–50", "diamante", "coroa"),
]

ESCUDO = "M60 8 L106 23 V62 C106 96 86 118 60 132 C34 118 14 96 14 62 V23 Z"
ESCUDO_IN = "M60 17 L97 29 V62 C97 91 80 110 60 122 C40 110 23 91 23 62 V29 Z"


def grad(id_, metal):
    c, m, e = METAIS[metal]
    return (f'<linearGradient id="{id_}" x1="0" y1="0" x2="1" y2="1">'
            f'<stop offset="0" stop-color="{c}"/><stop offset=".55" stop-color="{m}"/><stop offset="1" stop-color="{e}"/></linearGradient>')


def espada(rot=0, cx=60, cy=70, cor=BRANCO):
    g = (f'<path d="M60 34 L64 41 V82 H56 V41 Z" fill="{cor}"/>'
         f'<rect x="45" y="82" width="30" height="6" rx="3" fill="{cor}"/>'
         f'<rect x="57" y="88" width="6" height="11" rx="2" fill="{cor}"/>'
         f'<circle cx="60" cy="102" r="4" fill="{cor}"/>')
    return f'<g transform="rotate({rot} {cx} {cy})">{g}</g>'


def folhas(lado):
    """Ramo de louro: folhas ao longo de um arco, abrindo para cima (lado -1 = esquerda, 1 = direita)."""
    out = []
    for i in range(6):
        a = math.radians((250 - i * 26) if lado < 0 else (-70 + i * 26))
        x, y = 60 + 27 * math.cos(a), 70 + 27 * math.sin(a)
        ang = math.degrees(a) + (20 if lado < 0 else -20)
        out.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="3.4" ry="7.5" transform="rotate({ang:.1f} {x:.1f} {y:.1f})" fill="{BRANCO}"/>')
    return "".join(out)


def estrela(cx, cy, r, cor=BRANCO, pontas=5):
    pts = []
    for i in range(pontas * 2):
        rr = r if i % 2 == 0 else r * 0.45
        a = math.radians(-90 + i * 180 / pontas)
        pts.append(f"{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{cor}"/>'


GLIFOS = {
    "chevron": f'<path d="M38 66 L60 50 L82 66" fill="none" stroke="{BRANCO}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'
               f'<path d="M42 86 L60 73 L78 86" fill="none" stroke="{BRANCO}" stroke-opacity=".45" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
    "broquel": f'<circle cx="60" cy="70" r="21" fill="none" stroke="{BRANCO}" stroke-width="6"/><circle cx="60" cy="70" r="7" fill="{BRANCO}"/>'
               + "".join(f'<circle cx="{60 + 14 * math.cos(math.radians(a)):.1f}" cy="{70 + 14 * math.sin(math.radians(a)):.1f}" r="2.2" fill="{BRANCO}"/>' for a in range(0, 360, 60)),
    "espada": espada(),
    "elmo": f'<path d="M40 92 V66 C40 50 49 42 60 42 C71 42 80 50 80 66 V92 Z" fill="{BRANCO}"/>'
            f'<rect x="44" y="62" width="32" height="6" rx="3" fill="{AZUL2}"/><rect x="57.5" y="70" width="5" height="16" rx="2" fill="{AZUL2}"/>'
            f'<path d="M60 42 C66 34 74 32 80 34 C74 38 70 42 68 46" fill="{BRANCO}" opacity=".7"/>',
    "espada-sol": "".join(f'<line x1="{60 + 22 * math.cos(math.radians(a)):.1f}" y1="{66 + 22 * math.sin(math.radians(a)):.1f}" x2="{60 + 31 * math.cos(math.radians(a)):.1f}" y2="{66 + 31 * math.sin(math.radians(a)):.1f}" stroke="{BRANCO}" stroke-opacity=".75" stroke-width="3" stroke-linecap="round"/>' for a in range(-180, 1, 30))
                  + f'<circle cx="60" cy="66" r="18" fill="none" stroke="{BRANCO}" stroke-opacity=".5" stroke-width="2.5"/>' + espada(),
    "louros": folhas(-1) + folhas(1) + estrela(60, 70, 14),
    "espadas": espada(-35) + espada(35),
    "montanha": f'<path d="M32 94 L52 58 L60 70 L70 50 L90 94 Z" fill="{BRANCO}"/>'
                f'<path d="M64 60 L56 76 H63 L58 90 L72 70 H65 L70 60 Z" fill="{AZUL2}"/>',
    "chama": f'<path d="M60 38 C72 52 82 60 80 77 C79 92 69 101 60 101 C51 101 41 92 40 79 C39 68 46 61 51 53 C52 61 55 66 60 68 C61 57 57 49 60 38 Z" fill="{BRANCO}"/>'
             f'<path d="M60 70 C66 77 70 82 69 89 C68 95 64 98 60 98 C56 98 52 95 51 90 C50 84 55 80 57 76 C58 80 59 82 60 83 Z" fill="{AZUL2}"/>',
    "coroa": f'<path d="M37 80 L41 52 L52 66 L60 46 L68 66 L79 52 L83 80 Z" fill="{BRANCO}"/>'
             f'<rect x="37" y="82" width="46" height="7" rx="3" fill="{BRANCO}"/>'
             + "".join(f'<circle cx="{x}" cy="{y}" r="3.2" fill="{BRANCO}"/>' for x, y in [(41, 50), (60, 44), (79, 50)])
             + f'<path d="M50 99 C50 94 56 94 60 99 C64 104 70 104 70 99 C70 94 64 94 60 99 C56 104 50 104 50 99 Z" fill="none" stroke="{BRANCO}" stroke-width="3"/>',
}


def ornamentos(metal, g):
    """Mais enfeite quanto mais alta a faixa: rebites (prata), asas pequenas (ouro), asas grandes e gema (diamante)."""
    if metal == "prata":
        return "", "".join(f'<circle cx="{x}" cy="{y}" r="3" fill="url(#{g})" stroke="#00000033"/>' for x, y in [(24, 30), (96, 30)])
    if metal in ("ouro", "diamante"):
        grande = metal == "diamante"
        asa = []
        for lado in (-1, 1):
            penas = []
            for i in range(4 if grande else 3):
                comp = (34 if grande else 24) - i * (6 if grande else 5)
                y = 40 + i * 13
                x0 = 60 + lado * 40
                penas.append(f'<path d="M{x0} {y} Q{x0 + lado * comp * .6} {y - 8} {x0 + lado * comp} {y + 2} Q{x0 + lado * comp * .55} {y + 9} {x0} {y + 10} Z" fill="url(#{g})" stroke="#00000033" stroke-width="1"/>')
            asa.append("".join(penas))
        topo = ""
        if grande:
            topo = (f'<path d="M60 0 L69 9 L60 18 L51 9 Z" fill="url(#{g})" stroke="#00000044"/>'
                    f'<path d="M60 3 L64.5 9 L60 15 Z" fill="#ffffff" opacity=".7"/>')
        return "".join(asa), topo
    return "", ""


def postos(n):
    """1 a 3 pontos no pé do brasão: a posição da classe dentro da faixa de metal."""
    xs = {1: [60], 2: [55, 65], 3: [50, 60, 70]}[n]
    return "".join(f'<circle cx="{x}" cy="110" r="2.6" fill="{BRANCO}" opacity=".85"/>' for x in xs)


def brasao(slug, metal, glifo, posto=1):
    g = f"m-{slug}"
    atras, frente = ornamentos(metal, g)
    largura = 200 if metal in ("ouro", "diamante") else 120
    dx = (largura - 120) / 2
    corpo = (f'<path d="{ESCUDO}" fill="url(#{g})"/>'
             f'<path d="{ESCUDO_IN}" fill="url(#campo-{slug})"/>'
             f'<path d="{ESCUDO_IN}" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="2"/>'
             f'<path d="M23 29 L60 17 L97 29 V44 C80 38 40 38 23 50 Z" fill="#ffffff" opacity=".08"/>'
             f'{GLIFOS[glifo]}{postos(posto)}')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largura} 140" role="img">'
            f'<defs>{grad(g, metal)}<linearGradient id="campo-{slug}" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="{AZUL}"/><stop offset="1" stop-color="{AZUL2}"/></linearGradient></defs>'
            f'<g transform="translate({dx} 0)">{atras}{corpo}{frente}</g></svg>')


def moldura(metal):
    g = f"mold-{metal}"
    c, m, e = METAIS[metal]
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">'
            f'<defs>{grad(g, metal)}</defs>'
            f'<circle cx="60" cy="60" r="55" fill="none" stroke="url(#{g})" stroke-width="8"/>'
            f'<circle cx="60" cy="60" r="50.5" fill="none" stroke="{e}" stroke-opacity=".5" stroke-width="1.5"/>'
            + "".join(f'<circle cx="{60 + 55 * math.cos(math.radians(a)):.1f}" cy="{60 + 55 * math.sin(math.radians(a)):.1f}" r="2.4" fill="{c}"/>' for a in (-90, -30, 30, 150, 210))
            + '</svg>')


EMBLEMAS = [  # slug, nome, metal, glifo
    ("sequencia-7", "7 dias seguidos", "bronze", "fogo"),
    ("max30-semana-1", "Semana 1 do MAX:30", "bronze", "s1"),
    ("graduado-max30", "Graduado MAX:30", "ouro", "graduado"),
    ("recorde-max-out", "Primeiro recorde de Max Out", "prata", "cronometro"),
    ("primeira-barra", "Primeira barra", "prata", "barra"),
    ("hidratado-7", "7 dias com a meta de água", "bronze", "gota"),
]
GLIFO_EMB = {
    "fogo": f'<path d="M60 30 C70 42 78 48 76 62 C75 74 68 80 60 80 C52 80 45 74 44 64 C43 56 49 50 53 44 C54 51 56 54 60 56 C61 47 58 40 60 30 Z" fill="{BRANCO}"/><text x="60" y="75" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="20" fill="{AZUL2}">7</text>',
    "s1": f'<text x="60" y="72" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="34" fill="{BRANCO}">S1</text><rect x="38" y="78" width="44" height="4" rx="2" fill="{BRANCO}" opacity=".6"/>',
    "graduado": f'<path d="M30 50 L60 38 L90 50 L60 62 Z" fill="{BRANCO}"/><path d="M44 56 V68 C44 74 52 78 60 78 C68 78 76 74 76 68 V56 L60 62 Z" fill="{BRANCO}" opacity=".85"/><path d="M86 52 V68" stroke="{BRANCO}" stroke-width="3"/><circle cx="86" cy="71" r="3.5" fill="{BRANCO}"/>{estrela(60, 90, 8)}',
    "cronometro": f'<circle cx="60" cy="62" r="22" fill="none" stroke="{BRANCO}" stroke-width="6"/><rect x="54" y="32" width="12" height="6" rx="2" fill="{BRANCO}"/><path d="M60 62 L60 48" stroke="{BRANCO}" stroke-width="5" stroke-linecap="round"/><path d="M60 62 L70 68" stroke="{BRANCO}" stroke-width="5" stroke-linecap="round"/>{estrela(84, 40, 8)}',
    "barra": f'<rect x="28" y="36" width="64" height="6" rx="3" fill="{BRANCO}"/><circle cx="60" cy="54" r="7" fill="{BRANCO}"/><path d="M46 39 L52 62 H68 L74 39" fill="none" stroke="{BRANCO}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M53 62 L50 84 M67 62 L70 84" stroke="{BRANCO}" stroke-width="6" stroke-linecap="round"/>',
    "gota": f'<path d="M60 30 C70 46 80 56 80 68 C80 80 71 88 60 88 C49 88 40 80 40 68 C40 56 50 46 60 30 Z" fill="{BRANCO}"/><path d="M50 68 C50 75 54 79 60 80" fill="none" stroke="{AZUL2}" stroke-width="3" stroke-linecap="round"/><text x="60" y="66" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="16" fill="{AZUL2}">7</text>',
}


def emblema(slug, metal, glifo):
    g = f"e-{slug}"
    dentes = []
    for i in range(24):  # borda de medalha
        a = math.radians(i * 15)
        dentes.append(f"{60 + 56 * math.cos(a):.1f},{60 + 56 * math.sin(a):.1f}")
        a2 = math.radians(i * 15 + 7.5)
        dentes.append(f"{60 + 51 * math.cos(a2):.1f},{60 + 51 * math.sin(a2):.1f}")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img">'
            f'<defs>{grad(g, metal)}<linearGradient id="c-{slug}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{AZUL}"/><stop offset="1" stop-color="{AZUL2}"/></linearGradient></defs>'
            f'<polygon points="{" ".join(dentes)}" fill="url(#{g})"/>'
            f'<circle cx="60" cy="60" r="43" fill="url(#c-{slug})"/><circle cx="60" cy="60" r="43" fill="none" stroke="#ffffff" stroke-opacity=".2" stroke-width="2"/>'
            f'<g transform="translate(0 2)">{GLIFO_EMB[glifo]}</g></svg>')


def main():
    os.makedirs(os.path.join(RAIZ, "classes"), exist_ok=True)
    os.makedirs(os.path.join(RAIZ, "emblemas"), exist_ok=True)
    vistos = {}
    for slug, _, _, metal, glifo in CLASSES:
        vistos[metal] = vistos.get(metal, 0) + 1
        open(os.path.join(RAIZ, "classes", f"{slug}.svg"), "w").write(brasao(slug, metal, glifo, vistos[metal]))
    for metal in METAIS:
        open(os.path.join(RAIZ, "classes", f"moldura-{metal}.svg"), "w").write(moldura(metal))
    for slug, _, metal, glifo in EMBLEMAS:
        open(os.path.join(RAIZ, "emblemas", f"{slug}.svg"), "w").write(emblema(slug, metal, glifo))
    print(len(CLASSES), "classes,", len(METAIS), "molduras,", len(EMBLEMAS), "emblemas")


if __name__ == "__main__":
    main()
