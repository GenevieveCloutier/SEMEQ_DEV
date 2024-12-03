<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let factureData;

    $: {
        const { data } = $page;
        factureData = data.facture;
    }

    onMount(() => {
        if (!factureData) {
            goto('/achats');
        }
    });

    function printFacture() {
        window.print();
    }
</script>

{#if factureData}
<div class="block has-text-centered print-button">
    <button on:click={printFacture} class="button is-dark" style="background-color: #053682; color:white">
        <span class="icon"><i class="fa-solid fa-print"></i></span>
        <span>Imprimer la facture</span>
    </button>
</div>

<div class="container" id="factureToPrint">
    <div class="invoice-header">
        <h1 class="title is-size-4 is-uppercase" style="color: #184287;">Facture</h1>
        <div class="columns is-2">
            <div class="column is-half">
                <figure class="image">
                    <img src="/src/lib/img/app/logo.png" alt="Répertoire SÉMEQ" />
                </figure><br>
                <!-- <p><strong>Numéro de facture :</strong> #</p> -->
                <p><strong>Date :</strong> {factureData.date}</p>
            </div>
            <div class="column is-half">
                <p><strong>Informations du client :</strong></p>
                <p>{factureData.client.prenom} {factureData.client.nom}</p>
                {#if factureData.client.entreprise}
                <p>{factureData.client.entreprise}</p>
                {/if}
                {#if factureData.client.adresse}
                <p>{factureData.client.adresse}</p>
                {/if}
                <p>{factureData.client.ville}
                    {#if factureData.client.code_postal}
                        , {factureData.client.code_postal}
                    {/if}
                </p>
            </div>
        </div>
    </div>
    <div class="invoice-body">
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Type</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>
                {#each factureData.items as item}
                <tr>
                    <td>{item.nom}</td>
                    <td>{item.type}</td>
                    <td>{item.prix}</td>
                </tr>
                {/each}
            </tbody>
        </table>
        <div class="columns">
            <div class="column has-text-right">
                <p><strong>Total : {factureData.total}</strong></p>
            </div>
        </div>
    </div>
    <div class="invoice-footer">
        <p>Merci pour votre achat!</p>
    </div>
</div>
{/if}


<style>
img{
    max-height:128px;
    max-width:128px;
    height:auto;
    width:auto;
}

.invoice-header, .invoice-footer {
    background-color: #f5f5f5;
    padding: 20px;
}
.invoice-body {
    padding-top: 20px;
    padding-bottom: 20px;
}
.invoice-table {
    width: 100%;
    border-collapse: collapse;
}
.invoice-table th, .invoice-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.invoice-table th {
    background-color: #f5f5f5;
}
.print-button {
    margin-top: 20px;
}

/* Styles spécifiques pour l'impression des factures */
@media print {
    body * {
        visibility: hidden;
    }
    #factureToPrint, #factureToPrint * {
        visibility: visible;
    }
    #factureToPrint {
        position: absolute;
        left: 0;
        top: 0;
    }
    .print-button {
        display: none;
    }
}
</style>