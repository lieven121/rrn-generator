<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  adjustCounterToSex,
  formatRrn,
  generateRrn,
  isValidIsoDate,
  MAX_COUNTER,
  MIN_COUNTER,
  randomCounter,
  toIsoDate,
  type Sex,
} from "../lib/rrn.ts";
import { useI18n } from "../i18n/useI18n.ts";
import CopyButton from "./CopyButton.vue";

const { m, interpolate } = useI18n();

const today = toIsoDate(new Date());
const birthDate = ref("1990-01-01");
const sex = ref<Sex>("M");
const counter = ref(1);
const notice = ref("");

function normalizeCounter() {
  const adjusted = adjustCounterToSex(Number(counter.value), sex.value);
  notice.value = adjusted !== Number(counter.value) ? interpolate(m.custom.parityAdjusted, { counter: adjusted }) : "";
  counter.value = adjusted;
}

watch(sex, normalizeCounter);

function rollCounter() {
  counter.value = randomCounter(sex.value);
  notice.value = "";
}

const rrn = computed(() => {
  const c = Number(counter.value);
  if (!isValidIsoDate(birthDate.value) || birthDate.value > today) return "";
  if (!Number.isInteger(c) || c < MIN_COUNTER || c > MAX_COUNTER) return "";
  return formatRrn(generateRrn({ birthDate: birthDate.value, counter: c }));
});
</script>

<template>
  <section class="card" aria-labelledby="custom-title">
    <h2 id="custom-title">{{ m.custom.title }}</h2>
    <p class="muted">{{ m.custom.desc }}</p>

    <div class="field">
      <label for="birth-date">{{ m.custom.birthDate }}</label>
      <input id="birth-date" v-model="birthDate" type="date" min="1900-01-01" :max="today" required />
    </div>

    <div class="field">
      <span class="label" id="sex-label">{{ m.custom.sex }}</span>
      <div class="segmented" role="radiogroup" aria-labelledby="sex-label">
        <button
          v-for="s in ['M', 'F'] as const"
          :key="s"
          type="button"
          role="radio"
          :aria-checked="sex === s"
          @click="sex = s"
        >
          {{ m.sex[s] }}
        </button>
      </div>
    </div>

    <div class="field">
      <label for="counter">{{ m.custom.counter }}</label>
      <div class="input-row">
        <input
          id="counter"
          v-model.number="counter"
          type="number"
          inputmode="numeric"
          :min="MIN_COUNTER"
          :max="MAX_COUNTER"
          step="1"
          aria-describedby="counter-hint"
          @change="normalizeCounter"
        />
        <button type="button" class="btn" @click="rollCounter">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2" />
            <circle cx="9" cy="9" r="1.4" fill="currentColor" /><circle cx="15" cy="15" r="1.4" fill="currentColor" />
            <circle cx="15" cy="9" r="1.4" fill="currentColor" /><circle cx="9" cy="15" r="1.4" fill="currentColor" />
          </svg>
          <span>{{ m.custom.randomCounter }}</span>
        </button>
      </div>
      <small id="counter-hint" class="muted">{{ m.custom.counterHint }}</small>
      <small v-if="notice" class="notice" role="status">{{ notice }}</small>
    </div>

    <output class="result" aria-live="polite">{{ rrn || "—" }}</output>
    <p v-if="!rrn" class="error">{{ m.custom.invalidDate }}</p>
    <div class="actions">
      <CopyButton v-if="rrn" :text="rrn" />
      <CopyButton v-if="rrn" :text="rrn.replace(/\D/g, '')" :label="m.random.raw" />
    </div>
  </section>
</template>
