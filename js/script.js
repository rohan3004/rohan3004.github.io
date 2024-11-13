
// Get the current year and set it in the footer
document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', function() {
  const menu = document.querySelector('.menu');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  // Check if user has scrolled to the bottom
  if (scrollPosition >= pageHeight) {
      menu.classList.add('hidden'); // Add hidden class to hide the menu
  } else {
      menu.classList.remove('hidden'); // Remove hidden class to show the menu
  }
});


const nekosiaApiUrl = 'https://api.nekosia.cat/api/v1/images/catgirl'; // Nekosia API for images
const pexelsApiKey = '4mVQ8maC5iL6Q4TgKhuqy83X7dqKe2RMQHMEmNQkWCzHXEDq8twap8h1';

async function fetchGitHubData() {
  const username = 'rohan3004';

  try{
    const reposResponse = await fetch('https://api.rohandev.online/api/github/repositories');
    const reposData = await reposResponse.json();

  if (Array.isArray(reposData)) {
      const repoContainer = document.getElementById('repo-container');
      for (const repo of reposData) {
          const pexelsImageUrl = await fetchPexelsImage(pexelsApiKey, repo.name) || await fetchNekosiaImage(nekosiaApiUrl);

          const card = document.createElement('div');
          card.className = 'repo-card';

          // Repository thumbnail, title, and description
          card.innerHTML = `
          <div class="details-container color-container">
              <div class="article-container">
                <img src="${pexelsImageUrl}" alt="Project 1" class="thumbnail" />
              </div>
              <h2 class="experience-sub-title project-title" style="font-size: 1.2em;margin: 30px;">
                ${repo.name}
              </h2>
              <div class="btn-container" style="justify-content: flex-start;">
                <a href="${repo.html_url}" class="btnp">
                  <span class="btnp__circle"></span>
                  <span class="btnp__white-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                      <path
                        d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z">
                      </path>
                    </svg>
                  </span>
                  <span class="btnp__text">Bombarda</span>
                </a>

              </div>
            </div>
          `;

          repoContainer.appendChild(card);
      }
  } else {
      console.error("Error: Repository data is not an array", reposData);
  }
  }catch(error){

  }
  
}

// Fetch Nekosia Image for each repo
async function fetchNekosiaImage(apiUrl) {
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.image.original.url || null; // Return the original image URL from Nekosia API, or null if not available
  } catch (error) {
      console.error("Failed to fetch Nekosia image:", error);
      return null;
  }
}


// Fetch Pexels Image for each repo
async function fetchPexelsImage(apiKey, repoName) {
  try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(repoName)}&per_page=1&page=${randomPage}`, {
          headers: { Authorization: apiKey }
      });
      const data = await response.json();
      return data.photos[0]?.src?.medium || null; // Return medium-sized image URL, or null if not available
  } catch (error) {
      console.error("Failed to fetch Pexels image:", error);
      return null;
  }
}

async function getWeather() {
  try {
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=fc9c2d13772441e9b72191328240604&q=Kolkata');
      const data = await response.json();

      // Check if data is available
      if (data && data.current) {
          const weatherDescription = data.current.condition.text;
          const temperature = data.current.temp_c;
          document.getElementById('temp').textContent = `${data.current.temp_c}°C in Kolkata`;
          document.getElementById('condition').textContent = `${data.current.condition.text} ${data.current.pressure_mb} hPa`;
          document.getElementById('icon').src = `https:${data.current.condition.icon}`;
          document.getElementById('humidity').textContent = data.current.humidity;
          document.getElementById('wind').textContent = `${data.current.wind_dir} ${data.current.wind_kph}`;
      } else {
          document.getElementById('weatherRohan').innerHTML = `<p>City not found</p>`;
      }
  } catch (error) {
      console.error("Error fetching weather data:", error);
      document.getElementById('weatherRohan').innerHTML = `<p>Unable to get weather data</p>`;
  }
}


window.onload = () => {
  fetchGitHubData();
  getWeather()
};