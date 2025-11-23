/*!
 * Copyright © 2025 Rohan Chakravarty.
 * All Rights Reserved.
 *
 * Licensed under the MIT License.
 * You may obtain a copy of the License at
 *      https://rcxdev.com/LICENSE
 *
 * This file is provided "as is", without warranty of any kind.
 */

// ==========================================
// 1. CONFIGURATION
// ==========================================
const API_URL = 'https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com';

const COLORS = {
    lineBorder: '#a9b0f9',
    lineFillTop: 'rgba(169, 176, 249, 0.3)', 
    lineFillBottom: 'rgba(169, 176, 249, 0.0)', 
    text: '#f2e3ee',
    textDim: 'rgba(242, 227, 238, 0.6)',
    grid: 'rgba(242, 227, 238, 0.1)',
    pie: {
        codechef: '#F29F05', codeforces: '#4DB6AC', 
        easy: '#673AB7', medium: '#E91E63', hard: '#2196F3', gfg: '#FF5722'
    }
};

// ==========================================
// 2. DATA ENGINE
// ==========================================
function generateSimulatedTrend(platform, current, max, pointsCount) {
    const data = [];
    const labels = [];
    const safeCurrent = current || 0;
    const safeMax = max || safeCurrent;
    const startRating = platform === 'LeetCode' ? 1500 : 0;

    for (let i = 0; i < pointsCount; i++) {
        let val;
        if (i === 0) val = startRating;
        else if (i === pointsCount - 1) val = safeCurrent;
        else if (i === Math.floor(pointsCount / 2)) val = safeMax;
        else {
            // Interpolation
            const mid = Math.floor(pointsCount / 2);
            let target = i < mid 
                ? startRating + (safeMax - startRating) * (i / mid)
                : safeMax + (safeCurrent - safeMax) * ((i - mid) / mid);
            // Noise
            val = Math.floor(target + (Math.random() - 0.5) * (platform === 'LeetCode' ? 40 : 20));
        }
        data.push(Math.max(0, val));
        labels.push(''); // Empty X-axis labels for clean look
    }
    return { labels, data };
}

function updateSummaryHTML(html) {
    const el = document.getElementById('platform-summary');
    if (!el) return;
    el.innerHTML = html; 
}

// ==========================================
// 3. LINE CHART (Points Added)
// ==========================================
let currentLineChart = null;

function loadPlatformData(platform) {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let trend, html;

            if (platform === 'leetcode') {
                const d = data.leetcode;
                trend = generateSimulatedTrend('LeetCode', d.rating, d.rating, 12);
                html = `I have participated in <span class="highlight">${d.contests_attended}</span> LeetCode events. Rating: <span class="highlight">${d.rating}</span>.`;
            } else if (platform === 'codeforces') {
                const d = data.codeforces;
                trend = generateSimulatedTrend('Codeforces', d.rating, d.rating_max, 10);
                html = `Codeforces Rating: <span class="highlight">${d.rating}</span> (Max: <span class="highlight">${d.rating_max}</span>).`;
            } else if (platform === 'codechef') {
                const d = data.codechef;
                trend = generateSimulatedTrend('CodeChef', d.rating, d.rating, 8);
                html = `CodeChef Rating: <span class="highlight">${d.rating}</span>.`;
            } else if (platform === 'geeksforgeeks') {
                const d = data.geeksforgeeks;
                const score = d.problems_solved_total || 0;
                trend = generateSimulatedTrend('GFG', score, score, 15);
                html = `Solved <span class="highlight">${score}</span> problems on GFG. Streak: <span class="highlight">${d.streak_current}</span>.`;
            }

            updateSummaryHTML(html);

            const ctx = document.getElementById('ratingChart').getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, COLORS.lineFillTop);
            gradient.addColorStop(1, COLORS.lineFillBottom);

            if (currentLineChart) currentLineChart.destroy();

            currentLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: trend.labels,
                    datasets: [{
                        label: 'Ratings', // Changed label name
                        data: trend.data,
                        borderColor: COLORS.lineBorder,
                        backgroundColor: gradient,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        // --- POINTS ENABLED HERE ---
                        pointRadius: 4,           // Visible points
                        pointHoverRadius: 6,      // Larger on hover
                        pointBackgroundColor: COLORS.lineBorder,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                        // ---------------------------
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, 
                    aspectRatio: 2,
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(20, 20, 30, 0.9)',
                            titleColor: COLORS.text,
                            bodyColor: COLORS.text,
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1,
                            callbacks: {
                                title: () => '',
                                label: (ctx) => `Ratings: ${ctx.parsed.y}` // Tooltip text updated
                            }
                        }
                    },
                    scales: {
                        x: { display: false },
                        y: {
                            border: { display: false },
                            grid: { color: COLORS.grid, borderDash: [5, 5] },
                            ticks: { color: COLORS.textDim, font: { family: 'Poppins', size: 10 } }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        })
        .catch(err => console.error(err));
}

