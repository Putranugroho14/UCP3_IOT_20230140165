import Chart from 'chart.js/auto';
import sensorDataJson from './datasensoroneloc.json';

(async function () {
  const report = sensorDataJson.datasensorreport[0];

  const groupedData = {};
  report.sensordata.forEach(data => {
    const id = data.sensor_id;
    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    groupedData[id].push(data);
  });

  Object.keys(groupedData).forEach(id => {
    groupedData[id].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  });

  const sensorIds = Object.keys(groupedData);

  const colors = {
    temp: ['red', 'orange', 'darkred'],
    humid: ['blue', 'cyan', 'darkblue'],
    pressure: ['green', 'lime', 'darkgreen']
  };

  const labels = groupedData[sensorIds[0]].map((_, index) => index + 1);

  const tempDatasets = sensorIds.map((id, index) => ({
    label: `Temperature (Sensor ${id})`,
    data: groupedData[id].map(r => r.temperature),
    borderColor: colors.temp[index % 3],
    backgroundColor: colors.temp[index % 3],
    borderWidth: 2,
    tension: 0,
    fill: false,
    pointRadius: 4,
    pointBackgroundColor: colors.temp[index % 3]
  }));

  new Chart(
    document.getElementById('temp'),
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: tempDatasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: '#333', font: { size: 12 } }
          }
        },
        scales: {
          x: {
            grid: { drawOnChartArea: true },
            ticks: { color: '#666' }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Temperature', color: '#666' },
            ticks: { color: '#666' },
            grid: { color: '#eaeaea' }
          }
        }
      }
    }
  );

  const humidDatasets = sensorIds.map((id, index) => ({
    label: `Humidity (Sensor ${id})`,
    data: groupedData[id].map(r => r.humidity),
    borderColor: colors.humid[index % 3],
    backgroundColor: colors.humid[index % 3],
    borderWidth: 2,
    tension: 0,
    fill: false,
    pointRadius: 4,
    pointBackgroundColor: colors.humid[index % 3]
  }));

  new Chart(
    document.getElementById('humid'),
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: humidDatasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: '#333', font: { size: 12 } }
          }
        },
        scales: {
          x: {
            grid: { drawOnChartArea: true },
            ticks: { color: '#666' }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Humidity', color: '#666' },
            ticks: { color: '#666' },
            grid: { color: '#eaeaea' }
          }
        }
      }
    }
  );

  const pressureDatasets = sensorIds.map((id, index) => ({
    label: `Pressure (Sensor ${id})`,
    data: groupedData[id].map(r => r.pressure),
    borderColor: colors.pressure[index % 3],
    backgroundColor: colors.pressure[index % 3],
    borderWidth: 2,
    tension: 0,
    fill: false,
    pointRadius: 4,
    pointBackgroundColor: colors.pressure[index % 3]
  }));

  new Chart(
    document.getElementById('pressure'),
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: pressureDatasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: '#333', font: { size: 12 } }
          }
        },
        scales: {
          x: {
            grid: { drawOnChartArea: true },
            ticks: { color: '#666' }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Pressure', color: '#666' },
            ticks: { color: '#666' },
            grid: { color: '#eaeaea' }
          }
        }
      }
    }
  );
})();
