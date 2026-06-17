## SEO component — kako koristiti

### 1. Wrap app u HelmetProvider (main.jsx)

```jsx
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

### 2. Dodaj SEO na svaku stranicu

```jsx
import SEO from '@/components/seo/SEO';

// Homepage
<SEO
  title="Web Developer iz BiH"
  description="Izrađujem moderne web stranice za firme u BiH..."
/>

// Blog post
<SEO
  title="Koliko košta web stranica u BiH 2026"
  description="Detaljan pregled cijena web stranica u Bosni i Hercegovini..."
/>

// Hire page
<SEO
  title="Unajmi me"
  description="Trebate web stranicu? Kontaktirajte me za besplatnu konsultaciju."
/>

// Stranica koja ne treba biti indexirana
<SEO noIndex />
```

### 3. Stranice i njihovi SEO tagovi

| Ruta | Title | Description |
|------|-------|-------------|
| / | (default) | Full-stack web developer iz BiH... |
| /hire | Unajmi me | Trebate web stanicu? ... |
| /pricing | Cijene | Transparentne cijene web razvoja... |
| /blog | Blog | Savjeti o web razvoju za firme u BiH... |
| /uses | Uses | Tech stack i alati koje koristim... |
| /contents/projects | Projekti | Portfolio projekata... |
