<template>
  <section>
    <h1>Sandwichs sauvegardés</h1>

    <div class="toolbar">
      <label>
        Filtrer par ingrédient :
        <select v-model="selected">
          <option value="">Tous</option>
          <option v-for="opt in ingredientOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </label>
      <button class="danger" @click="clearAll" :disabled="!sandwiches.sandwiches.length">
        Tout supprimer
      </button>
    </div>

    <p v-if="!filtered.length" class="muted">
      Vous n'avez pas encore de recettes dans votre sandwichothèque.
    </p>

    <div class="grid">
      <div v-for="s in filtered" :key="s.id">
        <SandwichCard :sandwich="s">
          <template #actions>
            <div class="actions">
              <button class="danger" @click="remove(s.id)">
                X
              </button>
            </div>
          </template>
        </SandwichCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSandwichesStore } from "@/stores/sandwiches";
import { useIngredientsStore } from "@/stores/ingredients";
import SandwichCard from "@/components/SandwichCard.vue";

const sandwiches  = useSandwichesStore();
const ingredients = useIngredientsStore();

const selected          = ref( "" );
const ingredientOptions = computed( () => ingredients.allIngredients );

const filtered = computed( () => {
  if( !selected.value )
    return sandwiches.sandwiches;

  return sandwiches.sandwiches.filter( ( s ) =>
    s.bread === selected.value ||
    s.sauce === selected.value ||
    s.cheese === selected.value ||
    s.filling === selected.value
  );
} );

function remove( id : string )
{
  sandwiches.remove( id );
}

function clearAll()
{
  if( confirm( "Supprimer tous les sandwichs sauvegardés ?" ) )
    sandwiches.clear();
}
</script>

<style scoped>
.toolbar
{
  display       : flex;
  gap           : 12px;
  align-items   : center;
  margin-bottom : 12px;
}

.grid
{
  display               : grid;
  grid-template-columns : repeat(auto-fill, minmax(280px, 1fr));
  gap                   : 12px;
}

.muted
{
  color : #666666;
}

button.danger
{
  background : #FFE5E5;
  border     : 1px solid #FFB3B3;
  color      : darkred;
}
</style>
