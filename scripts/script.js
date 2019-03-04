const WIDTH = 1105;
const HEIGHT = 530;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4.5;
const PLAN_PLACE_CLASS = `plan-place`;
const PLAN_PLACE_HOVERED_CLASS = `plan-place--hovered`;
const PLAN_PLACE_SELECTED_CLASS = `plan-place--selected`;
const PLAN_PLACE_FILTERED_CLASS = `plan-place--filtered`;
const PLAN_PLACE_LOGO_CLASS = `plan-place-logo`;
const MAX_LOGO_WIDTH = 300;
const MAX_LOGO_HEIGHT = 300;
const KOEF_LOGO_SIZE = 0.7;
// const FILTERED_TARGET_FILL = "#6ff";

const category = {
  [`Одежда`]: 1,
  [`Обувь`]: 2,
  [`Бельё`]: 3,
  [`Головные уборы`]: 4,
  [`Товары для дома`]: 5,
  [`Детские товары`]: 6,
  [`Книги и канцтовары`]: 7,
  [`Продукты питания`]: 8,
  [`Бытовая техника и электроника`]: 9,
  [`Сотовая связь`]: 10
};
const forWho = {
  [`Все`]: 1,
  [`Мужская одежда`]: 2,
  [`Женская одежда`]: 3,
  [`Товары для детей`]: 4
}
const attrs = {
  fill: `#b5b0f7`
};
const form = document.querySelector("form");
const plansWrapper = document.querySelector(`.aero-plans`);
const zoomActionsContainer = document.querySelector(".zoom-actions");
const zoomActions = {
  reset: function (selection, zoom) {
    selection
      .transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity);
  },
  down: function (selection, zoom) {
    selection
      .transition()
      .duration(750)
      .call(zoom.scaleBy, 0.75);
  },
  up: function (selection, zoom) {
    selection
      .transition()
      .duration(750)
      .call(zoom.scaleBy, 1.25);
  }
};
const aeroPlans = [];
const zoomsArr = []
const svgArr = [];
const placesGArr = [];
const placesPathsArr = [];

const floor1 = {
  areas: [{
      id: 1,
      title: `KARI`,
      synonyms: [`кари`, `kari`],
      description: `Обувной магазин`,
      path: `M-284.7,179.1h-72.7v28 h-91.1l-0.2-95.2l163.7,0L-284.7,179.1z`,
      category: new Set([category[`Обувь`]])
    },
    {
      id: 2,
      title: `ZARA`,
      logoSrc: `zara.svg`,
      synonyms: [`zara`, `зара`],
      description: `Одежда для современных людей`,
      category: new Set([category[`Одежда`]]),
      'for-who': new Set([forWho[`Мужская одежда`], forWho[`Женская одежда`]]),
      path: `M312.6,25.4l0.6,240.6 c-3,4.8-5.4,10.1-6.9,15.7H125.1V25.4H312.6z`,
    },
    {
      id: 3,
      title: `Bershka`,
      logoSrc: `bershka.svg`,
      synonyms: [`bershka`, `бершка`],
      description: `Трендовая одежда, обувь и аксессуары`,
      path: `M486.6,256.3v25.1 h-62.4c-5.7-20.9-22.2-37.2-43.2-42.6l36.4-18v-33.7v-33.6v-0.1v-128h69.1V256.3z`,
      category: new Set([category[`Одежда`]])
    },
    {
      id: 4,
      title: `H&M`,
      logoSrc: `h&m.svg`,
      synonyms: [`h&m`, `hm`, `ейч эм`],
      description: `Модная одежда для женщин, мужчин, подростков и детей`,
      path: `M-284.5,179.6v28.9v173 h-163.4l-0.5-173.8h91.7l0-28.1H-284.5z`,
      category: new Set([category[`Одежда`]])
    },
    {
      id: 5,
      title: `Лента`,
      logoSrc: `lenta.svg`,
      synonyms: [`Лента`, `lenta`],
      description: `Гипермаркет`,
      path: `M782.7,25.4h317.1 v510.1H782.7v-25.6v-24.9V25.4z`,
      category: new Set([category[`Продукты питания`]])
    },
    {
      id: 50,
      title: `TELE2`,
      logoSrc: `tele2.svg`,
      synonyms: [`tele2`, `теле2`],
      description: `Оператор сотовой связи`,
      path: `M690.5,431.4 712.9,431.4 712.9,453.7 690.5,453.7z`,
      category: new Set([category[`Сотовая связь`]])
    }
  ]
};
aeroPlans.push(floor1);

