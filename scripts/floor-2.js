import {
  categoryFilter,
  forWhoFilter,
  discountFilter
} from './filter-options.js';

const FLOOR = 2;

export default {
  areas: [{
      id: `${FLOOR}_6`,
      title: `OBI`,
      logoSrc: `obi.svg`,
      synonyms: [`OBI`, `оби`],
      description: `Строительный гипермаркет`,
      path: `M-496.4-49.1l-0.2,480 l-251.4,0.4v58.3l-76.6,0v15.9l-95.1,0l0.1-15.8l-82.3,0v-58.3l-315.2-0.4l0.5-480H-496.4z`,
      category: new Set([categoryFilter[`Товары для дома`]])
    },
    {
      id: `${FLOOR}_7`,
      title: `Технопарк`,
      logoSrc: `technopark.svg`,
      synonyms: [`Технопарк`],
      description: `Бытовая техника и электроника`,
      path: `M243.9226074,311.9947815 l-155.2497711,0.1965637v-50.125l-68.294281,0.138031V41.687439l223.5440521,0.4740143`,
      category: new Set([categoryFilter[`Бытовая техника и электроника`]])
    },
    {
      id: `${FLOOR}_8`,
      title: `Дочки-Сыночки`,
      logoSrc: `dochkisinochki.svg`,
      synonyms: [`Дочки-Сыночки`, `Дочки Сыночки`, `Дочки`, `Сыночки`],
      description: `Товары для детей`,
      path: `M841.69,41.02 841.69,312.54 841.69,355.45 841.32,355.45 841.32,400.29 1044.79,400.29 1044.79,41.02 z`,
      category: new Set([categoryFilter[`Детские товары`]]),
      'for-who': new Set([forWhoFilter[`Товары для детей`]])
    },
    {
      id: `${FLOOR}_9`,
      title: `OSTIN`,
      logoSrc: `ostin.svg`,
      synonyms: [`OSTIN`, `остин`],
      description: `Женская и мужская одежда`,
      path: `M22.4,408.7h128.4v12.8H201v103.9h-54.7v33.1 H34.4H22.4V408.7z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: `${FLOOR}_10`,
      title: `KRUTOYS`,
      synonyms: [`KRUTOYS`, `крутойс`, `крутой`, 'крутойз'],
      description: `Товары для детей`,
      path: `M827.4315796,398.3096008h-18.0935059 V366.630249h18.0935059V398.3096008z`,
      category: new Set([categoryFilter[`Детские товары`]]),
      'for-who': new Set([forWhoFilter[`Товары для детей`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: `${FLOOR}_11`,
      title: `М.Видео`,
      logoSrc: `mvideo.svg`,
      synonyms: [`М.Видео`, `МВидео`, `М Видео`, `mvideo`],
      description: `Магазин бытовой техники и электроники`,
      path: `M9.587574-48.5962143 L8.3517342,178.1529236h-158.1085205v17.5948486h-129.0063934V43.5695572v-92.1657715H9.587574z`,
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
        position: [953.5, 500]
      }]
    }
  ]
};
