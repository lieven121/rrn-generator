<script setup lang="ts">
import { computed, ref } from "vue";
import { fakePersons, toCsv, type FakePerson } from "../lib/fakePerson.ts";
import { formatRrn } from "../lib/rrn.ts";
import { downloadText } from "../composables/useClipboard.ts";
import { useI18n } from "../i18n/useI18n.ts";
import CopyButton from "./CopyButton.vue";

const { m } = useI18n();
const counts = [5, 10, 25, 50, 100];
const count = ref(10);
const people = ref<FakePerson[]>(fakePersons(count.value));

const csv = computed(() => toCsv(people.value));
const json = computed(() => JSON.stringify(people.value, null, 2));

function generate() {
  people.value = fakePersons(count.value);
}
</script>

<template>
  <section class="card card-wide" aria-labelledby="persons-title">
    <h2 id="persons-title">{{ m.persons.title }}</h2>
    <p class="muted">{{ m.persons.desc }}</p>

    <div class="toolbar">
      <div class="field field-inline">
        <label for="person-count">{{ m.persons.count }}</label>
        <select id="person-count" v-model.number="count" @change="generate">
          <option v-for="c in counts" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary" @click="generate">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ m.persons.generate }}
      </button>
      <div class="toolbar-end">
        <CopyButton :text="csv" :label="m.persons.copyCsv" />
        <CopyButton :text="json" :label="m.persons.copyJson" />
        <button type="button" class="btn" @click="downloadText('fake-persons.csv', csv)">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ m.persons.download }}
        </button>
      </div>
    </div>

    <div class="table-wrap">
      <table class="persons">
        <thead>
          <tr>
            <th scope="col">{{ m.persons.cols.rrn }}</th>
            <th scope="col">{{ m.persons.cols.name }}</th>
            <th scope="col">{{ m.persons.cols.email }}</th>
            <th scope="col">{{ m.persons.cols.birthDate }}</th>
            <th scope="col">{{ m.persons.cols.sex }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in people" :key="p.rrn">
            <td :data-label="m.persons.cols.rrn" class="mono">
              <span>{{ formatRrn(p.rrn) }}</span>
              <CopyButton :text="p.rrn" icon-only />
            </td>
            <td :data-label="m.persons.cols.name">{{ p.firstName }} {{ p.lastName }}</td>
            <td :data-label="m.persons.cols.email" class="email">
              <span>{{ p.email }}</span>
              <CopyButton :text="p.email" icon-only />
            </td>
            <td :data-label="m.persons.cols.birthDate">{{ p.birthDate }}</td>
            <td :data-label="m.persons.cols.sex">{{ m.sex[p.sex] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
