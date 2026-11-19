import re, json, urllib.request, html as H
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"}
import sys
RAIZES = {"reais": "1yHYksKDfDHGz5yBXj1h59froD8SZ3Ayy"}
def pasta(fid):
    h = urllib.request.urlopen(urllib.request.Request(f"https://drive.google.com/embeddedfolderview?id={fid}#list", headers=UA), timeout=60).read().decode("utf-8", "replace")
    out = []
    for bloco in re.findall(r'<div class="flip-entry" id="entry-([\w-]+)".*?</div>\s*</div>\s*</a>', h, re.S) or []:
        pass
    for m in re.finditer(r'id="entry-([\w-]{20,})".*?href="([^"]+)".*?class="flip-entry-title">([^<]*)<', h, re.S):
        out.append((m.group(1), H.unescape(m.group(2)), H.unescape(m.group(3))))
    return out
lista = []
def andar(fid, caminho):
    for i, href, nome in pasta(fid):
        if "/folders/" in href: andar(i, caminho + [nome])
        else: lista.append({"id": i, "pasta": "/".join(caminho), "nome": nome})
for k, fid in RAIZES.items(): andar(fid, [k])
json.dump(lista, open("lista2.json", "w"), ensure_ascii=False, indent=0)
print(len(lista))
from collections import Counter; print(Counter(x["pasta"] for x in lista))
