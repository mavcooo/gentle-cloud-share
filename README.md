# ☁️ gentle-cloud-share

**gentle-cloud-share** è un'app web self-hosted per la gestione e condivisione sicura di file, sviluppata in Node.js + Express, con interfaccia responsive e database MongoDB.  
L'obiettivo è creare una piattaforma privata, semplice da usare, e accessibile da qualsiasi dispositivo, alternativa a servizi cloud come Google Drive o Dropbox.

---

## 🚀 Funzionalità

### ✅ Implementate

- 🔼 Upload file dal browser (con Multer)
- 🧾 Interfaccia web con EJS + Bootstrap
- 📂 Navigazione dei file tramite filesystem locale
- 📥 Download ed eliminazione file
- 💾 Salvataggio diretto su disco (`/uploads`)
- ⚙️ Configurazione base in `.env`

### 🛠️ In fase di sviluppo

#### 🔐 Autenticazione e Utenti
- [ ] Registrazione, login, logout
- [ ] Sessioni persistenti con `express-session` + MongoDB
- [ ] Ruoli: `admin`, `utente`
- [ ] Recupero password via email (Nodemailer)

#### 📁 File e Cartelle
- [ ] Organizzazione in cartelle
- [ ] Condivisione tramite link interno (con permessi)
- [ ] Cronologia attività: upload, rename, cancellazioni

#### 🖼️ Interfaccia Utente
- [ ] Anteprima immagini/PDF
- [ ] Dashboard con spazio usato, attività recenti
- [ ] Tema scuro e responsive design mobile

#### 🔒 Sicurezza e Backup
- [ ] Crittografia file lato server (AES-256)
- [ ] Protezione brute-force login (rate-limiting)
- [ ] Log accessi utente
- [ ] Backup automatico con `rsync` o script cron

#### 📱 Mobile & PWA
- [ ] App installabile (Progressive Web App)
- [ ] Notifiche push per nuovi file condivisi

#### 📈 Futuro e Scalabilità
- [ ] Streaming video/audio (FFmpeg)
- [ ] Integrazione con Google Drive, Dropbox
- [ ] Versione premium (abbonamento, donazioni)

---

## 📦 Installazione

> Prerequisiti:
> - Node.js >= 16.x
> - MongoDB in locale o Atlas
> - `git`, `npm`

### 1. Clona il repository

```bash
git clone https://github.com/mavcooo/gentle-cloud-share.git
cd gentle-cloud-share

2. Installa le dipendenze

npm install

3. Crea un file .env

PORT=3000
MONGO_URI=mongodb://localhost:27017/gentlecloud
SESSION_SECRET=qualcosa-di-sicuro

4. Avvia il server

npm start

Visita http://localhost:3000 nel browser.
🗂️ Struttura del Progetto

gentle-cloud-share/
├── public/           # File statici (CSS, JS)
├── views/            # Template EJS
├── uploads/          # File caricati dagli utenti
├── routes/           # Rotte Express
│   ├── index.js
│   ├── auth.js       # (in sviluppo)
│   └── file.js       # (in sviluppo)
├── models/           # Schemi Mongoose
├── middleware/       # Middleware auth e ruoli
├── .env              # Variabili ambiente
├── app.js            # Entry point
└── README.md

🧰 Stack Tecnologico
Tecnologia	Uso
Node.js + Express	Backend e gestione rotte
EJS + Bootstrap	Frontend e UI
MongoDB + Mongoose	Database utenti e sessioni
Multer	Upload file lato server
express-session	Gestione login/sessioni
dotenv	Configurazione ambiente
🛡️ Sicurezza (pianificata)

    Password hashate con bcrypt

    Sessioni sicure (cookie HttpOnly, SameSite)

    Rate limiting con express-rate-limit

    Log accessi e modifiche file

    Crittografia file (AES-256 con chiave per utente)

    Token reset password con crypto

🔧 Script disponibili
Comando	Descrizione
npm start	Avvia l'app su localhost:3000
npm run dev	Avvia con nodemon (se installato)
🤝 Contribuisci

Contributi, segnalazioni bug e idee sono benvenuti!
Apri una pull request o segnala un problema nella sezione Issues.
📜 Licenza

Distribuito sotto licenza MIT. Vedi LICENSE per maggiori dettagli.
🗺️ Roadmap
Fase	Stato
Upload file base	✅
Autenticazione	🟡 in corso
Gestione ruoli	🔲
UI responsive	🟡
Crittografia	🔲
PWA + notifiche	🔲
Dashboard	🔲
Condivisione file	🔲
👨‍💻 Autore

Marco (mavcooo)
Studente di informatica con passione per lo sviluppo full-stack e il software open-source.
📫 GitHub
