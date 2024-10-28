<script>
    import { fly, fade } from "svelte/transition";
</script>
<div class="box" in:fly={{ y: -200, duration: 1000 }} out:fade>
    <div class="columns">
        <div class="column is-half">
            <div class="field">
                <label class="label" for="pwdActuel"
                    >Mot de passe actuel <span class="rouge">*</span></label
                >
                <div class="control">
                    <input
                        class="input"
                        type="password"
                        name="pwdActuel"
                        id="pwdActuel"
                        placeholder="**********"
                        required
                    />
                </div>
                <div class="field">
                    <label class="label" for="pwdNouveau1"
                        >Nouveau mot de passe <span class="rouge">*</span></label
                    >
                    <div class="control">
                        <input
                            class="input"
                            type="password"
                            name="pwdNouveau1"
                            id="pwdNouveau1"
                            placeholder="**********"
                            required
                        />
                    </div>
                    <div class="field">
                        <label class="label" for="pwdNouveau2"
                            >Confirmer le nouveau mot de passe <span class="rouge">*</span></label
                        >
                        <div class="control">
                            <input
                                class="input"
                                type="password"
                                name="pwdNouveau2"
                                id="pwdNouveau2"
                                placeholder="**********"
                                required
                            />
                        </div>
                        <div class="field">
                            <div class="control">
                                <label for="" class="label"></label>
                                <button class="button is-primary-blue" on:click|preventDefault={slideMDP}>
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>