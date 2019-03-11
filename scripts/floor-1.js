import {
  categoryFilter,
  forWhoFilter,
  discountFilter
} from './filter-options.js';

const FLOOR = 1;

export default {
  areas: [{
      id: `${FLOOR}_1`,
      title: `KARI`,
      synonyms: [`кари`, `kari`],
      description: `Обувной магазин`,
      path: `M-284.7,179.1h-72.7v28 h-91.1l-0.2-95.2l163.7,0L-284.7,179.1z`,
      category: new Set([categoryFilter[`Обувь`]])
    },
    {
      id: `${FLOOR}_2`,
      title: `ZARA`,
      logoSrc: `zara.svg`,
      synonyms: [`zara`, `зара`],
      description: `Одежда для современных людей`,
      category: new Set([categoryFilter[`Одежда`]]),
      'for-who': new Set([forWhoFilter[`Мужская одежда`], forWhoFilter[`Женская одежда`]]),
      path: `M312.6,25.4l0.6,240.6 c-3,4.8-5.4,10.1-6.9,15.7H125.1V25.4H312.6z`,
    },
    {
      id: `${FLOOR}_3`,
      title: `Bershka`,
      logoSrc: `bershka.svg`,
      synonyms: [`bershka`, `бершка`],
      description: `Трендовая одежда, обувь и аксессуары`,
      path: `M486.6,256.3v25.1 h-62.4c-5.7-20.9-22.2-37.2-43.2-42.6l36.4-18v-33.7v-33.6v-0.1v-128h69.1V256.3z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: `${FLOOR}_4`,
      title: `H&M`,
      logoSrc: `h&m.svg`,
      synonyms: [`h&m`, `hm`, `ейч эм`],
      description: `Модная одежда для женщин, мужчин, подростков и детей`,
      path: `M-284.5,179.6v28.9v173 h-163.4l-0.5-173.8h91.7l0-28.1H-284.5z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: `${FLOOR}_5`,
      title: `Лента`,
      logoSrc: `lenta.svg`,
      synonyms: [`Лента`, `lenta`],
      description: `Гипермаркет`,
      path: `M782.7,25.4h317.1 v510.1H782.7v-25.6v-24.9V25.4z`,
      category: new Set([categoryFilter[`Продукты питания`]])
    },
    {
      id: `${FLOOR}_50`,
      title: `TELE2`,
      logoSrc: `tele2.svg`,
      synonyms: [`tele2`, `теле2`],
      description: `Оператор сотовой связи`,
      path: `M690.5,431.4 712.9,431.4 712.9,453.7 690.5,453.7z`,
      category: new Set([categoryFilter[`Сотовая связь`], categoryFilter[`Бытовая техника и электроника`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: `${FLOOR}_51`,
      title: `Снежная королева`,
      logoSrc: `snowqueen.svg`,
      synonyms: [`снежная королева`, `снежная`],
      description: `Верхняя одежда `,
      path: `M125.1,281.8 l-67.5,0v-52l-57.5,0V25.4h125V281.8z`,
      category: new Set([categoryFilter[`Одежда`]]),
      discount: new Set([discountFilter[`До 30%`]])
    }
  ],
  markers: [{
      symbolId: `foodcourt`,
      points: [{
        title: `Фудкорт`,
        position: [145.5, 300]
      }]
    },
    {
      symbolId: `parking`,
      points: [{
        title: `Парковка`,
        position: [187.5, 300]
      }]
    },
    {
      symbolId: `elevator`,
      points: [{
        title: `Лифт`,
        position: [229.5, 300]
      }]
    },
    {
      symbolId: `escalator`,
      points: [{
        title: `Эскалатор`,
        position: [271.5, 300]
      }]
    },
    {
      symbolId: `wardrobe`,
      points: [{
        title: `Гардероб`,
        position: [313.5, 300]
      }]
    },
    {
      symbolId: `wc`,
      points: [{
        title: `Туалет`,
        position: [355.5, 300]
      }]
    },
    {
      symbolId: `entrance-vertical`,
      points: [{
        title: `Вход`,
        position: [397.5, 300]
      }]
    },
    {
      symbolId: `entrance-horizontal`,
      points: [{
        title: `Вход`,
        position: [439.5, 300]
      }]
    },
    {
      symbolId: `entrance-diagonal`,
      points: [{
        title: `Вход`,
        position: [481.5, 300]
      }]
    },
    {
      symbolId: `entrance-diagonal-back`,
      points: [{
        title: `Вход`,
        position: [523.5, 300]
      }]
    },
    {
      symbolId: `cafe`,
      points: [{
        title: `Кафе`,
        position: [565.5, 300]
      }]
    },
    {
      symbolId: `atm`,
      points: [{
        title: `Банкомат`,
        position: [607.5, 300]
      }]
    },
    {
      symbolId: `fountain`,
      points: [{
        title: `Фонтан`,
        position: [649.5, 300],
        size: 64
      }]
    },
  ]
};