const floor2 = {
  areas: [{
      id: 6,
      title: `OBI`,
      logoSrc: `obi.svg`,
      synonyms: [`OBI`, `оби`],
      description: `Строительный гипермаркет`,
      path: `M-496.4-49.1l-0.2,480 l-251.4,0.4v58.3l-76.6,0v15.9l-95.1,0l0.1-15.8l-82.3,0v-58.3l-315.2-0.4l0.5-480H-496.4z`,
      category: new Set([category[`Товары для дома`]])
    },
    {
      id: 7,
      title: `Технопарк`,
      logoSrc: `technopark.svg`,
      synonyms: [`Технопарк`],
      description: `Бытовая техника и электроника`,
      path: `M243.9226074,311.9947815 l-155.2497711,0.1965637v-50.125l-68.294281,0.138031V41.687439l223.5440521,0.4740143`,
      category: new Set([category[`Бытовая техника и электроника`]])
    },
    {
      id: 8,
      title: `Дочки-Сыночки`,
      logoSrc: `dochkisinochki.svg`,
      synonyms: [`Дочки-Сыночки`, `Дочки Сыночки`, `Дочки`, `Сыночки`],
      description: `Товары для детей`,
      path: `M841.69,41.02 841.69,312.54 841.69,355.45 841.32,355.45 841.32,400.29 1044.79,400.29 1044.79,41.02 z`,
      category: new Set([category[`Детские товары`]])
    },
    {
      id: 9,
      title: `OSTIN`,
      logoSrc: `ostin.svg`,
      synonyms: [`OSTIN`, `остин`],
      description: `Женская и мужская одежда`,
      path: `M22.4,408.7h128.4v12.8H201v103.9h-54.7v33.1 H34.4H22.4V408.7z`,
      category: new Set([category[`Одежда`]])
    },
    {
      id: 10,
      title: `KRUTOYS`,
      synonyms: [`KRUTOYS`, `крутойс`, `крутой`, 'крутойз'],
      description: `Товары для детей`,
      path: `M827.4315796,398.3096008h-18.0935059 V366.630249h18.0935059V398.3096008z`,
      category: new Set([category[`Детские товары`]])
    },
    {
      id: 11,
      title: `М.Видео`,
      logoSrc: `mvideo.svg`,
      synonyms: [`М.Видео`, `МВидео`, `М Видео`],
      description: `Магазин бытовой техники и электроники`,
      path: `M9.587574-48.5962143 L8.3517342,178.1529236h-158.1085205v17.5948486h-129.0063934V43.5695572v-92.1657715H9.587574z`,
      category: new Set([category[`Бытовая техника и электроника`]])
    }
  ]
};
aeroPlans.push(floor2);

class ToggleFloors {
  constructor(tabsControlsList, tabsContent, initialIndex = 1) {
    this.tabsControlsList = tabsControlsList;
    this.tabsControlsItems = tabsControlsList.querySelectorAll(`.aero-plans-toggle-floors__item`);
    this.tabsContent = tabsContent;
    this.tabIndex = initialIndex;

    this.tabsControlsList.addEventListener(`click`, evt => {
      this.onClick(evt);
    });

    this.changeTabContent(this.tabIndex);
  }

  onClick(evt) {
    // console.log(this);
    const target = evt.target;
    const control = target.closest(`button`);

    if (!control) {
      return;
    }

    this.tabIndex = parseInt(target.dataset.floorId);
    this.changeTabContent(this.tabIndex);
  }

