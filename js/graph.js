/*!
 * Copyright © 2025 Rohan Chakravarty.
 * All Rights Reserved.
 *
 * Licensed under the MIT License.
 * You may obtain a copy of the License at
 *      https://rohandev.online/LICENSE
 *
 * This file is provided "as is", without warranty of any kind.
 */

// Data for each platform
const codeforcesData = [
  { date: '2024-07-20', rating: 361, contestName: 'Codeforces Round 960 (Div. 2)' },
  { date: '2024-09-01', rating: 728, contestName: 'Codeforces Round 970 (Div. 3)' },
];
const codechefData = [
  { date: '2024-09-04', rating: 1414, contestName: 'Starters 150 (Rated)' },
  { date: '2024-09-11', rating: 1315, contestName: 'Starters 151 (Rated)' },
  { date: '2024-10-16', rating: 1477, contestName: 'Starters 156 (Rated)' },
];
const leetcodeData = [
  { date: '2024-06-16', rating: 1503, contestName: 'Weekly Contest 402' },
  { date: '2024-06-22', rating: 1518, contestName: 'Biweekly Contest 133' },
  { date: '2024-06-23', rating: 1542, contestName: 'Weekly Contest 403' },
  { date: '2024-07-20', rating: 1520, contestName: 'Biweekly Contest 135' },
  { date: '2024-07-21', rating: 1504, contestName: 'Weekly Contest 407' },
  { date: '2024-08-25', rating: 1541, contestName: 'Weekly Contest 412' },
  { date: '2024-08-31', rating: 1575, contestName: 'Biweekly Contest 138' },
  { date: '2024-09-01', rating: 1660, contestName: 'Weekly Contest 413' },
  { date: '2024-09-08', rating: 1684, contestName: 'Weekly Contest 414' },
  { date: '2024-09-14', rating: 1659, contestName: 'Biweekly Contest 139' },
  { date: '2024-10-12', rating: 1718, contestName: 'Biweekly Contest 141' },
  { date: '2024-10-13', rating: 1684, contestName: 'Weekly Contest 419' },
];

// Function to generate the chart
function generateChart(data) {
  const ctx = document.getElementById('ratingChart').getContext('2d');

  const labels = data.map(d => d.date);
  const ratings = data.map(d => d.rating);
  const contestNames = data.map(d => d.contestName);

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Rating',
        data: ratings,
        borderColor: 'rgb(169, 176, 249)',
        backgroundColor: 'rgb(169, 176, 249,0.2)',
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem) {
              const contestName = contestNames[tooltipItem.dataIndex];
              const rating = `Rating: ${ratings[tooltipItem.dataIndex]}`;
              return contestName + ' - ' + rating;
            },
          },
        },
        legend: {
          labels: {
            color: '#f2e3ee',
          }
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          title: {
            display: true,
            text: 'Rating',
            color: '#f2e3ee',
          },
          ticks: {
            color: '#f2e3ee',
          },
        },
      },
    },
  });

  return chart;
}

// Initial chart generation with LeetCode data
let currentChart = generateChart(leetcodeData);

