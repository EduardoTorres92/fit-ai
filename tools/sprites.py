"""Gera os sprites animados das classes (pixel art original, 64x64, 8 quadros em loop) em public/assets/classes/sprites/.
Rode:  python3 tools/sprites.py   (precisa do Pillow)
Cada classe é montada por camadas (pernas, tronco, cabeça, elmo, braço, arma, escudo, capa, asas, aura).
O desenho de cada camada vai para um mapa de materiais; o sombreamento (luz de cima à esquerda) e o contorno escuro são automáticos."""
import math, random, pathlib
from PIL import Image, ImageDraw

W = H = 64
ESCALA = 4
QUADROS = 8
OUT = pathlib.Path(__file__).resolve().parent.parent / "public/assets/classes/sprites"

# Rampas: escuro, médio, claro, brilho
MAT = {
    "pele": ["#7a3f2c", "#c27350", "#eba67d", "#ffd2b0"],
    "cabelo": ["#1e1410", "#3b261b", "#5a3a26", "#7a5236"],
    "verde": ["#24401f", "#3f6b2e", "#5e9440", "#86b85a"],
    "calca": ["#1f2433", "#323a52", "#4a5574", "#66739a"],
    "bota": ["#1a120d", "#3a2618", "#573a24", "#74503a"],
    "couro": ["#3d2414", "#6b4024", "#94603a", "#b98256"],
    "cinto": ["#2a1a10", "#4d3220", "#6e4a30", "#8e6440"],
    "madeira": ["#3b2412", "#6a4322", "#93623a", "#b8844f"],
    "aco": ["#3b4457", "#7d8aa3", "#c3cede", "#ffffff"],
    "bronze": ["#4d2a12", "#9a5a24", "#d08a3e", "#ffd08a"],
    "prata": ["#3e4659", "#8590a8", "#c7d0e0", "#ffffff"],
    "ouro": ["#5a3a06", "#b3800f", "#f0c030", "#fff2a8"],
    "diamante": ["#0f3d5c", "#1f86b8", "#5fd2f2", "#e6fdff"],
    "vermelho": ["#4a0d14", "#8f1b26", "#cc3340", "#f0707a"],
    "azul": ["#101c4a", "#1f3590", "#3a5ad0", "#7090f0"],
    "branco": ["#7d8494", "#c3c8d4", "#eef0f5", "#ffffff"],
    "asa": ["#8a93a8", "#cfd6e4", "#f4f7fc", "#ffffff"],
    "brilho": ["#e0f8ff", "#e0f8ff", "#ffffff", "#ffffff"],
}
NOMES = list(MAT)
CONTORNO = (20, 12, 28)

def hexrgb(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))