  changeTabContent(index) {
    this.tabIndex = index;

    [...this.tabsContent].forEach((it, i) => {
      if (i !== index - 1) {
        it.classList.remove(`visible`);
        it.classList.add(`hidden`);
      } else {
        it.classList.remove(`hidden`);
        it.classList.add(`visible`);
      }
    });
  }
}

form.appendChild(renderFilterSelect(category, {
  classStr: `select`,
  name: `category`,
  inactiveOption: `Выберите категорию`
}));
form.appendChild(renderFilterSelect(forWho, {
  classStr: `select`,
  name: `for-who`,
  inactiveOption: `Для кого`
}));

const toggleFloorsItem = d3
  .select(`.aero-plans-toggle-floors`)
  .selectAll(`.aero-plans-toggle-floors__item`)
  .data(aeroPlans)
  .enter()
  .append(`div`)
  .classed(`aero-plans-toggle-floors__item`, true);

toggleFloorsItem
  .append(`button`)
  .attr(`type`, `button`)
  .attr(`data-floor-id`, (d, i) => {
    let floor = i + 1;
    return `${floor}`;
  })
  .text((d, i) => {
    let floor = i + 1;
    return `${floor} этаж`;
  });

toggleFloorsItem
  .append(`span`)

const reference = document.documentElement;
const popper = document.querySelector('.my-popper');
const popperInstance = new Popper(reference, popper, {
  modifiers: {
    preventOverflow: {
      boundariesElement: document.querySelector('.aero-plans')
    }
  }
});
let currentPathNode = null;

plansWrapper.addEventListener(`mouseover`, function (evt) {
  const target = evt.target;
  const pathNode = target.closest(`path`);

  if (!pathNode) {
    return;
  }

  currentPathNode = pathNode;
  pathNode.classList.add(PLAN_PLACE_HOVERED_CLASS);

  const title = `<h2>${pathNode.dataset.title}</h2>`;
  const description = `<p>${pathNode.dataset.description}</p>`;

  popper.innerHTML = title + description;
  popperInstance.update();
  popperInstance.reference = pathNode;
  popper.hidden = false;
});

plansWrapper.addEventListener(`mouseout`, function (evt) {
  if (evt.relatedTarget !== popper && currentPathNode) {
    popper.hidden = true;
    currentPathNode.classList.remove(PLAN_PLACE_HOVERED_CLASS);
  }
});

popper.addEventListener(`mouseleave`, function (evt) {
  const relatedTarget = evt.relatedTarget;
  const pathNode = relatedTarget.closest(`path`);

  if (!currentPathNode) {
    return;
  }

  if (pathNode !== currentPathNode || !pathNode) {
    popper.hidden = true;
    currentPathNode.classList.remove(PLAN_PLACE_HOVERED_CLASS);
  }
});

aeroPlans.forEach(renderPlan);

function renderPlan(plan, planIndex) {
  const areas = plan.areas;
  const svg = d3
    .select(`.aero-plans`)
    .append(`div`)
    .classed(`aero-plans__floor`, true)
    .append(`svg`)
    .attr(`width`, `1105`)
    .attr(`viewBox`, `0 0 ${WIDTH} ${HEIGHT}`);

  svgArr.push(svg);

  // const nest = d3.nest().key((d) => {
  //   return d.category;
  // }).entries(areas);
  // console.log(nest);

  const placesG = svg.append(`g`).attr(`id`, `places`);
  // const logosG = svg.append(`g`).attr(`id`, `logos`);

  placesGArr.push(placesG);

  const placesPaths = placesG
    .selectAll(`path`)
    .data(areas)
    .enter()
    .append(`path`);

  placesPathsArr.push(placesPaths);

  placesPaths
    .attr(`data-title`, d => d.title)
    .attr(`data-description`, d => d.description)
    .attr(`data-place-id`, d => d.id)
    .attr(`d`, d => d.path)
    // .attr(`fill`, attrs.fill);
    .classed(PLAN_PLACE_CLASS, true);

  placesPaths.on("click", function (d) {
    alert(`
        ${this.dataset.title}
        ${this.dataset.description}
      `);
  });

  const logosImages = placesG.selectAll(`image`)
    .data(areas)
    .enter()
    .append(`image`);

  logosImages
    .attr(`xlink:href`, (d) => {
      return d.logoSrc ? `logos/${d.logoSrc}` : ``;
    })
    .attr(`width`, (d) => {
      return calcImagePosition(d, `width`);
    })
    .attr(`height`, (d) => {
      return calcImagePosition(d, `height`);
    })
    .attr(`x`, (d) => {
      return calcImagePosition(d, `x`);
    })
    .attr(`y`, (d) => {
      return calcImagePosition(d, `y`);
    })
    .classed(PLAN_PLACE_LOGO_CLASS, true);

  // const logosPaths =
  const zoom = d3
    .zoom()
    .scaleExtent([MIN_ZOOM, MAX_ZOOM])
    // Раскомментить нижнюю строку полсе перерисовки плана, т.к. path'ы выходят за границу SVG
    // .translateExtent([[-100, -100], [WIDTH + 100, HEIGHT + 100]])
    .on("zoom", zoomed);

  zoomsArr.push(zoom);

  function zoomed() {
    popperInstance.update();

    placesG.attr("transform", d3.event.transform);
  }

  svg.call(zoom);

  zoomActionsContainer.addEventListener(`click`, function (evt) {
    const target = evt.target;
    const action = target.dataset.scaleAction;

    if (action) {
      zoomActions[action](svg, zoom);
    }
  });
}

