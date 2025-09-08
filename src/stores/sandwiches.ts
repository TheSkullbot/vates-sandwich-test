import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Sandwich } from "@/types/sandwich";
import { STORAGE_KEYS } from "@/types/sandwich";
import { readJSON, writeJSON } from "@/utils/storage";

export const useSandwichesStore = defineStore( "sandwiches", () => {
  const sandwiches = ref<Sandwich[]>( readJSON<Sandwich[]>( STORAGE_KEYS.SANDWICHES, [] ) );
  
  watch( sandwiches, ( val ) => writeJSON( STORAGE_KEYS.SANDWICHES, val ), { deep : true } );
  
  function save( s : Omit<Sandwich, "id" | "createdAt"> )
  {
    const now = Date.now();
    sandwiches.value.unshift( { ... s, id : String( now ), createdAt : now } );
  }
  
  function remove( id : string )
  {
    const idx = sandwiches.value.findIndex( ( s ) => s.id === id );
    
    if( idx !== -1 )
      sandwiches.value.splice( idx, 1 );
  }
  
  function clear()
  {
    sandwiches.value = [];
  }
  
  return {
    sandwiches,
    save,
    remove,
    clear
  };
} );