// ==========================================
// 4. PIE CHART
// ==========================================
fetch(API_URL).then(res => res.json()).then(json => {
    const canvas = document.getElementById('dsaPieChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dataValues = [
        json.codechef.problems_solved_total || 0,
        json.codeforces.problems_solved_total || 0,
        json.leetcode.problems_solved_easy || 0,
        json.leetcode.problems_solved_medium || 0,
        json.leetcode.problems_solved_hard || 0,
        json.geeksforgeeks.problems_solved_total || 0
    ];
    
    // --- Center Text Plugin ---
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function(chart) {
            const { ctx } = chart;
            ctx.restore();
            const total = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const meta = chart.getDatasetMeta(0);
            if (!meta.data[0]) return;
            
            const innerRadius = meta.data[0].innerRadius;
            const centerX = meta.data[0].x;
            const centerY = meta.data[0].y;

            ctx.font = `bold ${(innerRadius * 0.6).toFixed(2)}px Poppins`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillStyle = COLORS.text;
            ctx.fillText(total, centerX, centerY - (innerRadius * 0.15));

            ctx.font = `500 ${(innerRadius * 0.2).toFixed(2)}px Poppins`;
            ctx.fillStyle = COLORS.textDim;
            ctx.fillText("Solved", centerX, centerY + (innerRadius * 0.25));
            ctx.save();
        }
    };

    let clickedIndex = null;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CodeChef', 'Codeforces', 'LC Easy', 'LC Medium', 'LC Hard', 'GFG'],
            datasets: [{
                data: dataValues,
                backgroundColor: [COLORS.pie.codechef, COLORS.pie.codeforces, COLORS.pie.easy, COLORS.pie.medium, COLORS.pie.hard, COLORS.pie.gfg],
                borderWidth: 0,
                offset: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            cutout: '75%',
            layout: { padding: 20 },
            onClick: (e, elements, chart) => {
                if (elements[0]) {
                    const index = elements[0].index;
                    clickedIndex = (clickedIndex === index) ? null : index;
                    chart.data.datasets[0].offset = chart.data.datasets[0].data.map((_, i) => i === clickedIndex ? 20 : 0);
                    chart.update();
                } else {
                    clickedIndex = null;
                    chart.data.datasets[0].offset = chart.data.datasets[0].data.map(() => 0);
                    chart.update();
                }
            },
            plugins: {
                legend: { 
                    display: true, position: 'bottom', 
                    labels: { color: COLORS.text, font: { family: 'Poppins', size: 11 }, usePointStyle: true, boxWidth: 8 }
                },
                tooltip: { enabled: true },
                datalabels: { display: false }
            }
        },
        plugins: [centerTextPlugin]
    });
});

// ==========================================
// 5. INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlatformData('leetcode');
    document.querySelectorAll('input[name="platform"]').forEach(r => {
        r.addEventListener('change', (e) => loadPlatformData(e.target.value));
    });
});