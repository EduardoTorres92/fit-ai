"""Transforma a carta de um estilo/classe num personagem animado (loop parado) para o perfil do FIT.AI.
Uso: python3 tools/animar-sprite.py ninja m recruta [--fita]
  → public/assets/estilos/sprites/ninja-m-recruta.webp
Recorta o personagem da carta (rembg, modelo isnet-general-use), e mexe só nele, sem borrar os pixels:
o tronco, a cabeça, os braços (e o que eles seguram) descem e sobem uns pixels como respiração; com --fita,
as pontas da bandana à esquerda da cabeça ondulam. As pernas ficam paradas no chão.
Depois de gerar, acrescente o nome em SPRITES no app.js.
Precisa de: pip install rembg onnxruntime numpy pillow"""
import math, os, sys
import numpy as np
from PIL import Image

def recortar(carta):
    from rembg import remove, new_session
    out = remove(Image.open(carta).convert("RGB"), session=new_session("isnet-general-use"))
    return out.crop(out.getbbox())

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
