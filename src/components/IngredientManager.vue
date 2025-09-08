<template>
  <div class="manager">
    <h3>{{ title }}</h3>

    <div class="add-row">
      <input v-model="newItem" @input="clearError" @keyup.enter="add" :placeholder="`Ajouter ${placeholderSingular}`" />
      <button @click="add">
        Ajouter
      </button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <ul v-if="list.length">
      <li v-for="item in list" :key="item">
        <button class="danger" @click="remove(item)">
          X
        </button>
        {{ item }}
      </li>
    </ul>

    <p v-else class="muted">
      Aucun élément
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useIngredientsStore } from "@/stores/ingredients";
import type { IngredientCategory } from "@/types/sandwich";

const props = defineProps<{
  category : IngredientCategory
  title : string
  placeholderSingular? : string
}>();

const ingredients  = useIngredientsStore();
const list         = computed( () => ingredients.state[props.category] );
const newItem      = ref( "" );
const errorMessage = ref<string | null>( null );

function clearError()
{
  errorMessage.value = null;
}

function add()
{
  const cleaned = newItem.value.trim();
  // Empty name
  if( !cleaned )
  {
    errorMessage.value = "Le nom de l’ingrédient ne peut pas être vide.";
    return;
  }

  // Duplicate (case-insensitive)
  const exists = list.value.some( ( i ) => i.toLowerCase() === cleaned.toLowerCase() );
  if( exists )
  {
    errorMessage.value = "Cet ingrédient existe déjà.";
    return;
  }

  ingredients.addIngredient( props.category, cleaned );
  newItem.value      = "";
  errorMessage.value = null;
}

function remove( name : string )
{
  ingredients.removeIngredient( props.category, name );
}
</script>

<style scoped>
.manager
{
  border        : 1px solid #DDDDDD;
  padding       : 12px;
  border-radius : 8px;
}

.add-row
{
  display       : flex;
  gap           : 8px;
  margin-bottom : 8px;
}

ul
{
  list-style : none;
  padding    : 0;
}

li
{
  display     : flex;
  align-items : center;
  gap         : 8px;
  padding     : 4px 0;
}

input
{
  flex         : 1;
  padding      : 8px;
  border       : 1px solid #CCCCCC;
  border-radius: 6px;
}

button
{
  cursor : pointer;
}

button.danger
{
  background : #FFE5E5;
  border     : 1px solid #FFB3B3;
  color      : darkred;
}

.muted
{
  color : #666666;
}

.error
{
  color  : #CC0000;
  margin : 4px 0 8px;
}
</style>
