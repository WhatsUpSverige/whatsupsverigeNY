# Whatsup Sverige

Co-created med ❤️ av Oliver & ChatGPT

---

## 🚀 Vad är detta?
Det här är koden för **Whatsup Sverige v1** – en plattform där användare kan söka efter städer och där vi sparar intresse från städer som ännu inte är med!

---

## 📋 Steg-för-steg för att komma igång

### 1. Skapa konto på Neon
- Gå till [https://neon.tech](https://neon.tech)
- Skapa ett projekt
- Kör följande kod i SQL Editor:

```sql
CREATE TABLE unknown_city_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  search_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
