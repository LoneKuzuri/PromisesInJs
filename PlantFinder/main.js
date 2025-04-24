function showSection(id) {
    document.querySelectorAll('main section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
  }
  
  function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html";
  }
  
  async function searchPlant() {
    const name = document.getElementById('plantInput').value.trim();
    const result = document.getElementById('plantResult');
    result.innerHTML = "<p>Loading...</p>";
  
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("Plant not found");
  
      const data = await res.json();
  
      const description = data.description?.toLowerCase() || "";
      const extract = data.extract?.toLowerCase() || "";
      const combinedText = description + " " + extract;
  
      const plantKeywords = [
        "plant", "flower", "tree", "shrub", "herb", "grass", "legume",
        "vegetable", "fruit", "crop", "cereal", "oilseed", "spice", "grain",
        "beverage", "fodder", "tuber", "bulb", "climber", "creeper", "leaves", 
        "species", "flora", "botanical", "medicinal", "aquatic plant", "roots"
      ];
  
      
      const isLikelyPlant = plantKeywords.some(keyword => combinedText.includes(keyword));
  
      result.innerHTML = `
        <h3>${data.title}</h3>
        ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title}" />` : ""}
        <p>${data.extract}</p>
        <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
        ${!isLikelyPlant ? `<p style="color: orange;">⚠️ This may not be a plant. Please verify.</p>` : ""}
      `;
    } catch (err) {
      result.innerHTML = "<p>❌ Could not find information. Try a more specific or scientific name.</p>";
    }
  }
  