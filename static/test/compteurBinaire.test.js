//tests générés par IA

import { describe, it, expect } from 'vitest';
import { envoieMappage, recupMappage } from '../../src/lib/outils/compteurBinaire';


describe('Tests pour la fonction recupMappage', () => {
  it('doit retourner un tableau vide si aucun bit n\'est défini', () => {
    const p_nombre = 0; // Aucun bit
    const p_constante = {
      cle1: 1,
      cle2: 2,
      cle3: 4,
    };

    const resultat = recupMappage(p_nombre, p_constante);
    expect(resultat).toEqual([]); // Attendre un tableau vide
  });

  it('doit retourner la cle correspondant au bit défini', () => {
    const p_nombre = 2; // Seul le bit 2 est défini
    const p_constante = {
      cle1: 1,
      cle2: 2,
      cle3: 4,
    };

    const resultat = recupMappage(p_nombre, p_constante);
    expect(resultat).toEqual(['cle2']); // Attendre la cle2
  });

  it('doit retourner plusieurs cles si plusieurs bits sont définis', () => {
    const p_nombre = 5; // Bits 1 et 4 sont définis
    const p_constante = {
      cle1: 1,
      cle2: 2,
      cle3: 4,
    };

    const resultat = recupMappage(p_nombre, p_constante);
    expect(resultat).toEqual(['cle1', 'cle3']); // Attendre cle1 et cle3
  });

  it('doit retourner un tableau avec des cles dans l\'ordre des constantes', () => {
    const p_nombre = 6; // Bits 2 et 4 sont définis
    const p_constante = {
      cle1: 1,
      cle2: 2,
      cle3: 4,
    };

    const resultat = recupMappage(p_nombre, p_constante);
    expect(resultat).toEqual(['cle2', 'cle3']); // Attendre cle2 et cle3
  });
});


describe('Tests pour la fonction envoieMappage', () => {
    it('doit retourner 0 si aucune clé n\'est présente dans p_data', () => {
      const p_data = new FormData();
      const p_constante = {
        cle1: 1,
        cle2: 2,
        cle3: 4,
      };
  
      const resultat = envoieMappage(p_data, p_constante);
      expect(resultat).toBe(0); // Attendre 0
    });
  
    it('doit retourner la valeur correspondante si une clé est présente', () => {
      const p_data = new FormData();
      p_data.append('cle1', 'true'); // Simule que cle1 est sélectionnée
      const p_constante = {
        cle1: 1,
        cle2: 2,
        cle3: 4,
      };
  
      const resultat = envoieMappage(p_data, p_constante);
      expect(resultat).toBe(1); // Attendre 1 (valeur de cle1)
    });
  
    it('doit retourner la somme des valeurs pour plusieurs clés présentes', () => {
      const p_data = new FormData();
      p_data.append('cle1', 'true'); // Simule que cle1 est sélectionnée
      p_data.append('cle3', 'true'); // Simule que cle3 est sélectionnée
      const p_constante = {
        cle1: 1,
        cle2: 2,
        cle3: 4,
      };
  
      const resultat = envoieMappage(p_data, p_constante);
      expect(resultat).toBe(5); // 1 (cle1) + 4 (cle3) = 5
    });
  
    it('doit retourner la somme des valeurs pour plusieurs clés avec des valeurs multiples', () => {
      const p_data = new FormData();
      p_data.append('cle1', 'true'); // Simule que cle1 est sélectionnée
      p_data.append('cle2', 'true'); // Simule que cle2 est sélectionnée
      p_data.append('cle3', 'true'); // Simule que cle3 est sélectionnée
      const p_constante = {
        cle1: 1,
        cle2: 2,
        cle3: 4,
      };
  
      const resultat = envoieMappage(p_data, p_constante);
      expect(resultat).toBe(7); // 1 + 2 + 4 = 7
    });
  });