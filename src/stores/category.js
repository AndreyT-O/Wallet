import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const category = ref([
    {
        text: 'Основные расходы',
        key: 'basic',
        color: '#FED057',
        count: 4000
    },
    {
        text: 'Продукты',
        key: 'products',
        color: '#FFD8D0',
        count: 1200
    },
    {
        text: 'Машина',
        key: 'car',
        color: '#FD9498',
        count: 1200
    },
    {
        text: 'Забота о себе',
        key: 'self-care',
        color: '#C5BAFF',
        count: 1200
    },
    {
        text: 'Забота о детях',
        key: 'child-care',
        color: '#6E78E8',
        count: 1200
    },
    {
        text: 'Товары для дома',
        key: 'household-products',
        color: '#4A56E2',
        count: 1200
    },
    {
        text: 'Образование',
        key: 'education',
        color: '#81E1FF',
        count: 1200
    }, {
        text: 'Досуг',
        key: 'Leisure',
        color: '#24CCA7',
        count: 1200
    },
    {
        text: 'Другие расходы',
        key: 'other-expenses',
        color: '#00AD84',
        count: 1200
    },
]),
total = ref(13600);

  return { category, total };
})
