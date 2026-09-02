# ICU Talk — Aplikacja komunikacyjna pacjent–rodzina

Aplikacja webowa umożliwiająca pacjentowi z ograniczoną możliwością komunikacji (np. niedowład) na wybieranie liter za pomocą 3 przycisków na swoim telefonie, a rodzinie na podgląd pisanego tekstu w czasie rzeczywistym na innym ekranie.

## Architektura

- **Backend**: Node.js + Express + Socket.IO (real-time WebSocket)
- **Frontend**: React + Vite
- **Stan**: przechowywany w RAM (brak bazy danych)
- **Łączność**: WebSocket dla real-time sync między ekranem pacjenta i rodziny

## Struktura katalogów

```
icutalk/
  server/        # Backend (Node.js + Express + Socket.IO)
  client/        # Frontend (React + Vite)
```

## Development (localhost)

### 1. Instalacja zależności

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Uruchomienie backendu

```bash
cd server
npm run dev
```

Server będzie słuchać na `http://localhost:3001`

### 3. Uruchomienie frontendu (w osobnym terminalu)

```bash
cd client
npm run dev
```

Vite dev server będzie dostępny na `http://localhost:5173` i automatycznie proxy Socket.IO do backendu.

### 4. Otwieranie aplikacji

Otwórz dwie karty w przeglądarce (lub dwa okna):

- **Ekran pacjenta**: `http://localhost:5173/?view=patient`
- **Ekran rodziny**: `http://localhost:5173/?view=family`

### 5. Testowanie

- Klikaj przyciski na ekranie pacjenta (⬅️ PRZEWIŃ W LEWO, ✓ WYBIERZ, ➡️ PRZEWIŃ W PRAWO)
- Obserwuj zmiany na ekranie rodziny w czasie rzeczywistym
- Grupy liter: ABCDE, FGHIJ, KLMNOP, RSTUWZ, SPACJA, USUŃ

## Production — Deployment na serwer

### 1. Build frontendu

```bash
cd client
npm run build
```

Wygenerowany build trafia do `client/dist/`

### 2. Uruchomienie na serwerze

Backend automatycznie serwuje statyczne pliki z `client/dist/`. Uruchom:

```bash
cd server
npm install
npm start
```

### 3. Zmienne środowiskowe

- `PORT` (domyślnie 3001) — port na którym server słucha
- `NODE_ENV` (domyślnie development) — ustaw na `production` w produkcji
- `ORIGIN` (opcjonalnie) — domena/URL do CORS na produkcji (np. `https://example.com`)

### 4. HTTPS/Reverse Proxy

W produkcji użytkowni będą łączyć się z różnych sieci (nie LAN). **WebSocket wymaga HTTPS** na sieciach mobilnych. Zalecane rozwiązania:

- **Nginx** lub **Caddy** jako reverse proxy z certyfikatem SSL (np. z Let's Encrypt)
- Backend nadal słucha na porcie wewnętrznym (np. 3001), reverse proxy na porcie 443 (HTTPS)

Przykład konfiguracji Nginx:

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## API / Zdarzenia Socket.IO

### Client → Server (emitowane przez pacjenta)

- `action:scroll-left` — przewinięcie w lewo
- `action:scroll-right` — przewinięcie w prawo
- `action:select` — wybór aktualnie podświetlonej opcji

### Server → Client (broadcastowane do obu klientów)

- `state:update` — pełny stan aplikacji (tekst, poziom nawigacji, indeks podświetlenia, dostępne opcje)

## Stan aplikacji

```json
{
  "text": "Cześć",
  "level": "group",
  "groupIndex": 2,
  "letterIndex": 0,
  "selectedGroup": null,
  "options": ["ABCDE", "FGHIJ", "KLMNOP", "RSTUWZ", "SPACJA", "USUŃ"]
}
```

- `text` — dotychczas napisany tekst
- `level` — `"group"` (wybór grupy) lub `"letter"` (wybór litery z grupy)
- `groupIndex` / `letterIndex` — indeks aktualnie podświetlonej opcji
- `selectedGroup` — litery grupy, gdy w trybie `letter`
- `options` — lista opcji dostępnych do wyboru (wyświetlana na ekranie rodziny)
# icutalk
