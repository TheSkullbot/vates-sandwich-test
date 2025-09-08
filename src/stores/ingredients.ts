import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { STORAGE_KEYS, defaultIngredients, type IngredientCategory, type IngredientsState } from "@/types/sandwich";
import { readJSON, writeJSON } from "@/utils/storage";

export const useIngredientsStore = defineStore( "ingredients", () => {
  const loaded = readJSON<IngredientsState>( STORAGE_KEYS.INGREDIENTS, defaultIngredients );
  const state  = ref<IngredientsState>( JSON.parse( JSON.stringify( loaded ) ) );
  
  // Persist on change
  watch( state, ( val ) => writeJSON( STORAGE_KEYS.INGREDIENTS, val ), { deep : true } );
  
  const allIngredients = computed( () => {
    const set = new Set<string>( [
      ... state.value.bread,
      ... state.value.sauce,
      ... state.value.cheese,
      ... state.value.filling
    ] );
    return Array.from( set );
  } );
  
  function addIngredient( category : IngredientCategory, name : string )
  {
    const list    = state.value[category];
    const cleaned = name.trim();
    
    if( !cleaned )
      return;
    const exists = list.some( ( i ) => i.toLowerCase() === cleaned.toLowerCase() );
    
    if( !exists )
      list.push( cleaned );
  }
  
  function removeIngredient( category : IngredientCategory, name : string )
  {
    const list = state.value[category];
    const idx  = list.findIndex( ( i ) => i === name );
    
    if( idx !== -1 )
      list.splice( idx, 1 );
  }
  
  function resetToDefaults()
  {
    state.value = JSON.parse( JSON.stringify( defaultIngredients ) );
  }
  
  return {
    state,
    allIngredients,
    addIngredient,
    removeIngredient,
    resetToDefaults
  };
} );