// Event listener for radio buttons
const platformRadios = document.querySelectorAll('input[name="platform"]');
platformRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    const selectedPlatform = e.target.value;
    let selectedData;
    const summaryEl = document.getElementById('platform-summary');
      summaryEl.classList.add('fade-out');
    fetch('https://scribe.rohandev.online/stats')
      .then(response => response.json())
      .then(data => {
          if (selectedPlatform === 'leetcode') {
            selectedData = leetcodeData;
            setTimeout(() => {
              summaryEl.innerHTML = generateSummary('LeetCode', data.leetcode_contests, data.leetcode_contest_rating.current, data.leetcode_contest_rating.max);
      
              // slight pause before fade in
              requestAnimationFrame(() => {
                summaryEl.classList.remove('fade-out');
                summaryEl.classList.add('fade-in');
      
                setTimeout(() => {
                  summaryEl.classList.remove('fade-in');
                }, 600); // duration of fade-in
              });
            }, 350); // timing for fade-out to finish
          } else if (selectedPlatform === 'codeforces') {
            selectedData = codeforcesData;
            setTimeout(() => {
              summaryEl.innerHTML = generateSummary('Codeforces', data.codeforces_contests, data.codeforces_contest_rating.current, data.codeforces_contest_rating.max, data.codeforces_contest_rating.rank);
      
              // slight pause before fade in
              requestAnimationFrame(() => {
                summaryEl.classList.remove('fade-out');
                summaryEl.classList.add('fade-in');
      
                setTimeout(() => {
                  summaryEl.classList.remove('fade-in');
                }, 600); // duration of fade-in
              });
            }, 350); // timing for fade-out to finish
          } else if (selectedPlatform === 'codechef') {
            selectedData = codechefData;
            setTimeout(() => {
              summaryEl.innerHTML = generateSummary('CodeChef', data.codechef_contests, data.codechef_contest_rating.current, data.codechef_contest_rating.max);
      
              // slight pause before fade in
              requestAnimationFrame(() => {
                summaryEl.classList.remove('fade-out');
                summaryEl.classList.add('fade-in');
      
                setTimeout(() => {
                  summaryEl.classList.remove('fade-in');
                }, 600); // duration of fade-in
              });
            }, 350); // timing for fade-out to finish
          }
      
          currentChart.destroy();
          currentChart = generateChart(selectedData);


      })
      .catch(error => console.error('Failed to fetch contest ratings:', error));
  });
});

// Fetch and render pie chart
fetch('https://scribe.rohandev.online/stats') // Use your actual JSON endpoint
  .then(response => response.json())
  .then(jsonData => {
    const rawValues = {
      'CodeChef': parseInt(jsonData.competitive_codechef),
      'Codeforces': parseInt(jsonData.competitive_codeforces),
      'Easy': parseInt(jsonData.dsa_easy),
      'Medium': parseInt(jsonData.dsa_medium),
      'Hard': parseInt(jsonData.dsa_hard),
      'GFG': parseInt(jsonData.fundamentals_gfg),
      'HackerRank': parseInt(jsonData.fundamentals_hackerrank)
    };

    const labels = Object.keys(rawValues);
    const values = Object.values(rawValues);
    const total = values.reduce((a, b) => a + b, 0);

    const backgroundColors = [
      '#FF9F1C',  // CodeChef
  '#00C9A7',  // Codeforces
  '#6A4C93',  // DSA Easy
  '#F72585',  // DSA Medium
  '#3A86FF',  // DSA Hard
  '#FF4C29',  // GFG
  '#8338EC'   // HackerRank
    ];

    const ctx = document.getElementById('dsaPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: backgroundColors,
          hoverOffset: 12,
          spacing: 3,
          borderWidth: 2,
           borderColor: '#f2e4ef',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 10
        },
        cutout: '50%',
        animation: {
          animateRotate: true,
          duration: 1000,
          easing: 'easeOutBounce'
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f2e4ef',
              font: {
                family: 'Poppins'
              }
            }
          },
          tooltip: {
            callbacks: {
              title: function () {
                return '';
              },
              label: function (tooltipItem) {
                const label = tooltipItem.label;
                const raw = tooltipItem.raw;
                return `${label}: ${raw}`;
              }
            }
          },
          datalabels: {
            color: '#0b050a',
            font: {
              weight: 'bold',
              size: 12,
              family: 'Poppins'
            },
            formatter: (value) => {
              return `${value}`;
            },
            anchor: 'center',
            clamp: true
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  })
  .catch(error => {
    console.error('Failed to fetch pie chart data:', error);
  });

  function generateSummary(platform, contests, currentRating, maxRating, rank = "") {
    return `I have participated in <span class="highlight">${contests}</span> <span class="highlight">${platform}</span> contests so far. My current rating stands at <span class="highlight">${currentRating}</span>, with a personal best of <span class="highlight">${maxRating}</span>. ${rank && `I currently hold the "<span class="highlight">${rank}</span>" rank.`}`.trim();
  }  