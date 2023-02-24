import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', () => {


    const courses = {
        'usd': {
            'buy': '27.55',
            'sell': '27.65'
        },
        'eur': {
            'buy': '30.00',
            'sell': '30.10'
        },
        'rub': {
            'buy': '00.00',
            'sell': '00.00'
        }
    }

  return { courses }
})
