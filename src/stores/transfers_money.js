import { defineStore } from 'pinia'

export const useTransfersMoney = defineStore('transfers-money', () => {

    const transfersMoney = [
        {
            'date': '04.01.19',
            'type': '-',
            'category': 'Разное',
            'comment': 'Подарок',
            'amount': '300.00',
            'balance': '4500.00'
        },
        {
            'date': '05.10.21',
            'type': '+',
            'category': 'Регулярний дохід',
            'comment': 'Бонус',
            'amount': '5500.00',
            'balance': '11000.00'
        }
    ]

  return { transfersMoney }
})
