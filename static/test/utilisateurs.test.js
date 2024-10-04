import { expect, test } from 'vitest';
import { newUser } from '../../src/lib/db/controllers/Utilisateurs.controller';

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3)
// })
// export async function newUser(p_nom,p_prenom, p_role_id, p_entreprise, p_neq, p_courriel, p_pwd, p_site, p_insta, p_tiktok, p_domaine,
//     p_ville_id, p_partage, p_affichage, p_abonne, p_fin_abo, p_description, p_adresse, p_publique,
//     p_photo_1, p_photo_2, p_photo_3, p_logo)

test('Creation d\'un utilisateur', async () => {
    expect(await newUser('Bob', 'Bob', '1', 'Bob','Bob','Bob','Bob','Bob','Bob','Bob','Bob', '1', 1, 1, 1, null, 'Bob','Bob',1,'Bob','Bob','Bob','Bob', )).toBe();
})