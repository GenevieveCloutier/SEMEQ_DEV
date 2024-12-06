<script>
	import { onMount } from 'svelte';

	//Reception du Load
	export let data;
	const { evenements, utilisateurs, achats } = data;

	//Mise en forme des données pour les statistiques d'achat

	let totalAchat = 0;
	achats
		.filter((item) => {
			const dateDachat = new Date(item.createdAt);
			return (
				dateDachat.getMonth() === new Date().getMonth() &&
				dateDachat.getFullYear() === new Date().getFullYear()
			);
		})
		.forEach((item) => {
			totalAchat += item.prix;
		});

	let totalPrecedent = 0;
	achats
		.filter((item) => {
			const dateDachat = new Date(item.createdAt);
			const now = new Date();
			const moisPrecedent = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
			const annee = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
			return dateDachat.getMonth() === moisPrecedent && dateDachat.getFullYear() === annee;
		})
		.forEach((item) => {
			totalPrecedent += item.prix;
		});

	let compteur = {
		abonnement: 0,
		formation: 0,
		outil: 0
	};
	achats.forEach((achat) => {
		achat.produit.type_id === 1
			? compteur.abonnement++
			: achat.produit.type_id === 2
				? compteur.formation++
				: achat.produit.type_id === 3
					? compteur.outil++
					: null;
	});
	const varClass = totalAchat > totalPrecedent ? 'is-success' : 'is-danger';
	const fleche = totalAchat > totalPrecedent ? '↑ +' : '↓ -';

	//Mise en forme des données pour les statistiques d'événements
	const mois = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
	let evenementStats = new Array(12).fill(0);
	evenements.forEach((evenement) => {
		evenementStats[evenement.debut_even.getMonth()]++;
	});

	//Mise en forme des données pour les statistiques d'utilisateurs
	const roles = ['Organisateur', 'Exposants', 'Visiteurs'];
	let abonnes = new Array(3).fill(0);
	let nonAbonnes = new Array(3).fill(0);
	utilisateurs.forEach((utilisateur) => {
		if (utilisateur.abonne) abonnes[utilisateur.role_id - 2]++;
		else nonAbonnes[utilisateur.role_id - 2]++;
	});

	onMount(() => {
		const actives = document.querySelectorAll('a.is-active');
		actives.forEach((x) => x.classList.remove('is-active'));
		document.getElementById('dashboard').classList.add('is-active');
	});

	let chart;

	onMount(() => {
		const cte = document.getElementById('chartEvenements').getContext('2d');
		chart = new Chart(cte, {
			type: 'bar',
			data: {
				labels: mois,
				datasets: [
					{
						data: evenementStats,
						backgroundColor: '#184287',
						borderColor: '#184287',
						borderWidth: 1
					}
				]
			},
			options: {
				plugins: {
					legend: {
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
				datasets: [
					{
						label: 'Sales',
						data: [compteur.abonnement, compteur.formation, compteur.outil],
						backgroundColor: ['#184287', 'lightgrey', 'orange'],
						borderColor: '#184287',
						borderWidth: 0
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false // Désactive la légende
					}
				}
			}
		});

		// const ctvj = document.getElementById('chartVentesJour').getContext('2d');
		// chart = new Chart(ctvj, {
		//   type: 'doughnut',
		//   data: {
		//     labels: ['Abonnements', 'Formations', 'Outils'],
		//     datasets: [{
		//       label: 'Sales',
		//       data: [153,65,26],
		//       backgroundColor: ['#184287', 'lightgrey', 'orange'],
		//       borderColor: '#184287',
		//       borderWidth: 0
		//     }]
		//   },
		//   options: {
		//     plugins: {
		//         legend: {
		//           display: false // Désactive la légende
		//         }
		//       },
		//   }
		// });

		const ctu = document.getElementById('chartUtilisateurs').getContext('2d');
		chart = new Chart(ctu, {
			type: 'bar',
			data: {
				labels: roles,
				datasets: [
					{
						label: 'Abonnés',
						data: abonnes,
						backgroundColor: '#184287'
					},
					{
						label: 'Non-abonnés',
						data: nonAbonnes,
						backgroundColor: 'lightgray'
					}
				]
			},
			plugins: {
				legend: {
					position: 'bottom' // Change la position de la légende ici
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
						borderWidth: 0
					}
				}
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
					<p class="">Ce mois ci</p>
					<p class="big"><big>{totalAchat}$</big></p>
					<p class="help {varClass}">{fleche} {totalAchat - totalPrecedent} $</p>
				</div>
				<div class="column is-half">
					<canvas class="block" id="chartVentesMois"></canvas>
					<!-- <canvas class="block" id="chartVentesJour"></canvas> -->
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
