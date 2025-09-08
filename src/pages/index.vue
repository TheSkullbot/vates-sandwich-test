<template>
  <section>
    <h1>Suggestion du chef</h1>
    <div class="actions">
      <button @click="generate" :disabled="!canGenerate">
        Proposez moi un autre sandwich !
      </button>

      <button @click="save" :disabled="!current || !canGenerate">
        Enregistrer cette recette
      </button>
    </div>

    <div v-if="successMessage" class="success">
      {{ successMessage }}
    </div>

    <div v-if="!canGenerate" class="warning">
      Ajoutez au moins un élément dans chaque catégorie (pain, sauce, fromage, garniture) pour générer un sandwich.
    </div>

    <div v-if="current" class="preview">
      <SandwichCard :sandwich="previewSandwich" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useIngredientsStore } from "@/stores/ingredients";
import { useSandwichesStore } from "@/stores/sandwiches";
import SandwichCard from "@/components/SandwichCard.vue";
import type { Sandwich } from "@/types/sandwich";

const ingredients = useIngredientsStore();
const sandwiches  = useSandwichesStore();

type BareSandwich = Omit<Sandwich, "id" | "createdAt" | "name">
const current        = ref<BareSandwich | null>( null );
const successMessage = ref<string>( "" );

const canGenerate = computed( () =>
  ingredients.state.bread.length > 0 &&
  ingredients.state.sauce.length > 0 &&
  ingredients.state.cheese.length > 0 &&
  ingredients.state.filling.length > 0
);

function pick<T>( arr : T[] ) : T { return arr[Math.floor( Math.random() * arr.length )]; }

function generate()
{
  if( !canGenerate.value )
    return;

  current.value = {
    bread   : pick( ingredients.state.bread ),
    sauce   : pick( ingredients.state.sauce ),
    cheese  : pick( ingredients.state.cheese ),
    filling : pick( ingredients.state.filling )
  };
}

function save()
{
  if( !current.value )
    return;

  const s = current.value;

  const exists = sandwiches.sandwiches.some( ( x ) =>
    x.bread === s.bread &&
    x.sauce === s.sauce &&
    x.cheese === s.cheese &&
    x.filling === s.filling
  );

  if( exists && !confirm( "Un sandwich identique existe déjà. Voulez-vous l'enregistrer quand même ?" ) )
    return;

  sandwiches.save( s );
  successMessage.value = "Sandwich sauvegardé avec succès !";
}

const previewSandwich = computed<Sandwich>( () => ({
  id        : "preview",
  name      : "Sandwich du chef",
  bread     : current.value?.bread ?? "",
  sauce     : current.value?.sauce ?? "",
  cheese    : current.value?.cheese ?? "",
  filling   : current.value?.filling ?? "",
  createdAt : Date.now()
}) );

// Ensure a single initial generation on first mount, and do not re-trigger on route changes
onMounted( () => {
  if( canGenerate.value )
  {
    generate();
  }
} );
</script>

<style scoped>
section
{
  text-align : center;
}

.actions
{
  display         : flex;
  gap             : 8px;
  justify-content : center;
  margin-bottom   : 12px;
}

.success
{
  background    : #D4EDDA;
  border        : 1px solid #C3E6CB;
  color         : #155724;
  padding       : 8px;
  border-radius : 6px;
}

.warning
{
  background    : #FFF3CD;
  border        : 1px solid #FFEEBA;
  padding       : 8px;
  border-radius : 6px;
}

.preview
{
  margin-top   : 12px;
  text-align   : left;
  width        : fit-content;
  margin-left  : auto;
  margin-right : auto;
}
</style>
