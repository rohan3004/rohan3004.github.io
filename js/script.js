/*!
 * Copyright © 2025 Rohan Chakravarty.
 * All Rights Reserved.
 *
 * Licensed under the MIT License.
 * You may obtain a copy of the License at
 * https://rohandev.online/LICENSE
 *
 * This file is provided "as is", without warranty of any kind.
 */

// ===================================================================
//
//               CORE FUNCTIONS
//
// ===================================================================

// Get the current year and set it in the footer
function setYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

// Function to play a random background song
function playRandomBackgroundMusic() {
    const songs = ['music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3','music5.mp3'];
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    const audioSourceUrl = `https://rohandev.online/assets/music/${randomSong}`;
    const audioPlayer = document.getElementById('backgroundMusic');

    if (audioPlayer) {
        audioPlayer.src = audioSourceUrl;
        audioPlayer.play().catch(error => {
            console.log("Autoplay was prevented by the browser. User must interact with the page first.");
        });
    }
}

async function fetchGitHubData() {
    const username = "rohan3004";
    const repoMap = {
        "404-Page": "./assets/projects/p1.png",
        "Queen-s-Quest": "./assets/projects/p2.png",
        "DevOps-Showcase": "./assets/projects/p3.png",
        "Evaluator-System": "./assets/projects/p6.png",
        "Face-Frenzy": "./assets/projects/p4.png",
        "chessMind": "./assets/projects/p5.png",
    };

    try {
        const reposResponse = await fetch("https://api.rohandev.online/github/repositories");
        const reposData = await reposResponse.json();
        const filteredRepos = reposData.filter((repo) => repoMap.hasOwnProperty(repo.name));

        if (Array.isArray(reposData)) {
            const repoContainer = document.getElementById("repo-container");
            for (const repo of filteredRepos) {
                const hostedURL = `https://${username}.github.io/${repo.name}`;
                const languagesResponse = await fetch(`https://api.rohandev.online/github/languages/${repo.name}`);
                const languages = await languagesResponse.json();
                const languageList = Object.keys(languages).map(lang => `<span class="language-item">${lang}</span>`).join(", ");

                const card = document.createElement("div");
                card.className = "repo-card";
                card.innerHTML = `
                    <div class="article-container" onclick="window.location.href='${hostedURL}';">
                        <img src="${repoMap[repo.name]}" alt="${repo.name}" loading="lazy">
                        <div class="repo-content">
                            <h3>
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                <span class="stars"><i class="fa-solid fa-star" style="color:yellow;"></i> ${repo.stargazers_count}</span>
                            </h3>
                            <div class="repo-stats">
                                <div class="language">${languageList || "N/A"}</div>
                            </div>
                            <p>${repo.description || "No description provided."}</p>
                        </div>
                    </div>`;
                repoContainer.appendChild(card);
            }
        } else {
            console.error("Error: Repository data is not an array", reposData);
        }
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
}

async function getWeather() {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=fc9c2d13772441e9b72191328240604&q=Kolkata");
        const data = await response.json();

        if (data && data.current) {
            document.getElementById("temp").textContent = `${data.current.temp_c}°C in Kolkata`;
            document.getElementById("condition").textContent = `${data.current.condition.text} ${data.current.pressure_mb} hPa`;
            document.getElementById("icon").src = `https:${data.current.condition.icon}`;
            document.getElementById("humidity").textContent = data.current.humidity;
            document.getElementById("wind").textContent = `${data.current.wind_dir} ${data.current.wind_kph}`;
        } else {
            document.getElementById("weatherRohan").innerHTML = `<p>City not found</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherRohan").innerHTML = `<p>Unable to get weather data</p>`;
    }
}

function htmlInstaPost(index, { caption, imageUrl }) {
    return `
        <div class="instagram-photo">
            <div class="instagram-header">
                <figure>
                    <img src="./assets/insta-pic.jpg" alt="Rohan Chakravarty" width="42" height="42" loading="lazy">
                    <figcaption><h4>rohan.chakravarty</h4></figcaption>
                </figure>
            </div>
            <div class="insta-media"><img src="${imageUrl}" alt="Photograph ${index}" loading="lazy"/></div>
            <div class="insta-buttons">
                <div class="left">
                    <svg class="instagram__icon instagram__icon--heart" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.8196 3.40477L16.8196 3.40468L16.8105 3.40435C15.9939 3.37401 15.1837 3.55848 14.4607 3.93934C13.7415 4.31818 13.1337 4.87813 12.6974 5.56376C12.3799 6.0141 12.1595 6.38237 12.0011 6.66645C11.841 6.38254 11.6182 6.01451 11.2971 5.5646C10.8588 4.88294 10.252 4.32584 9.53521 3.94728C8.81455 3.56666 8.00746 3.37954 7.19284 3.40423L7.19283 3.40408L7.18038 3.40477C5.73422 3.48471 4.37827 4.133 3.40801 5.20836C2.44041 6.28078 1.93462 7.69124 1.99999 9.13385C2.00344 10.8131 2.73878 12.1587 3.76066 13.3486C4.54375 14.2605 5.52952 15.1172 6.516 15.9745C6.80035 16.2216 7.08476 16.4688 7.36439 16.7173C7.71256 17.0283 8.0484 17.3289 8.36875 17.6156C9.03981 18.2163 9.64287 18.7561 10.1488 19.2024C10.8808 19.8482 11.4505 20.3358 11.7281 20.5156L11.9996 20.6915L12.2713 20.516C12.5291 20.3494 13.0097 19.9415 13.7041 19.3303C14.2257 18.8712 14.8883 18.2789 15.7018 17.5517C15.9935 17.2909 16.3047 17.0128 16.6357 16.7172C16.9253 16.4597 17.2205 16.2037 17.5157 15.9477C18.4876 15.105 19.4601 14.2617 20.2346 13.3628C21.2586 12.1744 21.9965 10.8264 22 9.13385C22.0653 7.69123 21.5596 6.28078 20.592 5.20836C19.6217 4.133 18.2657 3.48471 16.8196 3.40477ZM11.6142 4.35506L11.9954 4.80294L12.3761 4.35467C12.9155 3.71951 13.5913 3.21422 14.3531 2.87644C15.1144 2.53889 15.9419 2.37731 16.7742 2.40369C18.4866 2.47112 20.1027 3.21362 21.2694 4.46897C22.4364 5.72476 23.0588 7.39158 23.0003 9.10494L23 9.11347V9.122C23 12.4787 20.5608 14.6294 18.1924 16.6842C17.8966 16.94 17.598 17.2003 17.3031 17.462L17.3018 17.4632L16.3798 18.2872L16.3736 18.2927L16.3676 18.2985C15.2327 19.3827 14.0415 20.4065 12.7991 21.3656C12.5599 21.5162 12.2829 21.5962 12 21.5962C11.7171 21.5962 11.4402 21.5162 11.201 21.3657C9.9972 20.4352 8.84189 19.4436 7.73965 18.3948L7.73401 18.3894L7.7282 18.3842L6.7012 17.4662L6.70057 17.4657C6.43759 17.2314 6.17305 17.0015 5.91337 16.7758C5.88988 16.7554 5.86643 16.735 5.84303 16.7147C3.34442 14.5424 0.999982 12.4694 0.999982 9.122V9.11347L0.999691 9.10494C0.941196 7.39158 1.56352 5.72476 2.73058 4.46897C3.89709 3.21378 5.51295 2.47131 7.2251 2.40372C8.0557 2.37962 8.88112 2.54227 9.6405 2.87968C10.4006 3.21742 11.0751 3.72163 11.6142 4.35506Z"></path></svg>
                    <svg class="instagram__icon instagram__icon--comment" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.656 17.008C21.8711 14.9061 22.2795 12.4337 21.8048 10.0527C21.3301 7.67172 20.0048 5.54497 18.0765 4.06978C16.1482 2.59458 13.7488 1.87186 11.3266 2.0366C8.9043 2.20135 6.62486 3.24231 4.91408 4.96501C3.20329 6.68772 2.17817 8.97432 2.03024 11.3977C1.8823 13.821 2.62166 16.2153 4.1102 18.1334C5.59874 20.0514 7.73463 21.3619 10.1189 21.82C12.5031 22.2782 14.9726 21.8527 17.066 20.623L22 22L20.656 17.008Z"></path></svg>
                    <svg class="instagram__icon instagram__icon--message" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 3 9.218 10.083M11.698 20.334 22 3.001H2L9.218 10.084 11.698 20.334Z"></path></svg>
                </div>
                <div class="right"><svg class="instagram__icon instagram__icon--saved" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 21L12 13.44L4 21V3H20V21Z"></path></svg></div>
            </div>
            <h2 class="sp-captions">${caption}</h2>
        </div>`;
}

const imageCaptions = new Map([
    [1, { caption: "Lost in Heaven<br>Shot on Canon EOS R10", imageUrl: "./assets/photography/p11.png" }],
    [2, { caption: "Hadimba Temple<br>Shot on Canon EOS R10", imageUrl: "./assets/photography/p12.png" }],
    [3, { caption: "It's Either You or Nobody✨<br>Shot on Xiaomi 11T Pro", imageUrl: "./assets/photography/p10.jpeg" }],
    [4, { caption: "Sunset<br>Shot on Xiaomi 11T Pro", imageUrl: "./assets/photography/p9.jpg" }],
    [5, { caption: "Kolkata Christmas<br>Shot on Xiaomi 11T Pro", imageUrl: "./assets/photography/p8.jpg" }],
    [6, { caption: "Khiderpore Docks<br>Shot on Redmi Note 10 Pro Max", imageUrl: "./assets/photography/p7.jpg" }],
    [7, { caption: "Macro Photography<br>Shot on Redmi Note 10 Pro Max", imageUrl: "./assets/photography/p6.jpg" }],
    [8, { caption: "Railway Tracks<br>Shot on Redmi K30", imageUrl: "./assets/photography/p5.jpg" }],
    [9, { caption: "Fountain Stop Motion<br>Shot on Redmi K30", imageUrl: "./assets/photography/p4.jpg" }],
    [10, { caption: "Beautiful Sunrise Sky<br>Shot on Redmi K30", imageUrl: "./assets/photography/p3.jpg" }],
    [11, { caption: "Night Photography - Bulb Mode<br>Shot on Redmi Note 8 Pro", imageUrl: "./assets/photography/p2.jpg" }],
    [12, { caption: "Annual Solar Eclipse<br>Shot on Redmi Note 8 Pro", imageUrl: "./assets/photography/p1.jpg" }],
]);

function GenerateInstaPosts() {
    for (const [index, data] of imageCaptions.entries()) {
        if (index > 4 && window.innerWidth <= 768) {
            break;
        }
        try {
            const repoContainer = document.getElementById("sp");
            const card = document.createElement("div");
            card.className = "repo-card";
            card.innerHTML = htmlInstaPost(index, data);
            repoContainer.appendChild(card);
        } catch (error) {
            console.error("Error generating card for index", index, error);
        }
    }
}

async function loadStats() {
    try {
        const response = await fetch('https://scribe.rohandev.online/stats');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('total-questions').textContent = data.total_questions;
        document.getElementById('total-active-days').textContent = data.total_active_days;
        document.getElementById('submissions').textContent = data.submissions;
        document.getElementById('max-streak').textContent = data.max_streak;
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        document.getElementById('total-questions').textContent = "Error";
        document.getElementById('total-active-days').textContent = "Error";
    }
}


// ===================================================================
//
//              INITIALIZATION
//
// ===================================================================

// This is the single entry point that runs when the page is fully loaded.
window.onload = () => {
    setYear();
    fetchGitHubData();
    getWeather();
    loadStats();
    GenerateInstaPosts();
    playRandomBackgroundMusic(); // Added the music function here
};