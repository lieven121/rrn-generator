<script setup lang="ts">
import { computed, ref } from "vue";
import { validateRrn } from "../lib/rrn.ts";
import { useI18n } from "../i18n/useI18n.ts";

const { m } = useI18n();
const input = ref("");
const info = computed(() => (input.value.trim() ? validateRrn(input.value) : null));
</script>

<template>
  <section class="card" aria-labelledby="validator-title">
    <h2 id="validator-title">{{ m.validator.title }}</h2>
    <p class="muted">{{ m.validator.desc }}</p>

    <div class="field">
      <label for="validate-input" class="sr-only">{{ m.validator.title }}</label>
      <input
        id="validate-input"
        v-model="input"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        spellcheck="false"
        class="mono"
        :placeholder="m.validator.placeholder"
      />
    </div>

    <div v-if="info" class="verdict" :class="info.valid ? 'ok' : 'bad'" role="status">
      <strong>{{ info.valid ? m.validator.valid : m.validator.invalid }}</strong>
      <p v-if="!info.valid && info.reason">{{ m.validator.reasons[info.reason] }}</p>
      <dl v-if="info.valid">
        <dt>{{ m.validator.birthDate }}</dt>
        <dd>{{ info.birthDate ?? m.validator.unknown }}</dd>
        <dt>{{ m.validator.sex }}</dt>
        <dd>{{ info.sex ? m.sex[info.sex] : m.validator.unknown }}</dd>
        <dt>{{ m.validator.counter }}</dt>
        <dd>{{ String(info.counter).padStart(3, "0") }}</dd>
        <template v-if="info.isBis">
          <dt>{{ m.validator.bis }}</dt>
          <dd>✓</dd>
        </template>
      </dl>
    </div>
  </section>
</template>
