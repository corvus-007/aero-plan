import {
  category,
  forWho
} from './filter-options.js';
import ToggleFloors from './toggle-floors.js';
import floor1 from './floor-1.js';
import floor2 from './floor-2.js';

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
const MARKER_SIZE = 32;
const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const placeId = params.get(`place_id`);

// const FILTERED_TARGET_FILL = "#6ff";

// const attrs = {
//   fill: `#b5b0f7`
// };

const filterForm = document.querySelector(`[data-plans-filter-form]`);
const searchForm = document.querySelector(`[data-plans-search-form]`);
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
const mainsGArr = [];
const placesPathsArr = [];


aeroPlans.push(floor1);

aeroPlans.push(floor2);



filterForm.insertBefore(renderFilterSelect(category, {
  classStr: `select`,
  name: `category`,
  inactiveOptionText: `Выберите категорию`
}), filterForm.lastElementChild);

filterForm.insertBefore(renderFilterSelect(forWho, {
  classStr: `select`,
  name: `for-who`,
  inactiveOptionText: `Для кого`
}), filterForm.lastElementChild);

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
  .append(`span`);

const reference = document.documentElement;
const popper = document.querySelector(`.my-popper`);
const popperInstance = new Popper(reference, popper, {
  modifiers: {
    preventOverflow: {
      boundariesElement: document.querySelector(`.aero-plans`)
    }
  }
});
let currentPathNode = null;

plansWrapper.addEventListener(`mouseover`, function (evt) {
  const target = evt.target;
  const pathNode = target.closest(`.plan-place`) || target.closest(`use`);

  if (!pathNode) {
    return;
  }

  currentPathNode = pathNode;
  pathNode.classList.add(PLAN_PLACE_HOVERED_CLASS);

  const title = pathNode.dataset.title;
  const description = pathNode.dataset.description || ``;

  popper.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;
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
  const markers = plan.markers;

  const svg = d3
    .select(`.aero-plans`)
    .append(`div`)
    .classed(`aero-plans__floor`, true)
    .append(`svg`)
    // .attr(`width`, `1105`)
    .attr(`viewBox`, `0 0 ${WIDTH} ${HEIGHT}`);

  svgArr.push(svg);

  // const nest = d3.nest().key((d) => {
  //   return d.category;
  // }).entries(areas);
  // console.log(nest);

  const mainG = svg.append(`g`).attr(`id`, `main-group`);
  const placesG = mainG.append(`g`).attr(`id`, `places-group`);
  const logosG = mainG.append(`g`).attr(`id`, `logos-group`);
  const markersG = mainG.append(`g`).attr(`id`, `markers-group`);

  mainsGArr.push(mainG);

  if (markers) {
    markersG
      .selectAll(`g`)
      .data(markers)
      .enter()
      .append(`g`)
      .each(function (d) {
        const symbolId = d.symbolId;
        const points = d.points;

        const use = d3
          .select(this)
          .selectAll(`use`)
          .data(points)
          .enter()
          .append(`use`);

        use
          .attr(`data-title`, (d) => d.title)
          .attr(`xlink:href`, `#${symbolId}`)
          .attr(`width`, MARKER_SIZE)
          .attr(`height`, MARKER_SIZE)
          .attr(`transform`, (d) => `translate(${d.position[0]} ${d.position[1]})`);
      });
  }


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

  const logosImages = logosG.selectAll(`image`)
    .data(areas)
    .enter()
    .append(`image`);

  logosImages
    .attr(`xlink:href`, (d) => {
      return getPathToImage(d, planIndex);
    })
    .attr(`width`, (d) => {
      return calcLogoPosition(d, `width`);
    })
    .attr(`height`, (d) => {
      return calcLogoPosition(d, `height`);
    })
    .attr(`x`, (d) => {
      return calcLogoPosition(d, `x`);
    })
    .attr(`y`, (d) => {
      return calcLogoPosition(d, `y`);
    })
    .classed(PLAN_PLACE_LOGO_CLASS, true);

  const zoom = d3
    .zoom()
    .scaleExtent([MIN_ZOOM, MAX_ZOOM])
    // Раскомментить нижнюю строку после перерисовки плана, т.к. path'ы выходят за границу SVG и нужно
    // .translateExtent([[-100, -100], [WIDTH + 100, HEIGHT + 100]])
    .on("zoom", zoomed);

  zoomsArr.push(zoom);

  function zoomed() {
    popperInstance.update();
    mainG.attr("transform", d3.event.transform);
  }

  svg.call(zoom);
}

const aeroPlansToggleFloors = document.querySelector(`.aero-plans-toggle-floors`);
const aeroPlansFloors = document.querySelectorAll(`.aero-plans__floor`);
const toggleFloors = new ToggleFloors(aeroPlansToggleFloors, aeroPlansFloors);


zoomActionsContainer.addEventListener(`click`, function (evt) {
  const target = evt.target;
  const action = target.dataset.scaleAction;
  const svg = svgArr[toggleFloors.index];
  const zoom = zoomsArr[toggleFloors.index];

  if (action) {
    zoomActions[action](svg, zoom);
  }
});

searchForm.addEventListener(`submit`, searchFormSubmitHandler);
filterForm.addEventListener("input", inputFormHandler);
filterForm.addEventListener(`reset`, resetFormHandler);

// Переход со страницы магазина по указанному id
catchTargetPlace(getFloorIndexAndObjectOfPlaceId(placeId));

function getPathToImage(d, index) {
  return d.logoSrc ? `logos/floor_${index+1}/${d.logoSrc}` : ``;
}

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
      .classed(PLAN_PLACE_FILTERED_CLASS, false)
      .filter(d => {
        if (d[filterName] instanceof Set) {
          return d[filterName].has(filterValue);
        }
      })
      .classed(PLAN_PLACE_FILTERED_CLASS, true);

    const filteredPathsCount = filteredPaths.size();

    d3.select(`.aero-plans-toggle-floors__item:nth-child(${planIndex+1})`).select(`span`).text(filteredPathsCount);
  });
}

