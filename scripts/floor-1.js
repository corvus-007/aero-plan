import {
  categoryFilter,
  forWhoFilter,
  discountFilter
} from './filter-options.js';

export default {
  settings: {
    dimensions: {
      width: 1572.8,
      height: 560.1
    },
    boundaryShape: `M141.1,560.1h-.3c-30.6-.1-58.6-13.8-76.9-37.6H0V415.6H11.2V.4h1.5L1572.8,0V523.1h-1.5L219,522.5C200.3,546.5,172,560.1,141.1,560.1Z`
  },
  areas: [{
      id: 1,
      title: `KARI`,
      synonyms: [`кари`, `kari`],
      description: `Обувной магазин`,
      path: `M181.6,159.6H108.9v28H17.8l-.2-95.2H181.3Z`,
      category: new Set([categoryFilter[`Обувь`]])
    },
    {
      id: 2,
      title: `ZARA`,
      logoSrc: `zara.svg`,
      synonyms: [`zara`, `зара`],
      description: `Одежда для современных людей`,
      path: `M778.9,5.9l.6,240.6a58.1,58.1,0,0,0-6.9,15.7H591.4V5.9Z`,
      category: new Set([categoryFilter[`Одежда`]]),
      'for-who': new Set([forWhoFilter[`Мужская одежда`], forWhoFilter[`Женская одежда`]]),
    },
    {
      id: 3,
      title: `Bershka`,
      logoSrc: `bershka.svg`,
      synonyms: [`bershka`, `бершка`],
      description: `Трендовая одежда, обувь и аксессуары`,
      path: `M952.9,236.8v25.1H890.5a60.4,60.4,0,0,0-43.2-42.6l36.4-18V134h0V5.9h69.1V236.8Z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: 4,
      title: `H&M`,
      logoSrc: `h&m.svg`,
      synonyms: [`h&m`, `hm`, `ейч эм`],
      description: `Модная одежда для женщин, мужчин, подростков и детей`,
      path: `M181.8,160.1V362H18.4l-.5-173.8h91.7V160.1Z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: 5,
      title: `Лента`,
      logoSrc: `lenta.svg`,
      synonyms: [`Лента`, `lenta`],
      description: `Гипермаркет`,
      path: `M1249,5.9h317.1V516H1249V5.9Z`,
      category: new Set([categoryFilter[`Продукты питания`]])
    },
    {
      id: 6,
      title: `TELE2`,
      logoSrc: `tele2.svg`,
      synonyms: [`tele2`, `теле2`],
      description: `Оператор сотовой связи`,
      path: `M1156.8,411.9h22.4v22.3h-22.4Z`,
      category: new Set([categoryFilter[`Сотовая связь`], categoryFilter[`Бытовая техника и электроника`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 7,
      title: `Снежная королева`,
      logoSrc: `snowqueen.svg`,
      synonyms: [`снежная королева`, `снежная`],
      description: `Верхняя одежда`,
      link: {
        url: `http://www.trc-aeropark.ru/shop/snezhnaya-koroleva`,
        text: `1 действующая акция`
      },
      path: `M591.4,262.3H523.9v-52H466.4V5.9h125Z`,
      category: new Set([categoryFilter[`Одежда`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 8,
      title: `Pull&Bear`,
      logoSrc: `pullandbear.svg`,
      synonyms: [`pull&bear`, `pull & bear`, `пулл и биар`, `пулл и бир`],
      description: `Одежда для энергичных, творческих и амбициозных молодых людей`,
      path: `M607,293v71.4h0v36.1h.7v.5H711.4V293Z`,
      category: new Set([categoryFilter[`Одежда`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 9,
      title: `Помещение для магазина`,
      logoSrc: ``,
      synonyms: [],
      description: `Свободно`,
      rent: true,
      link: {
        text: ``,
        url: ``
      },
      button: {
        text: `Отправить заявку`,
        action: ``
      },
      path: `M284.8,434.6H263l-14.3-23.1V386.9h36.1Z`,
      category: new Set([categoryFilter[`Парфюмерия и косметика`]]),
      discount: new Set()
    },
    {
      id: 16,
      title: `Л'Этуаль (L’Etoile)`,
      logoSrc: `letoile.svg`,
      synonyms: [`лэтуаль`, `летуаль`, `letoile`],
      description: `Супермаркет парфюмерно-косметической продукции`,
      link: {
        text: ``,
        url: ``
      },
      button: {
        text: ``,
        action: ``
      },
      path: `M711.4,388.8v11.7h.1v33.8H772l44.2-18.7V388.8H711.4Z`,
      category: new Set(),
      discount: new Set()
    }
  ],
  helpMarkers: [{
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
        position: [831, 452]
      }]
    },
    {
      symbolId: `info`,
      points: [{
        title: `Инфостойка`,
        position: [831, 402]
      }]
    },
    {
      symbolId: `disabled`,
      points: [{
        title: `Туалет для ММГ`,
        position: [480, 398]
      }]
    },
    {
      symbolId: `baby-care`,
      points: [{
        title: `Комната матери и ребенка`,
        position: [508, 398]
      }]
    },
  ]
};
