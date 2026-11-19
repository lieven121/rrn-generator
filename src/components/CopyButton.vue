<script setup lang="ts">
import { ref } from "vue";
import { copyText } from "../composables/useClipboard.ts";
import { useI18n } from "../i18n/useI18n.ts";

const props = defineProps<{ text: string; label?: string; iconOnly?: boolean }>();
const { m } = useI18n();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function onClick() {
  if (!(await copyText(props.text))) return;
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="{ 'btn-icon': iconOnly, 'is-copied': copied }"
    :aria-label="iconOnly ? (label ?? m.copy.copy) : undefined"
    :title="label ?? m.copy.copy"
    @click="onClick"
  >
    <svg v-if="!copied" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span v-if="!iconOnly">{{ copied ? m.copy.copied : (label ?? m.copy.copy) }}</span>
    <span v-else class="sr-only" aria-live="polite">{{ copied ? m.copy.copied : "" }}</span>
  </button>
</template>