function calcImagePosition(d, property) {
  if (!d.logoSrc) {
    return 0;
  }

  const path = document.querySelector(`[data-place-id="${d.id}"]`);
  const pathPosition = path.getBBox();

  const pathX = pathPosition.x;
  const pathY = pathPosition.y;
  const pathW = pathPosition.width;
  const pathH = pathPosition.height;

  let logoW = pathW * KOEF_LOGO_SIZE;
  let logoH = pathH * KOEF_LOGO_SIZE;

  if (logoW > MAX_LOGO_WIDTH) {
    logoW = MAX_LOGO_WIDTH;
  }

  if (logoH > MAX_LOGO_HEIGHT) {
    logoH = MAX_LOGO_HEIGHT;
  }

  const logoX = pathX + pathW / 2 - logoW / 2;
  const logoY = pathY + pathH / 2 - logoH / 2;

  switch (property) {
    case `width`:
      return logoW;
    case `height`:
      return logoH;
    case `x`:
      return logoX;
    case `y`:
      return logoY;
    default:
      return 0;
  }
}

form.addEventListener("input", inputFormHandler);
form.addEventListener(`reset`, resetFormHandler);

function inputFormHandler(evt) {
  const target = evt.target;
  const select = target.closest(`select`);

  if (!select) {
    return;
  }

  resetFilter(select);

  const filterName = select.name;
  const filterValue = parseInt(select.value, 10);

  placesPathsArr.forEach((paths, planIndex) => {
    const filteredPaths = paths
      // .attr(`fill`, attrs.fill)
      .classed(PLAN_PLACE_FILTERED_CLASS, false)
      .filter(d => {
        if (d[filterName] instanceof Set) {
          return d[filterName].has(filterValue);
          // return d[filterName] == filterValue;
        }
      })
      .classed(PLAN_PLACE_FILTERED_CLASS, true);
    // .attr(`fill`, FILTERED_TARGET_FILL);

    const filteredPathsCount = filteredPaths.size();

    d3.select(`.aero-plans-toggle-floors__item:nth-child(${planIndex+1})`).select(`span`).text(filteredPathsCount);
  });
}

function resetFormHandler(evt) {
  removeFilteredAreas();
}

function resetFilter(currentSelectNode) {
  const selectNodes = form.querySelectorAll(`select`);

  [...selectNodes].forEach((it) => {
    if (it !== currentSelectNode) {
      it.selectedIndex = 0;
    }
  });
}

function renderFilterSelect(listName, {
  classStr = ``,
  name = ``,
  inactiveOption = ``
}) {
  const select = document.createElement(`select`);

  select.setAttribute(`name`, name);
  select.setAttribute(`class`, classStr);
  select.appendChild(createOptionsList(listName, inactiveOption));

  return select;
}

