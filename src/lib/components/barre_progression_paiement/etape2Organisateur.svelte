<!-- Barre de progression, source : https://aramvisser.github.io/bulma-steps/ -->
 
<ul class="steps is-medium is-centered has-content-centered">
    <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-user"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="subtitle is-6">INFORMATIONS</p>
        </div>
    </li>

    <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-usd"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="subtitle is-6">PAIEMENT</p>
        </div>
    </li>

    <li class="steps-segment is-active">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-calendar-days"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="subtitle is-6">ÉVÉNEMENT</p>
        </div>
    </li>
    
    <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-check"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="subtitle is-6">CONFIRMATION</p>
        </div>
    </li>
</ul>

<style>
  /* pour que les onglets de la navbar s'affichent par dessus la barre de progession */
  	ul {
		position: relative;
		z-index: 4;
	}
    
</style>