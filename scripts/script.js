const WIDTH = 1105;
const HEIGHT = 530;
const FILTERED_TARGET_FILL = "#6eb6ff";
MIN_ZOOM = 0.5;
MAX_ZOOM = 2.5;

const category = {
  [`Одежда`]: 1,
  [`Обувь`]: 2,
  [`Бельё`]: 3,
  [`Головные уборы`]: 4,
  [`Товары для дома`]: 5,
  [`Детские товары`]: 6,
  [`Книги и канцтовары`]: 7,
  [`Продукты питания`]: 8,
  [`Бытовая техника и электроника`]: 9
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
const gArr = [];

const floor1 = {
  areas: [{
      id: 1,
      title: `KARI`,
      description: `Обувной магазин`,
      path: `M-284.7,179.1h-72.7v28 h-91.1l-0.2-95.2l163.7,0L-284.7,179.1z`,
      category: new Set([category[`Обувь`]])
    },
    {
      id: 2,
      title: `ZARA`,
      description: `Одежда для современных людей`,
      category: new Set([category[`Одежда`]]),
      'for-who': new Set([forWho[`Мужская одежда`], forWho[`Женская одежда`]]),
      path: `M312.6,25.4l0.6,240.6 c-3,4.8-5.4,10.1-6.9,15.7H125.1V25.4H312.6z`,
    },
    {
      id: 3,
      title: `Bershka`,
      description: `Трендовая одежда, обувь и аксессуары`,
      path: `M486.6,256.3v25.1 h-62.4c-5.7-20.9-22.2-37.2-43.2-42.6l36.4-18v-33.7v-33.6v-0.1v-128h69.1V256.3z`,
      category: new Set([category[`Одежда`]])
    },
    {
      id: 4,
      title: `H&M`,
      description: `Модная одежда для женщин, мужчин, подростков и детей`,
      path: `M-284.5,179.6v28.9v173 h-163.4l-0.5-173.8h91.7l0-28.1H-284.5z`,
      category: new Set([category[`Одежда`]])
    },
    {
      id: 5,
      title: `Лента`,
      description: `Гипермаркет`,
      path: `M782.7,25.4h317.1 v510.1H782.7v-25.6v-24.9V25.4z`,
      category: new Set([category[`Продукты питания`]])
    }
  ]
};
aeroPlans.push(floor1);

const floor2 = {
  areas: [{
      id: 6,
      title: `OBI`,
      description: `Строительный гипермаркет`,
      path: `M-496.4-49.1l-0.2,480 l-251.4,0.4v58.3l-76.6,0v15.9l-95.1,0l0.1-15.8l-82.3,0v-58.3l-315.2-0.4l0.5-480H-496.4z`,
      category: new Set([category[`Товары для дома`]])
    },
    {
      id: 7,
      title: `Технопарк`,
      description: `Бытовая техника и электроника`,
      path: `M243.9226074,311.9947815 l-155.2497711,0.1965637v-50.125l-68.294281,0.138031V41.687439l223.5440521,0.4740143`,
      category: new Set([category[`Бытовая техника и электроника`]])
    },
    {
      id: 8,
      title: `Дочки-Сыночки`,
      description: `Товары для детей`,
      path: `M841.69,41.02 841.69,312.54 841.69,355.45 841.32,355.45 841.32,400.29 1044.79,400.29 1044.79,41.02 z`,
      category: new Set([category[`Детские товары`]])
    },
    {
      id: 9,
      title: `OSTIN`,
      description: `Женская и мужская одежда`,
      path: `M22.4,408.7h128.4v12.8H201v103.9h-54.7v33.1 H34.4H22.4V408.7z`,
      category: new Set([category[`Одежда`]])
    },
    {
      id: 10,
      title: `KRUTOYS`,
      description: `Товары для детей`,
      path: `M827.4315796,398.3096008h-18.0935059 V366.630249h18.0935059V398.3096008z`,
      category: new Set([category[`Детские товары`]])
    },
    {
      id: 11,
      title: `М.Видео`,
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
    this.tabsContent = tabsContent;
    this.tabIndex = initialIndex;

    this.tabsControlsList.addEventListener(`click`, evt => {
      this.onClick(evt);
    });

    this.changeTabContent(this.tabIndex);
  }

  onClick(evt) {
    console.log(this);
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
  pathNode.classList.add(`hovered`);

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
    currentPathNode.classList.remove(`hovered`);
  }
});

popper.addEventListener(`mouseover`, function (evt) {

});

popper.addEventListener(`mouseleave`, function (evt) {
  const relatedTarget = evt.relatedTarget;
  const pathNode = relatedTarget.closest(`path`);

  if (!currentPathNode) {
    return;
  }

  if (pathNode !== currentPathNode || !pathNode) {
    popper.hidden = true;
    currentPathNode.classList.remove(`hovered`);
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

  const g = svg.append(`g`);

  gArr.push(g);

  const zoom = d3
    .zoom()
    .scaleExtent([MIN_ZOOM, MAX_ZOOM])
    // .translateExtent([[-100, -100], [WIDTH + 100, HEIGHT + 100]])
    .on("zoom", zoomed);


  zoomsArr.push(zoom);

  const paths = g
    .selectAll(`path`)
    .data(areas)
    .enter()
    .append(`path`);

  paths
    .attr(`data-title`, d => d.title)
    .attr(`data-description`, d => d.description)
    .attr(`data-place-id`, d => d.id)
    .attr(`d`, d => d.path)
    .attr(`fill`, attrs.fill);

  paths.on("click", function (d) {
    alert(`
        ${this.dataset.title}
        ${this.dataset.description}
      `);
  });

  function zoomed() {
    popperInstance.update();
    console.log(d3.event.transform);

    g.attr("transform", d3.event.transform);
  }

  form.addEventListener("input", function (evt) {
    const target = evt.target;
    const select = target.closest(`select`);

    if (!select) {
      return;
    }

    const selectNodes = form.querySelectorAll(`select`);

    [...selectNodes].forEach((it) => {
      if (it !== select) {
        it.selectedIndex = 0;
      }
    });

    const filterName = select.name;
    const filterValue = parseInt(select.value, 10);

    const filteredPaths = paths
      .attr(`fill`, attrs.fill)
      .filter(d => {
        if (d[filterName] instanceof Set) {
          return d[filterName].has(filterValue)
          // return d[filterName] == filterValue;
        }
      })
      .attr(`fill`, FILTERED_TARGET_FILL);

    const filteredPathsCount = filteredPaths.size();

    d3.select(`.aero-plans-toggle-floors__item:nth-child(${planIndex+1})`).select(`span`).text(filteredPathsCount);
  });

  svg.call(zoom);

  zoomActionsContainer.addEventListener(`click`, function (evt) {
    const target = evt.target;
    const action = target.dataset.scaleAction;

    if (action) {
      zoomActions[action](svg, zoom);
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

// targetId - id магазина (области)
const targetId = parseInt('10', 10);

function getFloorIndexAndObjectOfPlaceId(id) {
  let floorIndex = 0;
  let areaObj = {};

  for (let currentFloorIndex = 0; currentFloorIndex < aeroPlans.length; currentFloorIndex++) {
    let currentFloor = aeroPlans[currentFloorIndex];

    areaObj = _.find(currentFloor.areas, function (o) {
      return o.id == targetId;
    });

    if (areaObj) {
      floorIndex = currentFloorIndex;
      break;
    }
  }

  return {
    floorIndex,
    areaObj: areaObj
  };
}

const aeroPlansToggleFloors = document.querySelector(`.aero-plans-toggle-floors`);
const aeroPlansFloors = document.querySelectorAll(`.aero-plans__floor`);


const tabs = new ToggleFloors(aeroPlansToggleFloors, aeroPlansFloors, getFloorIndexAndObjectOfPlaceId(targetId).floorIndex + 1);

const currentFloorIndex = getFloorIndexAndObjectOfPlaceId(targetId).floorIndex;

let place = document.querySelector(`[data-place-id="${targetId}"]`);
if (place) {
  place.classList.add('hovered');
  let placeBBox = place.getBBox();
  let cx = placeBBox.x + placeBBox.width / 2;
  let cy = placeBBox.y + placeBBox.height / 2;
  let scale = 0.95 * Math.min(WIDTH / placeBBox.width, HEIGHT / placeBBox.height);
  if (scale < MIN_ZOOM) {
    scale = MIN_ZOOM
  } else if (scale > MAX_ZOOM) {
    scale = MAX_ZOOM;
  }
  let translate = [(WIDTH / 2 - 1 * cx), (HEIGHT / 2 - 1 * cy)];
  svgArr[currentFloorIndex]
  .transition()
  .duration(1000)
  .call(zoomsArr[currentFloorIndex].translateBy, translate[0], translate[1])
  .transition()
  .duration(1000)
  .call(zoomsArr[currentFloorIndex].scaleBy, scale)
}