function createOptionsList(list, inactiveOption) {
  const optionsFragment = document.createDocumentFragment();

  if (inactiveOption) {
    let inactiveOptionEl = document.createElement(`option`);
    inactiveOptionEl.disabled = true;
    // inactiveOptionEl.selected = true;
    inactiveOptionEl.setAttribute('selected', '');
    inactiveOptionEl.textContent = inactiveOption;
    optionsFragment.appendChild(inactiveOptionEl);
  }

  for (let item in list) {
    let option = document.createElement(`option`);
    option.value = list[item];
    option.textContent = item;
    optionsFragment.appendChild(option);
  }

  return optionsFragment;
}

function createZoomControls() {

}

function getFloorIndexAndObjectOfPlaceId(id) {
  let floorIndex = 0;
  let areaObj = null;

  for (let currentFloorIndex = 0; currentFloorIndex < aeroPlans.length; currentFloorIndex++) {
    let currentFloor = aeroPlans[currentFloorIndex];

    areaObj = _.find(currentFloor.areas, function (o) {
      return o.id == id;
    });

    if (areaObj) {
      floorIndex = currentFloorIndex;
      break;
    }
  }

  return {
    floorIndex,
    areaObj
  };
}

const aeroPlansToggleFloors = document.querySelector(`.aero-plans-toggle-floors`);
const aeroPlansFloors = document.querySelectorAll(`.aero-plans__floor`);
const toggleFloors = new ToggleFloors(aeroPlansToggleFloors, aeroPlansFloors);

function catchTargetPlace({
  floorIndex,
  areaObj
}) {
  if (!areaObj) {
    return;
  }

  let targetId = getTargetIdFromAreaObj(areaObj);
  let place = document.querySelector(`[data-place-id="${targetId}"]`);

  removeSelectedAreas();

  toggleFloors.changeTabContent(floorIndex + 1);
  place.classList.add(PLAN_PLACE_SELECTED_CLASS);
  let placeBBox = place.getBBox();
  let cx = placeBBox.x + placeBBox.width / 2;
  let cy = placeBBox.y + placeBBox.height / 2;
  let scale = 0.95 * Math.min(WIDTH / placeBBox.width, HEIGHT / placeBBox.height);

  if (scale < MIN_ZOOM) {
    scale = MIN_ZOOM
  } else if (scale > MAX_ZOOM) {
    scale = MAX_ZOOM;
  }

  let translate = [(WIDTH / 2 - scale * cx), (HEIGHT / 2 - scale * cy)];

  svgArr[floorIndex]
    .transition()
    .duration(800)
    .call(zoomsArr[floorIndex].transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}

function removeSelectedAreas() {
  const selectedPaths = document.querySelectorAll(`.${PLAN_PLACE_SELECTED_CLASS}`);
  [...selectedPaths].forEach((it) => {
    it.classList.remove(PLAN_PLACE_SELECTED_CLASS);
  });
}

function removeFilteredAreas() {
  const selectedPaths = document.querySelectorAll(`.${PLAN_PLACE_FILTERED_CLASS}`);
  [...selectedPaths].forEach((it) => {
    it.classList.remove(PLAN_PLACE_FILTERED_CLASS);
  });
}

function getTargetIdFromAreaObj(obj) {
  return obj.id;
}

// Переход со страницы магазина по указанному id
// catchTargetPlace(getFloorIndexAndObjectOfPlaceId(6));

function searchChangeHandler(value) {
  const optimValue = value.toLowerCase().trim();
  let floorIndex = 0;
  let areaObj = null;

  for (let i = 0; i < aeroPlans.length; i++) {
    let areas = aeroPlans[i].areas;
    floorIndex = i;
    areaObj = areas.find((place) => {
      const synonyms = place.synonyms.map((word) => word.toLowerCase().trim());
      return synonyms.includes(optimValue);
    });

    if (areaObj) {
      break;
    }
  }

  return {
    floorIndex,
    areaObj
  };
}

// Поиск по названию
catchTargetPlace(searchChangeHandler('крутойс'));
