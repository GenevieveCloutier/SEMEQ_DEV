
<script>
	import { onMount } from "svelte";

  onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('dashboard').classList.add('is-active')
    });
    
 
    let chart;

onMount(() => {
  const cte = document.getElementById('chartEvenements').getContext('2d');
  chart = new Chart(cte, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        data: [25, 21, 10, 3, 6, 12, 20, 30, 26, 30, 24, 12, 20],
        backgroundColor: '#184287',
        borderColor: '#184287',
        borderWidth: 1
      }]
    },
    options:{
      plugins:{
        legend:{
          display: false
        }
      }
    }
  });


  const ctvm = document.getElementById('chartVentesMois').getContext('2d');
  chart = new Chart(ctvm, {
    type: 'doughnut',
    data: {
      labels: ['Abonnements', 'Formations', 'Outils'],
      datasets: [{
        label: 'Sales',
        data: [153,65,26],
        backgroundColor: ['#184287', 'lightgrey', 'orange'],
        borderColor: '#184287',
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
          legend: {
            display: false // Désactive la légende
          }
        },
    }
  });
  
  const ctvj = document.getElementById('chartVentesJour').getContext('2d');
  chart = new Chart(ctvj, {
    type: 'doughnut',
    data: {
      labels: ['Abonnements', 'Formations', 'Outils'],
      datasets: [{
        label: 'Sales',
        data: [153,65,26],
        backgroundColor: ['#184287', 'lightgrey', 'orange'],
        borderColor: '#184287',
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
          legend: {
            display: false // Désactive la légende
          }
        },
    }
  });





const ctu = document.getElementById('chartUtilisateurs').getContext('2d');
  chart = new Chart(ctu, {
    type: 'bar',
    data: {
      labels: ['Visiteurs', 'Exposants', 'Organisateur'],
      datasets: [
          {
            label: 'Abonnés',
            data: [36, 42, 90],
            backgroundColor: '#184287',
          },
          {
            label: 'Non-abonnés',
            data: [12, 26, 10],
            backgroundColor: 'lightgray',
          }
        ]
    },
    plugins: {
          legend: {
            position: 'bottom', // Change la position de la légende ici
          }
        },
    options: {
    indexAxis: 'y',
    scales: {
    //       y: {
    //         stacked: true // Active le mode empilé
    //       },
              y: {
            beginAtZero: true // Commence l'axe Y à zéro
          }
        },
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 0,
      }
    },
  }
  });
});

</script>

<div class="fixed-grid has-3-cols has-1-cols-mobile">
    <div class="grid is-row-gap-0">
        <div class="cell box">
          <h3 class="subtitle">Utilisateurs</h3>
          <canvas class="" id="chartUtilisateurs"></canvas>
        </div>
        <div class="cell box">
          <div class="columns">
            <div class="column is-half">
          <h3 class="subtitle">Ventes</h3>
              <p class="help">Cemois ci</p>
              <p>4562$</p>
            </div>
            <div class="column is-half">
              <canvas class="block" id="chartVentesMois"></canvas>
              <canvas class="block" id="chartVentesJour"></canvas>
            </div>
          </div>
        </div>
        <div class="cell box is-row-span-2"></div>
        <div class="cell box">
          <h3 class="subtitle">Evénements</h3>
          <canvas class="" id="chartEvenements"></canvas>
        </div>
          <div class="cell box mb-5"></div>
          
      </div>
</div>