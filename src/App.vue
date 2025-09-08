<template>
  <div>
    <nav class="nav">
      <RouterLink to="/" class="brand">
        <span class="brand-left">DOM</span><span class="brand-right">WAY</span>
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/saved">
          Sandwichs sauvegardés
        </RouterLink>

        <RouterLink to="/admin">
          Gestion des ingrédients
        </RouterLink>
      </div>

      <button
        class="burger"
        aria-label="Ouvrir le menu"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        @click="toggleMenu"
      >
        <span>☰</span>
      </button>
    </nav>

    <div v-if="isMenuOpen" class="mobile-menu">
      <RouterLink to="/saved" @click="closeMenu">Sandwichs sauvegardés</RouterLink>
      <RouterLink to="/admin" @click="closeMenu">Gestion des ingrédients</RouterLink>
    </div>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref( false );
const route      = useRoute();

function toggleMenu()
{
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu()
{
  isMenuOpen.value = false;
}

watch( () => route.fullPath, () => {
  isMenuOpen.value = false;
} );
</script>

<style>
:root
{
  --domway-green      : #00543D;
  --domway-green-dark : #004534;
  --domway-yellow     : #FFC20E;
  --domway-bg         : #FAFAFA;
  --domway-text       : #222222;
}

html, body
{
  margin      : 0;
  padding     : 0;
  background  : var(--domway-bg);
  color       : var(--domway-text);
  font-family : BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.nav
{
  display         : flex;
  gap             : 24px;
  padding         : 12px 16px;
  background      : #FFFFFF;
  border-bottom   : 3px solid var(--domway-green);
  font-weight     : bold;
  font-size       : 18px;
  justify-content : center;
  position        : relative;
}

.nav a
{
  text-decoration : none;
  color           : var(--domway-green);
}

.nav a:hover
{
  color : var(--domway-yellow);
}

.nav a.router-link-exact-active
{
  text-decoration : underline;
}

h1, h2, h3
{
  margin-top : 0;
}

.brand
{
  letter-spacing : 0.5px;
  font-weight    : 900;
  text-transform : uppercase;
}

.brand-left
{
  color : var(--domway-green);
}

.brand-right
{
  color : var(--domway-yellow);
}

.container
{
  padding : 16px;
}

button
{
  background    : var(--domway-green);
  color         : #FFFFFF;
  border        : 1px solid var(--domway-green);
  padding       : 8px 12px;
  border-radius : 6px;
  font-weight   : 600;
  cursor        : pointer;
}

button:hover:not(:disabled)
{
  background   : var(--domway-green-dark);
  border-color : var(--domway-green-dark);
}

button:disabled
{
  opacity : 0.6;
  cursor  : not-allowed;
}

.nav-links
{
  display : flex;
  gap     : 24px;
}

.burger
{
  display         : none;
  align-items     : center;
  justify-content : center;
  width           : 40px;
  height          : 40px;
  font-size       : 24px;
  background      : transparent;
  border          : none;
  color           : var(--domway-green);
}

.burger:hover
{
  background : transparent;
  border     : none;
  color      : var(--domway-yellow);
}

.mobile-menu
{
  display : none;
}

@media (max-width : 767px)
{
  .nav-links
  {
    display : none;
  }

  .burger
  {
    display   : inline-flex;
    position  : absolute;
    right     : 8px;
    top       : 50%;
    transform : translateY(-50%);
  }

  .burger > span
  {
    position : relative;
    top      : -2px;
  }

  .mobile-menu
  {
    display        : flex;
    flex-direction : column;
    gap            : 12px;
    background     : #FFFFFF;
    border-bottom  : 3px solid var(--domway-green);
    padding        : 12px 16px;
  }

  .mobile-menu a
  {
    text-decoration : none;
    color           : var(--domway-green);
    font-weight     : bold;
    font-size       : 18px;
  }

  .mobile-menu a:hover
  {
    color : var(--domway-yellow);
  }
}
</style>
