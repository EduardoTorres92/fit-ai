/* FIT.AI — service worker: mostra o lembrete de água que chega por push, mesmo com o app fechado.
   "Bebi" anota a água no app (abre ou foca a aba) e avisa o servidor para recomeçar a contagem. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch {}
  const ml = d.ml || 300;
  e.waitUntil(self.registration.showNotification(d.titulo || "💧 Hora de beber água", {
    body: d.corpo || `Beba ${ml} ml agora.`,
    icon: "assets/agua-192.png", badge: "assets/agua-96.png", tag: "fitai-agua", renotify: true,
    vibrate: [200, 100, 200], data: { ml },
    actions: [{ action: "bebi", title: `Bebi ${ml} ml ✓` }, { action: "depois", title: "Depois" }],
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  if (e.action === "depois") return;
  const ml = e.notification.data?.ml || 300, bebi = e.action === "bebi";
  e.waitUntil((async () => {
    if (bebi) { // recomeça a contagem do servidor já, mesmo antes de o app abrir
      const sub = await self.registration.pushManager.getSubscription();
      if (sub) fetch("/api/agua", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ acao: "bebeu", endpoint: sub.endpoint }) }).catch(() => {});
    }
    const abas = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of abas) {
      if ("focus" in c) { c.postMessage({ tipo: "agua", bebi, ml }); return c.focus(); }
    }
    return self.clients.openWindow(bebi ? `./#/nutricao/bebi/${ml}` : "./#/nutricao");
  })());
});
