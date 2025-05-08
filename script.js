document.getElementById('footprintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const carKm = +document.getElementById('carKm').value;
    const acHours = +document.getElementById('acHours').value;
    const meatMeals = +document.getElementById('meatMeals').value;
  
    const carEmission = carKm * 0.12;
    const acEmission = acHours * 1.5;
    const meatEmission = meatMeals * 7;
  
    const total = carEmission + acEmission + meatEmission;
  
    showChart([carEmission, acEmission, meatEmission], total);
    showAdvice(total);
    updateProgressCircle(total);
  });
  
  function showChart(data, total) {
    const ctx = document.getElementById('chart').getContext('2d');
    if (window.bar) window.bar.destroy();
    window.bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Car Travel', 'AC Usage', 'Meat Consumption'],
        datasets: [{
          label: 'Emissions (kg CO₂)',
          data: data,
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
    document.getElementById('results').classList.remove('hidden');
  }
  
  function showAdvice(total) {
    const advice = document.getElementById('advice');
  
    const tips = [
      "Use public transport or carpool instead of driving alone.",
      "Limit use of air conditioners, and clean filters regularly.",
      "Try having a vegetarian day once or twice a week.",
      "Switch off devices when not in use.",
      "Use energy-efficient appliances and LED lights.",
      "Walk or cycle for short distances.",
      "Avoid single-use plastic and recycle waste.",
      "Dry clothes naturally instead of using a dryer.",
      "Buy local produce to reduce transport emissions.",
      "Insulate your home to reduce heating/cooling needs."
    ];
  
    let header = "";
  
    if (total < 50) {
      header = "✅ Great! Your footprint is quite low. Keep it up!";
    } else if (total < 100) {
      header = "⚠️ You're doing okay. Here's how to do better:";
    } else {
      header = "❌ High emissions detected. Try these tips:";
    }
  
    // Randomly pick 2 tips
    const shuffled = tips.sort(() => 0.5 - Math.random());
    const selectedTips = shuffled.slice(0, 2);
  
    advice.innerHTML = `
      <strong>${header}</strong><br>
      • ${selectedTips[0]}<br>
      • ${selectedTips[1]}
    `;
  }
  showRandomFact();  // Show fact when Calculate is clicked
  const facts = [
    "One tree absorbs about 22 kg of CO₂ per year.",
    "Meat production causes more emissions than all transport combined.",
    "LEDs use 75% less energy than traditional bulbs.",
    "A 10-minute shower uses about 25 gallons of water.",
    "Air travel is one of the fastest-growing sources of carbon emissions."
  ];
  
  function showRandomFact() {
    const factBox = document.getElementById('fact-box');
    const factText = document.getElementById('fact-text');
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factText.innerText = `💡 Did you know? ${randomFact}`;
    factBox.classList.remove('hidden');
  }
  
  
  function updateProgressCircle(total) {
    const max = 150;
    const percent = Math.min((total / max) * 100, 100).toFixed(0);
    const circle = document.querySelector('.progress-ring .progress');
    const offset = 314 - (314 * percent) / 100;
    circle.style.strokeDashoffset = offset;
    document.getElementById('percentageValue').textContent = percent + '%';
  }
