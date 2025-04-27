// Stadstema-konfiguration
const cityThemes = {
    "Västerås": {
      primaryColor: "#7DB702",      // Västerås grön
      secondaryColor: "#FFFFFF",    // Vit bakgrund
      fontFamily: "'Work Sans', sans-serif",
      logoUrl: "/logos/vasteras-logo.svg"
    },
    "default": {
      primaryColor: "#005BAC",      // Sveriges blå
      secondaryColor: "#FFD500",    // Sveriges gul
      fontFamily: "'Poppins', sans-serif",
      logoUrl: "/logos/whatsupsverige-logo.svg"
    }
  };
  
  // Funktion: Byt tema baserat på stad
  function applyCityTheme(cityName) {
    const theme = cityThemes[cityName] || cityThemes["default"];
  
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--font-family', theme.fontFamily);
  
    const logo = document.getElementById('logo');
    if (logo) {
      logo.src = theme.logoUrl;
    }
  
    if (!cityThemes[cityName]) {
      showCityNotFoundMessage(cityName);
      logUnknownCity(cityName);
    } else {
      hideCityNotFoundMessage();
    }
  }
  
  // Hantera när användaren söker
  function handleCitySearch() {
    const input = document.getElementById('city-search-input');
    const city = input.value.trim();
    if (city) {
      applyCityTheme(city);
    }
  }
  
  // Visa vänligt meddelande om staden inte finns
  function showCityNotFoundMessage(cityName) {
    const messageBox = document.getElementById('city-message');
    if (messageBox) {
      messageBox.innerHTML = `
        <h4>Vi arbetar på det!</h4>
        <p>Just nu är <strong>${cityName}</strong> inte aktiv på Whatsup Sverige.</p>
        <p>Vi har registrerat din sökning – tack för att du hjälper oss växa!</p>
        <button onclick="contactCity('${cityName}')">Tipsa din kommun</button>
      `;
      messageBox.style.display = 'block';
    }
  }
  
  // Dölj meddelanderuta om stad finns
  function hideCityNotFoundMessage() {
    const messageBox = document.getElementById('city-message');
    if (messageBox) {
      messageBox.style.display = 'none';
      messageBox.innerHTML = '';
    }
  }
  
  // Kontaktknapp → öppna mejl
  function contactCity(cityName) {
    window.location.href = `mailto:info@whatsupsverige.se?subject=Tips om att lägga till ${cityName}&body=Hej! Jag vill tipsa om att lägga till ${cityName} på Whatsup Sverige. Tack!`;
  }
  
  // Skicka okänd stad till Netlify function
  async function logUnknownCity(cityName) {
    try {
      await fetch('/.netlify/functions/log-unknown-city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: cityName })
      });
    } catch (error) {
      console.error('Kunde inte spara okänd stad:', error);
    }
  }
  
  // Start: Lägg till lyssnare på sökfältet
  document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('city-search-input');
    if (input) {
      input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          handleCitySearch();
        }
      });
    }
  });
  