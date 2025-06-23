const ctx = document.getElementById('moodChart').getContext('2d');
let chart;
let currentUser = 'all';
let currentPeriod = 'day';
let moodData = {};

async function fetchData() {
  try {
    const response = await fetch('/humeur'); 
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    return null;
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toISOString().split('T')[0];
}

function getPeriodKey(dateStr, period) {
  const date = new Date(dateStr);
  const year = date.getFullYear();

  if (period === 'day') {
    return formatDate(dateStr);
  } else if (period === 'week') {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const dayNumber = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((dayNumber + firstDay.getDay() + 1) / 7);
    return `${year}-S${week}`;
  } else if (period === 'year') {
    return `${year}`;
  }
}

function groupDataByPeriod(userKey, period) {
  const grouped = {};
  const users = userKey === 'all' ? Object.keys(moodData) : [userKey];

  users.forEach(user => {
    moodData[user].forEach(entry => {
      const key = getPeriodKey(entry.date, period);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry.mood);
    });
  });

  const labels = Object.keys(grouped).sort();
  const data = labels.map(label => {
    const moods = grouped[label];
    return moods.reduce((a, b) => a + b, 0) / moods.length;
  });

  return { labels, data };
}

// 🖌️ Met à jour le graphique
function updateChart(userKey, period) {
  const { labels, data } = groupDataByPeriod(userKey, period);
  const label = userKey === 'all' ? `Moyenne (${period})` : `Humeur de ${userKey} (${period})`;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        pointRadius: 5,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: {
            stepSize: 1,
            callback: value => {
              const emojis = ['😠', '🙁', '😐', '🙂', '😁'];
              return emojis[value - 1] || value;
            }
          }
        }
      }
    }
  });
}

function remplirListeUtilisateurs(moodData) {
  const userFilter = document.getElementById('userFilter');

  while (userFilter.options.length > 1) {
    userFilter.remove(1);
  }

  const utilisateurs = Object.keys(moodData);
  utilisateurs.forEach(userId => {
    const option = document.createElement('option');
    option.value = userId;
    option.textContent = userId.charAt(0).toUpperCase() + userId.slice(1);
    userFilter.appendChild(option);
  });
}

document.getElementById('userFilter').addEventListener('change', e => {
  currentUser = e.target.value;
  updateChart(currentUser, currentPeriod);
});

document.getElementById('timeFilter').addEventListener('change', e => {
  currentPeriod = e.target.value;
  updateChart(currentUser, currentPeriod);
});

(async function init() {
  const data = await fetchData();
  if (!data) return;
  moodData = data;

  remplirListeUtilisateurs(moodData); 
  updateChart(currentUser, currentPeriod); 
})();
