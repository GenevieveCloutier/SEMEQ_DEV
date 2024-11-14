<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H3Title from "$lib/components/titres/h3Title.svelte";
    import Accordion, { createAccordionContext, getAccordionContext } from "$lib/components/generaux/accordion.svelte";
    import questions from "$lib/data/questions.json"
    
//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
createAccordionContext();

</script>

<H1Title title={"F.A.Q."} />

<div class="container is-fluid">
    <H3Title title={"Questions fréquentes:"} />
    <div class="container">
        <!-- les questions de la FAQ sont dans le fichier /data/questions.json -->
        {#each questions as question}
        <hr class="my-1">
        <Accordion>
                <span slot="head">
                    {question.question}
                </span>
                <div slot="details">
                <p>
                    {@html question.reponse}
                </p>
                </div>
        </Accordion>
        {/each}
    </div>
    <div class="mt-6">
        <H3Title title={"D'autres questions?"} />
        <div class="container is-fluid">
            <p>Tu n'as pas trouvé la réponse à ta question? N'hésite pas à nous joindre en utilisant ce 
                <a href="/contact">formulaire de contact!</a>
            </p>
        </div>
    </div>

</div>