<script setup lang="ts">
import { languages } from "../i18n/index.ts";
import { useI18n } from "../i18n/useI18n.ts";

const { lang } = useI18n();
const base = import.meta.env.BASE_URL;
</script>

<template>
  <nav class="lang-switch" aria-label="Language">
    <a
      v-for="l in languages"
      :key="l.code"
      :href="base + l.path"
      :hreflang="l.code"
      :lang="l.code"
      :aria-current="l.code === lang ? 'page' : undefined"
      :class="{ active: l.code === lang }"
      >{{ l.label }}</a
    >
  </nav>
</template>
