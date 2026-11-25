"""Transforma a carta de um estilo/classe num personagem animado (loop parado) para o perfil do FIT.AI.
Uso: python3 tools/animar-sprite.py ninja m recruta [--fita]
  → public/assets/estilos/sprites/ninja-m-recruta.webp
Recorta o personagem da carta (rembg, modelo isnet-general-use), e mexe só nele, sem borrar os pixels:
o tronco, a cabeça, os braços (e o que eles seguram) descem e sobem uns pixels como respiração; com --fita,
as pontas da bandana à esquerda da cabeça ondulam. As pernas ficam paradas no chão.
Depois de gerar, acrescente o nome em SPRITES no app.js.
Precisa de: pip install rembg onnxruntime numpy scipy pillow
Carta que corta o personagem (ex.: no joelho) ou que o recorte erra: peça a arte em fundo liso.
Aumente ?v= em spriteDe (app.js) quando trocar arquivos que já estavam publicados."""
import math, os, sys
import numpy as np
from PIL import Image

from scipy import ndimage
def recortar_mascara(card_rgb, alpha, minfrac=0.02, cut_bottom=None):
    """alpha: máscara do rembg no tamanho da carta. Limpa sobras, tapa furos que têm a cor do entorno
    (ex.: atadura cinza confundida com o fundo) e mantém vãos que mostram o cenário (alça do kettlebell)."""
    A = np.array(card_rgb).astype(int)
    m = alpha > 127
    if cut_bottom: m[int(cut_bottom * m.shape[0]):] = False
    lab, n = ndimage.label(m, structure=np.ones((3, 3)))
    if n:
        tam = ndimage.sum(m, lab, range(1, n + 1)); m = np.isin(lab, [i + 1 for i, t in enumerate(tam) if t >= tam.max() * minfrac])
    # (crescer() puxava pedaços de cenário; fica desligado)
    m, _ = fechar_entalhes(card_rgb, m)
    buracos = ndimage.binary_fill_holes(m) & ~m
    lab, n = ndimage.label(buracos); tapados = 0
    for i in range(1, n + 1):
        h = lab == i
        if h.sum() > 3000: continue
        anel = ndimage.binary_dilation(h, iterations=3) & m
        if not anel.any(): continue
        d = np.linalg.norm(A[h].mean(0) - A[anel].mean(0))
        if d < 38 or h.sum() <= 12: m |= h; tapados += 1
    rgba = np.dstack([A, np.where(m, 255, 0)]).astype(np.uint8)
    im = Image.fromarray(rgba, "RGBA"); return im.crop(im.getbbox()), tapados, n

def fechar_entalhes(card_rgb, im_full_alpha, raio=4, lim=34):
    """Fecha entalhes de borda (ex.: furos na atadura que abrem para fora) quando a cor bate com o entorno."""
    A = np.array(card_rgb).astype(int); m = im_full_alpha.copy()
    est = ndimage.generate_binary_structure(2, 1)
    fech = ndimage.binary_closing(m, structure=est, iterations=raio)
    novo = fech & ~m
    lab, n = ndimage.label(novo); k = 0
    for i in range(1, n + 1):
        h = lab == i
        if h.sum() > 2500: continue
        anel = ndimage.binary_dilation(h, iterations=2) & m
        if anel.any() and np.linalg.norm(A[h].mean(0) - A[anel].mean(0)) < lim: m |= h; k += 1
    return m, k

def crescer(card_rgb, m, iters=8, lim=24):
    """Devolve ao recorte pixels de borda com a mesma cor do vizinho já recortado (atadura, faixa clara)."""
    A = np.array(card_rgb).astype(float); m = m.copy()
    k = np.ones((3, 3))
    for _ in range(iters):
        borda = ndimage.binary_dilation(m) & ~m
        soma = np.stack([ndimage.convolve(A[..., c] * m, k, mode="constant") for c in range(3)], -1)
        cnt = ndimage.convolve(m.astype(float), k, mode="constant")
        media = soma / np.maximum(cnt, 1)[..., None]
        ok = borda & (cnt >= 3) & (np.linalg.norm(A - media, axis=-1) < lim)
        if not ok.any(): break
        m |= ok
    return m

def recortar(carta, modelo="isnet-general-use", cut_bottom=None):
    """Recorta o personagem da carta. Se um modelo errar, tente modelo="u2net"; cut_bottom corta a faixa do nome."""
    from rembg import remove, new_session
    card = Image.open(carta).convert("RGB")
    alpha = np.array(remove(card, session=new_session(modelo)))[..., 3]
    return recortar_mascara(card, alpha, cut_bottom=cut_bottom)[0]

def animar(src, fita=False, n=10, amp=5.0):
    pad = 12
    base = Image.new("RGBA", (src.width + 2 * pad, src.height + 2 * pad), (0, 0, 0, 0)); base.paste(src, (pad, pad))
    A = np.array(base); H, W = A.shape[:2]
    yy, xx = np.mgrid[0:H, 0:W].astype(float)
    suave = lambda v: (lambda c: c * c * (3 - 2 * c))(np.clip(v, 0, 1))
    peito, quadril, cabeca_x = 0.30 * H, 0.56 * H, 0.40 * W
    zona_fita = (xx < cabeca_x) & (yy > 0.07 * H) & (yy < 0.24 * H)
    quadros = []
    for i in range(n):
        t = i / n
        s = (1 - math.cos(2 * math.pi * t)) / 2
        dy = amp * s * suave((quadril - yy) / (quadril - peito)); dx = np.zeros_like(dy)
        if fita:
            w = suave((cabeca_x - xx) / (cabeca_x * 0.9)) * zona_fita
            dy = dy + w * 4.0 * np.sin(4 * math.pi * t - (cabeca_x - xx) / 18)
            dx = dx + w * 2.0 * np.cos(4 * math.pi * t - (cabeca_x - xx) / 18)
        sx = np.clip(np.rint(xx - dx), 0, W - 1).astype(int); sy = np.clip(np.rint(yy - dy), 0, H - 1).astype(int)
        f = A[sy, sx].copy(); f[..., 3] = np.where(f[..., 3] > 127, 255, 0)
        quadros.append(Image.fromarray(f, "RGBA"))
    return quadros

if __name__ == "__main__":
    estilo, g, classe = sys.argv[1:4]
    raiz = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "estilos")
    q = animar(recortar(os.path.join(raiz, "niveis", f"{estilo}-{g}-{classe}.webp")), fita="--fita" in sys.argv)
    os.makedirs(os.path.join(raiz, "sprites"), exist_ok=True)
    destino = os.path.join(raiz, "sprites", f"{estilo}-{g}-{classe}.webp")
    q[0].save(destino, save_all=True, append_images=q[1:], duration=90, loop=0, lossless=True, method=6)
    print(destino)