function resetFormHandler(evt) {
  removeFilteredAreas();
}

function searchFormSubmitHandler(evt) {
  evt.preventDefault();
  const inputNode = searchForm.querySelector(`[name="nameOfPlace"]`);
  const value = inputNode.value;

  // Поиск по названию
  catchTargetPlace(getFloorIndexAndObjectOfPlaceIdOnSearch(value));
}

function resetFilter(currentSelectNode) {
  const selectNodes = filterForm.querySelectorAll(`select`);

  [...selectNodes].forEach((it) => {
    if (it !== currentSelectNode) {
      it.selectedIndex = 0;
    }
  });
}

function calcLogoPosition(d, property) {
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

function renderFilterSelect(listName, {
  classStr = ``,
  name = ``,
  inactiveOptionText = ``
}) {
  const select = document.createElement(`select`);

  select.setAttribute(`name`, name);
  select.setAttribute(`class`, classStr);
  select.appendChild(createOptionsList(listName, inactiveOptionText));

  return select;
}

function createOptionsList(list, inactiveOptionText) {
  const optionsFragment = document.createDocumentFragment();

  if (inactiveOptionText) {
    let inactiveOptionEl = new Option(inactiveOptionText, null, false, true);
    inactiveOptionEl.disabled = true;
    optionsFragment.appendChild(inactiveOptionEl);
  }

  for (let item in list) {
    let optionEl = new Option(item, list[item])
    optionsFragment.appendChild(optionEl);
  }

  return optionsFragment;
}

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

  toggleFloors.toggleControls(floorIndex);
  toggleFloors.toggleTabContent(floorIndex);
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

function getTargetIdFromAreaObj(placeObj) {
  return placeObj.id;
}

function getFloorIndexAndObjectOfPlaceId(id) {
  id = parseInt(id, 10);
  let floorIndex = 0;
  let areaObj = null;

  for (let i = 0; i < aeroPlans.length; i++) {
    let areas = aeroPlans[i].areas;
    floorIndex = i;
    areaObj = areas.find((place) => {
      return place.id === id;
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

function getFloorIndexAndObjectOfPlaceIdOnSearch(value) {
  value = value.toLowerCase().trim();
  let floorIndex = 0;
  let areaObj = null;

  for (let i = 0; i < aeroPlans.length; i++) {
    let areas = aeroPlans[i].areas;
    floorIndex = i;
    areaObj = areas.find((place) => {
      const synonyms = place.synonyms.map((word) => word.toLowerCase().trim());

      return synonyms.includes(value);
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
