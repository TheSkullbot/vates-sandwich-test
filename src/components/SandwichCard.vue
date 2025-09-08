<template>
  <div class="card">
    <h3>
      {{ sandwich.name || "Sandwich" }}
      <slot name="actions" />
    </h3>

    <ul>
      <li>
        <strong>Pain :</strong> {{ sandwich.bread }}
      </li>
      <li>
        <strong>Garniture :</strong> {{ sandwich.filling }}
      </li>
      <li>
        <strong>Fromage :</strong> {{ sandwich.cheese }}
      </li>
      <li>
        <strong>Sauce :</strong> {{ sandwich.sauce }}
      </li>
    </ul>

    <small v-if="sandwich.createdAt">
      Créé le : {{ new Date( sandwich.createdAt ).toLocaleString() }}
    </small>
  </div>
</template>

<script setup lang="ts">
import type { Sandwich } from "@/types/sandwich";

defineProps<{ sandwich : Sandwich }>();
</script>

<style scoped>
.card
{
  border        : 1px solid #DDDDDD;
  padding       : 12px;
  border-radius : 8px;
  background    : #FFFFFF;
}

h3
{
  display         : flex;
  justify-content : space-between;
  align-items     : center;
  margin          : 0 0 12px 0;
}

ul
{
  margin       : 0 0 8px 0;
  padding-left : 24px;
}
</style>
