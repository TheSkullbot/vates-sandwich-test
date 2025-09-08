<template>
  <section>
    <h1>
      Gestion des ingrédients
    </h1>

    <p class="muted">
      Gérez les ingrédients disponibles pour la confection des sandwichs.
    </p>

    <div class="grid">
      <IngredientManager category="bread" title="Pains" placeholderSingular="un pain" />
      <IngredientManager category="filling" title="Garnitures" placeholderSingular="une garniture" />
      <IngredientManager category="cheese" title="Fromages" placeholderSingular="un fromage" />
      <IngredientManager category="sauce" title="Sauces" placeholderSingular="une sauce" />
    </div>

    <div class="footer">
      <button @click="reset">
        Réinitialiser aux valeurs par défaut
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import IngredientManager from "@/components/IngredientManager.vue";
import { useIngredientsStore } from "@/stores/ingredients";

const ingredients = useIngredientsStore();

function reset()
{
  if( confirm( "Réinitialiser tous les ingrédients aux valeurs par défaut ?" ) )
  {
    ingredients.resetToDefaults();
  }
}
</script>

<style scoped>
.grid
{
  display               : grid;
  grid-template-columns : repeat(auto-fit, minmax(260px, 1fr));
  gap                   : 12px;
  margin-top            : 12px;
}

.footer
{
  margin-top : 16px;
}

.muted
{
  color : #666666;
}
</style>
