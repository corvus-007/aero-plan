import {
  categoryFilter,
  forWhoFilter,
  discountFilter
} from './filter-options.js';

export default {
  settings: {
    dimensions: {
      width: 2381.7,
      height: 778.6
    },
    boundaryShape: `M847.5,778.6a140.6,140.6,0,0,1-37-4.8c-33.9-9.3-61.7-31.8-78.2-63.4-14.3-27.4-18.6-59.7-11.7-88.6,7.3-31,27-56.5,55.3-71.8V505H594.5l.3,60H519.4v16.9H395.7V564.9H313.2V504.7H0V0H1352.9V93.7l1028.8-.2V742.1H1974c-41.1,22.1-82.9,33.3-124,33.3h-.3c-41.1,0-82.7-11.3-123.7-33.4l-745.4-.2c-2.3.5-27.4,6.6-34.7,10.3C911.4,769.6,878.1,778.6,847.5,778.6Z`
  },
  areas: [
    {
      id: 10,
      title: `OBI`,
      logoSrc: `obi.svg`,
      synonyms: [`OBI`, `оби`],
      description: `Строительный гипермаркет`,
      path: `M832.6,12.2l-.2,480-251.4.4v58.3H504.4v15.9H409.3V551H327.1V492.7l-315.2-.4.5-480H832.6Z`,
      category: new Set([categoryFilter[`Товары для дома`]])
    },
    {
      id: 11,
      title: `Технопарк`,
      logoSrc: `technopark.svg`,
      synonyms: [`Технопарк`],
      description: `Бытовая техника и электроника`,
      path: `M1572.9,373.3l-155.2.2V323.4h-68.3V103l223.5.5`,
      category: new Set([categoryFilter[`Бытовая техника и электроника`]])
    },
    {
      id: 12,
      title: `Дочки-Сыночки`,
      logoSrc: `dochkisinochki.svg`,
      synonyms: [`Дочки-Сыночки`, `Дочки Сыночки`, `Дочки`, `Сыночки`],
      description: `Товары для детей`,
      path: `M2170.7,102.3V416.7h-.4v44.9h203.5V102.3Z`,
      category: new Set([categoryFilter[`Детские товары`]]),
      'for-who': new Set([forWhoFilter[`Товары для детей`]])
    },
    {
      id: 13,
      title: `OSTIN`,
      logoSrc: `ostin.svg`,
      synonyms: [`OSTIN`, `остин`],
      description: `Женская и мужская одежда`,
      path: `M1351.4,470h128.4v12.8H1530V586.7h-54.7v33.1H1351.4Z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: 14,
      title: `KRUTOYS`,
      synonyms: [`KRUTOYS`, `крутойс`, `крутой`, 'крутойз'],
      description: `Товары для детей`,
      path: `M2156.4,459.6h-18.1V427.9h18.1Z`,
      category: new Set([categoryFilter[`Детские товары`]]),
      'for-who': new Set([forWhoFilter[`Товары для детей`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 15,
      title: `М.Видео`,
      logoSrc: `mvideo.svg`,
      synonyms: [`М.Видео`, `МВидео`, `М Видео`, `mvideo`],
      description: `Магазин бытовой техники и электроники`,
      path: `M1338.6,12.7l-1.2,226.8H1179.2V257h-129V12.7Z`,
      category: new Set([categoryFilter[`Бытовая техника и электроника`]])
    }
  ],
  helpMarkers: [{
      symbolId: `elevator`,
      points: [{
          title: `Лифт`,
          position: [746.5, 75.5]
        },
        {
          title: `Лифт`,
          position: [446.5, 75.5]
        }
      ]
    },
    {
      symbolId: `foodcourt`,
      points: [{
        title: `Фудкорт`,
        position: [2226, 633]
      }]
    }
  ]
};
