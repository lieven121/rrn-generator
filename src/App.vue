<script setup lang="ts">
import CustomRrnCard from "./components/CustomRrnCard.vue";
import LanguageSwitcher from "./components/LanguageSwitcher.vue";
import PersonList from "./components/PersonList.vue";
import RandomRrnCard from "./components/RandomRrnCard.vue";
import ValidatorCard from "./components/ValidatorCard.vue";
import { useI18n } from "./i18n/useI18n.ts";

const { m } = useI18n();
const base = import.meta.env.BASE_URL;
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" :href="base">
        <img :src="base + 'favicon.svg'" width="28" height="28" alt="" />
        <span>{{ m.appName }}</span>
      </a>
      <LanguageSwitcher />
    </div>
  </header>

  <main class="container">
    <div class="hero">
      <h1>{{ m.h1 }}</h1>
      <p>{{ m.intro }}</p>
    </div>

    <div class="grid">
      <RandomRrnCard />
      <CustomRrnCard />
      <PersonList />
      <ValidatorCard />

      <section class="card prose" aria-labelledby="about-title">
        <h2 id="about-title">{{ m.about.title }}</h2>
        <p v-for="(para, i) in m.about.body" :key="i">{{ para }}</p>
        <p class="format mono" aria-hidden="true">
          <span class="seg seg-date">YY.MM.DD</span>-<span class="seg seg-counter">CCC</span>.<span
            class="seg seg-check"
            >KK</span
          >
        </p>
      </section>

      <section class="card card-wide prose" aria-labelledby="faq-title">
        <h2 id="faq-title">{{ m.faqTitle }}</h2>
        <details v-for="item in m.faq" :key="item.q">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      </section>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>{{ m.footer.disclaimer }}</p>
    </div>
  </footer>
</template>
