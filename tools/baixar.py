import re, subprocess, hashlib, os, json, sys, urllib.request
PASTA = "1tOZ_pbPPrrd_uOzB2BvB2yOkJaTWymyN"
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"}
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=60).read().decode("utf-8", "replace")
html = get(f"https://drive.google.com/embeddedfolderview?id={PASTA}#list")
itens = re.findall(r'id="entry-([\w-]{20,})".*?class="flip-entry-title">([^<]*)<', html, re.S)
print("embeddedfolderview:", len(itens))
ids = dict(itens)
if len(ids) < 150:
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "gdown"], check=True)
    import gdown
    try:
        fs = gdown.download_folder(id=PASTA, skip_download=True, quiet=True, remaining_ok=True) or []
        for f in fs: ids.setdefault(f.id, f.path)
    except Exception as e: print("gdown:", e)
print("total ids:", len(ids))
os.makedirs("/tmp/v", exist_ok=True)
vistos, lista = {}, []
for fid, nome in ids.items():
    n = re.search(r"\((\d+)\)", nome); num = n.group(1) if n else fid[:8]
    dest = f"/tmp/v/{num}.mp4"
    r = subprocess.run(["curl", "-sS", "-L", "-A", UA["User-Agent"], "-o", dest, "-w", "%{http_code}",
        f"https://drive.usercontent.google.com/download?id={fid}&export=download&confirm=t"], capture_output=True, text=True)
    if r.stdout != "200" or os.path.getsize(dest) < 20000:
        print("falhou", num, r.stdout, r.stderr[:100]); continue
    h = hashlib.md5(open(dest, "rb").read()).hexdigest()
    if h in vistos:
        os.remove(dest); print("duplicado", num, "=", vistos[h]); continue
    vistos[h] = num; lista.append(num)
json.dump(sorted(lista, key=lambda x: int(x) if x.isdigit() else 0), open("/tmp/lista.json", "w"))
print("unicos:", len(lista))
