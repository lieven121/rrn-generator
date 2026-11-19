<script setup lang="ts">
import { computed, ref } from "vue";
import { formatRrn, randomRrn, type RandomRrn } from "../lib/rrn.ts";
import { useI18n } from "../i18n/useI18n.ts";
import CopyButton from "./CopyButton.vue";

const { m } = useI18n();
const current = ref<RandomRrn>(randomRrn());
const formatted = ref(true);
const display = computed(() => (formatted.value ? formatRrn(current.value.rrn) : current.value.rrn));

function generate() {
  current.value = randomRrn();
}
</script>

<template>
  <section class="card" aria-labelledby="random-title">
    <h2 id="random-title">{{ m.random.title }}</h2>
    <p class="muted">{{ m.random.desc }}</p>

    <output class="result" aria-live="polite">{{ display }}</output>
    <p class="meta">
      {{ current.birthDate }} · {{ m.sex[current.sex] }} · #{{ String(current.counter).padStart(3, "0") }}
    </p>

    <div class="segmented" role="group">
      <button type="button" :aria-pressed="formatted" @click="formatted = true">{{ m.random.formatted }}</button>
      <button type="button" :aria-pressed="!formatted" @click="formatted = false">{{ m.random.raw }}</button>
    </div>

    <div class="actions">
      <button type="button" class="btn btn-primary" @click="generate">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ m.random.generate }}
      </button>
      <CopyButton :text="display" />
    </div>
  </section>
</template>
