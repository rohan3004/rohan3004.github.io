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

  // Extract labels and ratings based on the selected data
  const labels = data.map(d => d.date);
  const ratings = data.map(d => d.rating);
  const contestNames = data.map(d => d.contestName);

  const chart = new Chart(ctx, {
    type: 'line', // Line chart to show contest progress
    data: {
      labels: labels,
      datasets: [{
        label: 'Rating',
        data: ratings,
        borderColor: 'rgb(169, 176, 249)', // Teal color
        backgroundColor: 'rgb(169, 176, 249,0.2)', // Light fill
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
            title: function (tooltipItem) {
              return ''; // No title
            },
            label: function (tooltipItem) {
              const contestName = contestNames[tooltipItem.dataIndex];
              const rating = `Rating: ${ratings[tooltipItem.dataIndex]}`;
              return contestName + ' - ' + rating;
            },
          },
        },
      },
      scales: {
        x: {
          display: false, // Show X axis
        },
        y: {
          title: {
            display: true,
            text: 'Rating',
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

    // Select the correct data based on the radio button
    if (selectedPlatform === 'leetcode') {
      selectedData = leetcodeData;
    } else if (selectedPlatform === 'codeforces') {
      selectedData = codeforcesData;
    } else if (selectedPlatform === 'codechef') {
      selectedData = codechefData;
    }

    // Destroy the previous chart and generate the new one
    currentChart.destroy();
    currentChart = generateChart(selectedData);
  });
});