class Quadro:
    def __init__(self):
        self.m = Image.new("L", (W, H), 0)  # 0 = vazio; 1.. = material
        self.d = ImageDraw.Draw(self.m)
        self.pm = Image.new("L", (W, H), 0)  # peça (ordem de desenho): separa peças com uma linha escura
        self.dp = ImageDraw.Draw(self.pm); self.peca = 0
        self.det = []   # detalhes de cor exata depois do sombreamento
        self.fx = []    # partículas (sem contorno)
    def v(self, mat): return NOMES.index(mat) + 1
    def nova(self): self.peca += 1; return self
    def _f(self, fn, *a, mat):
        getattr(self.d, fn)(*a, fill=self.v(mat)); getattr(self.dp, fn)(*a, fill=self.peca or 1)
    def ret(self, x0, y0, x1, y1, mat): self._f("rectangle", [x0, y0, x1, y1], mat=mat)
    def eli(self, cx, cy, rx, ry, mat): self._f("ellipse", [cx - rx, cy - ry, cx + rx, cy + ry], mat=mat)
    def pol(self, pts, mat): self._f("polygon", pts, mat=mat)
    def lin(self, a, b, mat, w=1): self.d.line([a, b], fill=self.v(mat), width=w); self.dp.line([a, b], fill=self.peca or 1, width=w)
    def px(self, x, y, mat): self._f("point", (x, y), mat=mat)
    def cor(self, x, y, c): self.det.append((x, y, c))
    def luz(self, x, y, c): self.fx.append((x, y, c))

    def render(self):
        img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); p = img.load(); m = self.m.load(); pc = self.pm.load()
        mat = lambda x, y: m[x, y] if 0 <= x < W and 0 <= y < H else 0
        get = lambda x, y: (m[x, y] * 256 + pc[x, y]) if 0 <= x < W and 0 <= y < H and m[x, y] else 0
        for y in range(H):
            for x in range(W):
                v = get(x, y)
                if not v: continue
                up, dn, lf, rt = get(x, y - 1) == v, get(x, y + 1) == v, get(x - 1, y) == v, get(x + 1, y) == v
                t = 2
                if not up or not lf: t = 3 if (dn and rt) else 2
                if not dn or not rt: t = 1 if (up and lf) else (2 if t == 3 else 1)
                if not up and not lf and dn and rt and NOMES[v // 256 - 1] in ("aco", "prata", "ouro", "diamante", "bronze", "brilho"): t = 3
                p[x, y] = hexrgb(MAT[NOMES[v // 256 - 1]][t]) + (255,)
        # brilho especular nos metais: uma diagonal clara
        for y in range(H):
            for x in range(W):
                v = get(x, y)
                if v and NOMES[v // 256 - 1] in ("aco", "prata", "ouro", "diamante") and get(x - 1, y - 1) != v and get(x, y - 1) == v and get(x - 1, y) == v:
                    p[x, y] = hexrgb(MAT[NOMES[v // 256 - 1]][3]) + (255,)
        # linha entre peças: a borda da peça da frente fica escura onde encosta numa peça de trás
        sep = []
        for y in range(H):
            for x in range(W):
                a = pc[x, y] if m[x, y] else 0
                if not a: continue
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    xx, yy = x + dx, y + dy
                    if 0 <= xx < W and 0 <= yy < H and m[xx, yy] and 0 < pc[xx, yy] < a: sep.append((x, y)); break
        for x, y in sep: p[x, y] = CONTORNO + (255,)
        for x, y, c in self.det:
            if 0 <= x < W and 0 <= y < H: p[x, y] = hexrgb(c) + (255,)
        # contorno
        cheio = [[p[x, y][3] > 0 for x in range(W)] for y in range(H)]
        for y in range(H):
            for x in range(W):
                if cheio[y][x]: continue
                if any(0 <= x + dx < W and 0 <= y + dy < H and cheio[y + dy][x + dx] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                    p[x, y] = CONTORNO + (255,)
        for x, y, c in self.fx:
            if 0 <= x < W and 0 <= y < H: p[x, y] = hexrgb(c) + (255,)
        return img

METAL = {"bronze": "bronze", "prata": "prata", "ouro": "ouro", "diamante": "diamante"}

# ---------- partes (q.nova() começa uma peça nova: ganha linha escura onde cobre a de trás) ----------
CHAO = 58
def pernas(q, c):
    calca, bota = c.get("calca", "calca"), c.get("bota", "bota")
    q.nova().ret(25, 44, 30, 54, calca); q.nova().ret(24, 54, 31, 57, bota); q.ret(23, 56, 31, 58, bota)
    if c.get("grevas"): q.nova().ret(25, 47, 30, 54, c["grevas"])
    q.nova().ret(33, 44, 38, 54, calca); q.nova().ret(33, 54, 40, 57, bota); q.ret(33, 56, 41, 58, bota)
    if c.get("grevas"): q.nova().ret(33, 47, 38, 54, c["grevas"]); q.nova().ret(32, 45, 39, 48, c["grevas"])

def tronco(q, c, dy):
    larg = c.get("larg", 0)
    q.nova().ret(25 - larg, 40 + dy, 38 + larg, 46 + dy, c.get("calca", "calca"))
    q.nova().eli(31.5, 34 + dy, 7.5 + larg, 8, c["tronco"])
    if c["tronco"] in METAL:  # junta da couraça
        for x in range(26 - larg, 37 + larg): q.cor(x, 37 + dy, MAT[c["tronco"]][0])
    if c.get("tabardo"):
        q.nova().ret(29, 31 + dy, 35, 48 + dy, c["tabardo"])
        for (x, y) in ((32, 34), (31, 35), (32, 35), (33, 35), (32, 36), (32, 37)):
            q.cor(x, y + dy, MAT["ouro"][2])
    q.nova().ret(25 - larg, 41 + dy, 38 + larg, 42 + dy, c.get("cinto", "cinto"))
    q.cor(31, 41 + dy, MAT["ouro"][2]); q.cor(32, 41 + dy, MAT["ouro"][3])

def cabeca(q, c, dy):
    q.nova().ret(30, 24 + dy, 33, 27 + dy, "pele")
    q.nova().eli(32, 19 + dy, 6, 6, "pele")
    if not c.get("elmo_fechado"):
        q.cor(35, 19 + dy, "#ffffff"); q.cor(36, 19 + dy, "#1a1020"); q.cor(36, 20 + dy, "#1a1020")  # olho
        q.cor(34, 18 + dy, "#2a1a10"); q.cor(35, 18 + dy, "#2a1a10"); q.cor(36, 18 + dy, "#2a1a10"); q.cor(37, 18 + dy, "#2a1a10")  # sobrancelha
        q.cor(36, 23 + dy, MAT["pele"][0]); q.cor(37, 23 + dy, MAT["pele"][0])  # boca
        q.cor(38, 21 + dy, MAT["pele"][1]); q.cor(29, 20 + dy, MAT["pele"][1]); q.cor(29, 21 + dy, MAT["pele"][1])  # nariz e orelha

def elmo(q, c, dy, f):
    t = c.get("elmo")
    if t == "bandana":
        q.nova().eli(31, 14 + dy, 6, 2, "cabelo"); q.ret(26, 14 + dy, 28, 20 + dy, "cabelo")
        q.nova().ret(25, 14 + dy, 38, 16 + dy, "vermelho")
        sw = (f // 2) % 2
        q.nova().lin((25, 15 + dy), (20, 17 + dy + sw), "vermelho", 2); q.lin((25, 16 + dy), (21, 21 + dy - sw), "vermelho", 2)
    elif t == "chapeu":
        q.nova().eli(32, 13 + dy, 7, 4, "aco"); q.ret(25, 13 + dy, 39, 14 + dy, "aco")
        q.nova().ret(23, 15 + dy, 41, 16 + dy, "aco")
        q.cor(31, 10 + dy, MAT["aco"][3])
    elif t == "chifres":
        q.nova().lin((27, 13 + dy), (23, 7 + dy), "branco", 2); q.lin((24, 8 + dy), (23, 4 + dy), "branco", 1)
        q.lin((36, 12 + dy), (40, 6 + dy), "branco", 2); q.lin((40, 7 + dy), (41, 3 + dy), "branco", 1)
        q.nova().eli(32, 16 + dy, 7, 5, c["metal"]); q.ret(25, 16 + dy, 39, 17 + dy, c["metal"])
        q.nova().ret(36, 16 + dy, 38, 22 + dy, c["metal"])
    elif t in ("fechado", "fechado_grande"):
        g = 1 if t == "fechado_grande" else 0
        q.nova().ret(27 - g, 24 + dy, 37 + g, 27 + dy, c["metal"])  # gorjal
        q.nova().eli(32, 18 + dy, 7 + g, 7 + g, c["metal"]); q.ret(25 - g, 18 + dy, 39 + g, 25 + dy, c["metal"])
        q.nova().ret(32, 18 + dy, 40 + g, 21 + dy, c["metal"])  # viseira
        vis = c.get("visor")
        for x in range(33, 40 + g): q.cor(x, 19 + dy, vis or "#140c1c")
        for x in range(34, 39 + g, 2): q.cor(x, 23 + dy, "#140c1c")
        if vis:
            for x in range(33, 40 + g): q.luz(x, 19 + dy, vis)
            if f % 4 < 2: q.luz(41 + g, 19 + dy, vis); q.luz(42 + g, 19 + dy, vis)
    if c.get("crista"):
        sw = [0, 0, 1, 1, 1, 0, 0, 0][f]
        q.nova().pol([(29, 12 + dy), (33, 10 + dy), (31, 7 + dy), (25, 6 + dy - sw), (19, 9 + dy + sw), (24, 11 + dy)], c["crista"])
    if c.get("chifres_grandes"):
        q.nova().lin((28, 12 + dy), (22, 5 + dy), "ouro", 3); q.lin((22, 6 + dy), (24, 1 + dy), "ouro", 2)
        q.nova().lin((36, 12 + dy), (42, 5 + dy), "ouro", 3); q.lin((42, 6 + dy), (40, 1 + dy), "ouro", 2)

def braco_tras(q, c, dy):
    q.nova().lin((27, 29 + dy), (25, 40 + dy), c.get("braco", "pele"), 4); q.nova().eli(25, 41 + dy, 2, 2, c.get("luva", "pele"))

def escudo(q, c, dy):
    t = c.get("escudo")
    if t == "redondo":
        q.nova().eli(21, 37 + dy, 6, 7, "madeira")
        q.nova().eli(21, 37 + dy, 2, 2, c.get("metal", "aco") if c.get("metal") in METAL else "aco")
        for y in range(32, 43): q.cor(17, y + dy, MAT["madeira"][0])
    elif t == "pipa":
        m = c.get("metal", "prata")
        q.nova().pol([(14, 29 + dy), (27, 29 + dy), (27, 39 + dy), (20, 49 + dy), (14, 39 + dy)], m)
        q.nova().pol([(16, 31 + dy), (25, 31 + dy), (25, 38 + dy), (20, 46 + dy), (16, 38 + dy)], c.get("brasao", "azul"))
        for y in range(33, 43): q.cor(20, y + dy, MAT["ouro"][2])
        for x in range(17, 24): q.cor(x, 35 + dy, MAT["ouro"][2])

def capa(q, c, dy, f):
    if not c.get("capa"): return
    sw = [0, 1, 2, 2, 1, 0, -1, -1][f]
    q.nova().pol([(28, 27 + dy), (23, 29 + dy), (19 + sw, 46), (16 + sw, 54), (21 + sw, 52), (25 + sw // 2, 54), (30, 50), (31, 31 + dy)], c["capa"])

def asas(q, c, dy, f):
    if not c.get("asas"): return
    ab = [0, 1, 2, 3, 3, 2, 1, 0][f]
    ox, oy = 27, 30 + dy
    for i, (comp, ang) in enumerate(((24, 140), (21, 156), (17, 172), (13, 190))):
        a = math.radians(ang - ab * 4 + i)
        tip = (ox + comp * math.cos(a), oy - comp * math.sin(a))
        perp = (math.sin(a) * 3, math.cos(a) * 3)
        q.nova().pol([(ox, oy - 2), (ox + 1, oy + 3), (tip[0] + perp[0], tip[1] + perp[1]), tip, (tip[0] - perp[0] * .4, tip[1] - perp[1] * .4)], "asa")
    q.nova().eli(ox, oy, 4, 4, "asa")

def ombro(q, c, dy):
    if c.get("ombreira"):
        r = 4 + c.get("larg", 0) // 2
        if c.get("espinhos"):
            q.nova().lin((35, 25 + dy), (34, 20 + dy), "ouro", 2); q.lin((39, 26 + dy), (42, 21 + dy), "ouro", 2)
        q.nova().eli(36, 28 + dy, r, r - 1, c["ombreira"])
        q.nova().ret(33 - r // 2, 29 + dy, 39 + r // 2, 30 + dy, c["ombreira"])

def braco_frente(q, c, dy):
    hx, hy = c.get("mao", (42, 38))
    q.nova().lin((37, 29 + dy), (hx - 1, hy - 1 + dy), c.get("braco", "pele"), 4)
    ombro(q, c, dy)
    return hx, hy + dy

def mao(q, c, hx, hy):
    q.nova().eli(hx, hy, 2, 2, c.get("luva", "pele"))

def arma(q, c, hx, hy, f):
    t = c.get("arma")
    lam = c.get("lamina", "aco")
    if t == "punhos":
        mao(q, c, hx, hy); q.nova().ret(hx - 2, hy - 1, hx + 1, hy + 1, "branco"); return
    if t == "adaga":
        q.nova().lin((hx, hy - 1), (hx + 4, hy - 8), lam, 2); mao(q, c, hx, hy); q.nova().lin((hx - 2, hy - 2), (hx + 2, hy + 1), "couro", 1)
    elif t in ("espada", "espada_longa", "espada_luz"):
        L = 14 if t == "espada" else 20
        q.nova().lin((hx, hy - 2), (hx + 3, hy - L), lam, 3); q.px(hx + 3, hy - L - 1, lam)
        q.nova().lin((hx - 1, hy + 3), (hx, hy), "couro", 2)
        mao(q, c, hx, hy)
        q.nova().lin((hx - 3, hy - 2), (hx + 4, hy - 3), c.get("guarda", "ouro"), 2)
        if f == 3:
            gx, gy = hx + 2, hy - L + 4
            for d in ((0, 0), (1, 0), (-1, 0), (0, 1), (0, -1), (2, 0), (-2, 0), (0, 2), (0, -2)): q.luz(gx + d[0], gy + d[1], "#ffffff")
        if t == "espada_luz":
            for k in range(2, L, 3): q.luz(hx + 1 + (k * 3) // L + (f % 2), hy - k, "#e6fdff")
    elif t == "martelo":
        q.nova().lin((hx - 1, hy + 6), (hx + 2, hy - 13), "madeira", 2)
        q.nova().ret(hx - 3, hy - 19, hx + 7, hy - 13, c.get("metal", "prata"))
        q.nova().ret(hx - 4, hy - 17, hx + 8, hy - 15, c.get("metal", "prata"))
        q.cor(hx + 2, hy - 16, MAT["ouro"][2]); q.cor(hx + 2, hy - 17, MAT["ouro"][3])
        mao(q, c, hx, hy)
    elif t == "montante":
        q.nova().lin((hx - 1, hy - 2), (hx - 17, hy - 22), lam, 4); q.lin((hx - 17, hy - 22), (hx - 18, hy - 24), lam, 2)
        q.nova().lin((hx, hy + 3), (hx + 1, hy - 1), "couro", 2)
        mao(q, c, hx, hy)
        q.nova().lin((hx - 4, hy - 4), (hx + 2, hy + 1), "ouro", 2)
    elif t == "alabarda":
        q.nova().lin((hx + 1, hy + 18), (hx + 1, hy - 30), "madeira", 2)
        q.nova().pol([(hx + 2, hy - 27), (hx + 9, hy - 30), (hx + 10, hy - 22), (hx + 2, hy - 21)], lam)
        q.nova().pol([(hx, hy - 30), (hx + 1, hy - 38), (hx + 3, hy - 30)], lam)
        q.nova().pol([(hx, hy - 26), (hx - 4, hy - 24), (hx, hy - 23)], lam)
        mao(q, c, hx, hy)
    elif t == "machado":
        q.nova().lin((hx - 2, hy + 8), (hx + 3, hy - 18), "madeira", 3)
        q.nova().pol([(hx + 3, hy - 22), (hx + 13, hy - 28), (hx + 15, hy - 18), (hx + 12, hy - 9), (hx + 3, hy - 14)], lam)
        q.nova().pol([(hx + 1, hy - 21), (hx - 7, hy - 25), (hx - 8, hy - 17), (hx + 1, hy - 15)], lam)
        q.nova().ret(hx + 1, hy - 21, hx + 4, hy - 14, "ouro")
        mao(q, c, hx, hy)

def aura(q, c, f):
    t = c.get("aura")
    if not t: return
    rnd = random.Random(7)
    pts = [(rnd.randint(14, 50), rnd.randint(8, 58), rnd.random()) for _ in range(26 if t != "fagulha" else 8)]
    for x, y, r in pts:
        yy = int((y - f * 3 - r * 10) % 52) + 8
        if t == "chama":
            cor = "#fff3a0" if yy < 22 else "#ffb030" if yy < 40 else "#ff5a1f"
            q.luz(x, yy, cor)
            if r > .6: q.luz(x, yy + 1, "#ff5a1f")
        elif t == "raio":
            cor = "#e6fdff" if r > .5 else "#5fd2f2"
            q.luz(x, yy, cor)
            if r > .8: q.luz(x - 1, yy, cor); q.luz(x + 1, yy, cor); q.luz(x, yy - 1, cor); q.luz(x, yy + 1, cor)
        elif t == "fagulha":
            if (f + int(r * 8)) % 4 < 2:
                q.luz(x, yy, "#fff2a8")
                if r > .5: q.luz(x - 1, yy, "#f0c030"); q.luz(x + 1, yy, "#f0c030")
    if t == "raio" and f in (2, 6):  # relâmpago
        x, y = (17, 10) if f == 2 else (47, 14)
        for i in range(9):
            q.luz(x, y, "#ffffff"); q.luz(x + 1, y, "#5fd2f2"); y += 2; x += (1 if i % 2 else -1)

def aureola(q, c, dy, f):
    if not c.get("aureola"): return
    for a in range(0, 360, 12):
        x = 32 + 7 * math.cos(math.radians(a)); y = 6 + dy + 2 * math.sin(math.radians(a))
        q.luz(round(x), round(y), "#fff2a8" if (a // 12 + f) % 5 else "#ffffff")

def desenhar(c, f):
    q = Quadro()
    dy = [0, 0, 0, 1, 1, 1, 0, 0][f]
    asas(q, c, dy, f); capa(q, c, dy, f)
    braco_tras(q, c, dy); escudo(q, c, dy)
    pernas(q, c); tronco(q, c, dy); cabeca(q, c, dy); elmo(q, c, dy, f)
    hx, hy = braco_frente(q, c, dy)
    arma(q, c, hx, hy, f)
    if not c.get("arma"): mao(q, c, hx, hy)
    aura(q, c, f); aureola(q, c, dy, f)
    return q.render()

CLASSES = {
    "recruta": dict(tronco="verde", elmo="bandana", arma="punhos", calca="calca"),
    "escudeiro": dict(tronco="couro", braco="couro", elmo="chapeu", arma="adaga", escudo="redondo"),
    "guerreiro": dict(tronco="bronze", braco="couro", elmo="chifres", metal="bronze", arma="espada", escudo="redondo", ombreira="bronze", grevas="couro"),
    "cavaleiro": dict(tronco="prata", braco="prata", luva="prata", elmo="fechado", elmo_fechado=True, metal="prata", arma="espada_longa", escudo="pipa", ombreira="prata", grevas="prata", calca="calca", guarda="prata"),
    "paladino": dict(tronco="prata", braco="prata", luva="prata", tabardo="azul", elmo="fechado", elmo_fechado=True, metal="prata", arma="martelo", escudo="pipa", ombreira="prata", grevas="prata", aura="fagulha"),
    "campeao": dict(tronco="prata", braco="prata", luva="prata", tabardo="vermelho", elmo="fechado", elmo_fechado=True, metal="prata", crista="vermelho", capa="vermelho", arma="montante", mao=(41, 36), ombreira="ouro", grevas="prata"),
    "mestre-de-armas": dict(tronco="ouro", braco="ouro", luva="ouro", elmo="fechado", elmo_fechado=True, metal="ouro", crista="branco", capa="azul", arma="alabarda", ombreira="ouro", grevas="ouro", brasao="vermelho"),
    "tita": dict(tronco="ouro", braco="ouro", luva="ouro", larg=2, elmo="fechado_grande", elmo_fechado=True, metal="ouro", chifres_grandes=True, capa="vermelho", arma="machado", mao=(45, 40), ombreira="ouro", espinhos=True, grevas="ouro", aura="fagulha"),
    "lenda": dict(tronco="diamante", braco="diamante", luva="diamante", elmo="fechado", elmo_fechado=True, metal="diamante", visor="#ffb030", capa="vermelho", arma="espada_longa", lamina="diamante", guarda="ouro", ombreira="diamante", grevas="diamante", aura="chama"),
    "imortal": dict(tronco="diamante", braco="diamante", luva="diamante", tabardo="branco", elmo="fechado", elmo_fechado=True, metal="diamante", visor="#e6fdff", crista="branco", asas=True, arma="espada_luz", lamina="brilho", guarda="ouro", ombreira="diamante", grevas="diamante", aura="raio", aureola=True),
}

def salvar_gif(frames, path):
    big = [fr.resize((W * ESCALA, H * ESCALA), Image.NEAREST) for fr in frames]
    # paleta comum + índice transparente
    cores = sorted({px for fr in frames for px in fr.get_flattened_data() if px[3]})
    assert len(cores) < 255, len(cores)
    pal = [0, 0, 0] + [v for c in cores for v in c[:3]]
    idx = {c: i + 1 for i, c in enumerate(cores)}
    ps = []
    for fr in big:
        p = Image.new("P", fr.size, 0); p.putpalette(pal + [0] * (768 - len(pal)))
        p.putdata([idx[px] if px[3] else 0 for px in fr.get_flattened_data()])
        ps.append(p)
    ps[0].save(path, save_all=True, append_images=ps[1:], duration=130, loop=0, transparency=0, disposal=2, optimize=False)

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    prev = Image.new("RGBA", (W * ESCALA * 5, W * ESCALA * 2), (11, 18, 48, 255))
    for i, (slug, c) in enumerate(CLASSES.items()):
        frames = [desenhar(c, f) for f in range(QUADROS)]
        salvar_gif(frames, OUT / f"{slug}.gif")
        sheet = Image.new("RGBA", (W * QUADROS, H)); [sheet.paste(fr, (W * k, 0)) for k, fr in enumerate(frames)]
        sheet.save(OUT / f"{slug}-quadros.png")  # folha com os 8 quadros
        frames[0].resize((W * 2, H * 2), Image.NEAREST).save(OUT / f"{slug}.png")  # quadro parado (silhueta das classes bloqueadas)
        prev.alpha_composite(frames[0].resize((W * ESCALA, H * ESCALA), Image.NEAREST), ((i % 5) * W * ESCALA, (i // 5) * H * ESCALA))
    prev.save("/tmp/sprites-preview.png")
    print("ok", len(CLASSES))
