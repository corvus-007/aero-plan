import {
  categoryFilter,
  forWhoFilter,
  discountFilter
} from './filter-options.js';
import ToggleFloors from './toggle-floors.js';
import floor1 from './floor-1.js';
import floor2 from './floor-2.js';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4.5;
const PLAN_PLACE_CLASS = `plan-place`;
const PLAN_PLACE_HOVERED_CLASS = `plan-place--hovered`;
const PLAN_PLACE_SELECTED_CLASS = `plan-place--selected`;
const PLAN_PLACE_FILTERED_CLASS = `plan-place--filtered`;
const PLAN_PLACE_LOGO_CLASS = `plan-place-logo`;
const MAX_LOGO_WIDTH = 250;
const MAX_LOGO_HEIGHT = 250;
const KOEF_LOGO_SIZE = 0.7;
const MARKER_SIZE = 32;

const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const placeId = params.get(`place_id`);
const filterForm = document.querySelector(`[data-plans-filter-form]`);
const categoryFilterSelect = filterForm.querySelector(`[name="category"]`);
const forWhoFilterSelect = filterForm.querySelector(`[name="for-who"]`);
const discountFilterSelect = filterForm.querySelector(`[name="discount"]`);
const searchForm = document.querySelector(`[data-plans-search-form]`);
const searchInput = searchForm.querySelector(`[name="nameOfPlace"]`);
const searchDatalist = searchForm.querySelector(`#places-list`);
const plansWrapper = document.querySelector(`.aero-plans`);
// let widthPlansWrapper = null;
// let heightPlansWrapper = null;

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
const mainGArr = [];
const placesPathsArr = [];
const dimensionFloorsArr = [];

const reference = document.documentElement;
const popper = document.querySelector(`.aero-plan-popper`);
const popperInstance = new Popper(reference, popper, {
  modifiers: {
    preventOverflow: {
      boundariesElement: plansWrapper
    }
  }
});
let currentPathNode = null;

aeroPlans.push(floor1);
aeroPlans.push(floor2);

aeroPlans.forEach(renderPlan);

categoryFilterSelect.appendChild(createOptionsList(categoryFilter));
forWhoFilterSelect.appendChild(createOptionsList(forWhoFilter));
discountFilterSelect.appendChild(createOptionsList(discountFilter));

createToggleFloorsControls();

const aeroPlansToggleFloors = document.querySelector(`.aero-plans-toggle-floors`);
const aeroPlansFloors = document.querySelectorAll(`.aero-plans__floor`);
const toggleFloors = new ToggleFloors(aeroPlansToggleFloors, aeroPlansFloors);

plansWrapper.addEventListener(`mouseover`, mouseroverPlansWrapperHandler);
plansWrapper.addEventListener(`mouseout`, mouseoutPlansWrapperHandler);
popper.addEventListener(`mouseleave`, mouseleavePopperHandler);

zoomActionsContainer.addEventListener(`click`, clickZoomContainerHandler);

// searchForm.addEventListener(`submit`, submitSearchFormHandler);
// searchForm.addEventListener(`change`, submitSearchFormHandler);
searchInput.addEventListener(`input`, inputSearchInputHandler);
filterForm.addEventListener(`input`, inputFilterFormHandler);
filterForm.addEventListener(`reset`, resetFormHandler);

function renderPlan(plan, planIndex) {
  const {
    dimensions,
    boundaryShape
  } = plan.settings;
  const areas = plan.areas;
  const helpMarkers = plan.helpMarkers;
  const planWidth = dimensions.width;
  const planHeight = dimensions.height;

  dimensionFloorsArr.push(dimensions);

  const svg = d3
    .select(`.aero-plans`)
    .append(`div`)
    .classed(`aero-plans__floor`, true)
    .append(`svg`);

  svg.attr(`viewBox`, `0 0 ${planWidth} ${planHeight}`);

  // const nest = d3.nest().key((d) => {
  //   return d.category;
  // }).entries(areas);
  // console.log(nest);

  const mainG = svg.append(`g`);
  const boundaryG = mainG.append(`g`);
  const placesG = mainG.append(`g`);
  const logosG = mainG.append(`g`);
  const helpMarkersG = mainG.append(`g`);

  mainG
    .attr(`id`, `main-group`)
    .classed(`main-group`, true);
  boundaryG
    .attr(`id`, `boundary-group`)
    .classed(`boundary-group`, true);
  placesG
    .attr(`id`, `places-group`)
    .classed(`places-group`, true);
  logosG
    .attr(`id`, `logos-group`)
    .classed(`logos-group`, true);
  helpMarkersG
    .attr(`id`, `help-markers-group`)
    .classed(`help-markers-group`, true);

  mainGArr.push(mainG);

  const borderPath = boundaryG
    .append(`path`);

  borderPath
    .attr(`d`, boundaryShape)
    .classed(`plan-floor-boundary`, true)


  svgArr.push(svg);

  // create markers
  if (helpMarkers) {
    helpMarkersG
      .selectAll(`g`)
      .data(helpMarkers)
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
          .attr(`width`, (d) => d.size ? d.size : MARKER_SIZE)
          .attr(`height`, (d) => d.size ? d.size : MARKER_SIZE)
          .attr(`transform`, (d) => `translate(${d.position[0]} ${d.position[1]})`)
          .classed(`plan-help-marker`, true);
      });
  }

  const placesPaths = placesG
    .selectAll(`path`)
    .data(areas)
    .enter()
    .append(`path`);

  placesPathsArr.push(placesPaths);

  placesPaths
    .attr(`data-place-id`, d => d.id)
    .attr(`data-title`, d => d.title)
    .attr(`data-description`, d => d.description)
    .attr(`data-link-url`, d => d.link ? d.link.url : null)
    .attr(`data-link-text`, d => d.link ? d.link.text : null)
    .attr(`data-button-text`, d => d.button ? d.button.text : null)
    .attr(`d`, d => d.path)
    .classed(PLAN_PLACE_CLASS, true);

  // placesPaths.on("click", function (d) {
  //   alert(`
  //       ${this.dataset.title}
  //       ${this.dataset.description}
  //     `);
  // });

  // create logos
  const logosImages = logosG.selectAll(`image`)
    .data(areas)
    .enter()
    .append(`image`);

  logosImages
    .attr(`xlink:href`, (d) => {
      return getPathToLogoImage(d, planIndex);
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

  const widthPlansWrapper = plansWrapper.clientWidth;
  const heightPlansWrapper = plansWrapper.clientHeight;

  const zoom = d3
    .zoom()
    .scaleExtent([MIN_ZOOM, MAX_ZOOM])
    // .translateExtent([
    //   [-240, -240],
    //   [widthPlansWrapper + 240, heightPlansWrapper + 240]
    // ])
    .on("zoom", zoomed);

  zoomsArr.push(zoom);

  function zoomed() {
    popperInstance.update();
    mainG.attr("transform", d3.event.transform);
  }

  svg.call(zoom);
}

// Переход со страницы магазина по указанному id
catchTargetPlace(getFloorIndexAndObjectOfPlaceId(placeId));

function getPathToLogoImage(d, index) {
  return d.logoSrc ? `logos/floor_${index+1}/${d.logoSrc}` : null;
}

function mouseroverPlansWrapperHandler(evt) {
  const target = evt.target;
  const pathNode = target.closest(`.plan-place`) || target.closest(`.plan-help-marker`);

  if (!pathNode) {
    return;
  }

  currentPathNode = pathNode;
  pathNode.classList.add(PLAN_PLACE_HOVERED_CLASS);

  renderPlanPopper(pathNode);
}

function mouseoutPlansWrapperHandler(evt) {
  if (evt.relatedTarget !== popper && currentPathNode) {
    popper.hidden = true;
    currentPathNode.classList.remove(PLAN_PLACE_HOVERED_CLASS);
  }
}

function mouseleavePopperHandler(evt) {
  const relatedTarget = evt.relatedTarget;
  const pathNode = relatedTarget.closest(`.plan-place`) || relatedTarget.closest(`.plan-help-marker`);

  if (!currentPathNode) {
    return;
  }

  if (pathNode !== currentPathNode || !pathNode) {
    popper.hidden = true;
    currentPathNode.classList.remove(PLAN_PLACE_HOVERED_CLASS);
  }
}

function clickZoomContainerHandler(evt) {
  const target = evt.target;
  const action = target.dataset.scaleAction;
  const svg = svgArr[toggleFloors.index];
  const zoom = zoomsArr[toggleFloors.index];

  if (action) {
    zoomActions[action](svg, zoom);
  }
}

function inputFilterFormHandler(evt) {
  const target = evt.target;
  const select = target.closest(`.filter-select`);

  if (!select) {
    return;
  }

  resetFilter(select);

  const filterName = select.name;
  let filterValue = parseInt(select.value, 10);
  filterValue = isNaN(filterValue) ? select.value : filterValue;

  placesPathsArr.forEach((paths, planIndex) => {
    const filteredPaths = paths
      .classed(PLAN_PLACE_FILTERED_CLASS, false)
      .filter(d => {
        if (d[filterName] instanceof Set) {
          if (filterValue === `all`) {
            return d[filterName].size;
          }
          return d[filterName].has(filterValue);
        }
      })
      .classed(PLAN_PLACE_FILTERED_CLASS, true);

    const filteredAreasCount = filteredPaths.size();
    const badgeValueNode = document.querySelectorAll(`.aero-plans-toggle-floors__badge-value`)[planIndex];

    badgeValueNode.textContent = filteredAreasCount || ``;
  });
}

function resetFormHandler(evt) {
  removePlacesCountBadge();
  removeClassFilteredAreas();
}

// var input = document.getElementById("myinput");
const awesomeplete = new Awesomplete(searchInput, {
  // list: "#places-list",
  minChars: 1,
  // data(text, input) {
  //   console.log(text, input);
  //   return input;
  // }
});
// console.log(awesomeplete);


searchInput.addEventListener(`awesomplete-selectcomplete`, function (evt) {
  const value = evt.text.value;

  // Поиск по названию
  catchTargetPlace(getFloorIndexAndObjectOfPlaceIdOnSearch(value));

})

function inputSearchInputHandler(evt) {
  console.log(`input`);

  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    return;
  }

  const resultsArr = [];

  for (let floor = 0; floor < aeroPlans.length; floor++) {
    const areas = aeroPlans[floor].areas;

    const filteredAreas = areas.filter((area) => {
      const synonymsStr = area.synonyms.join().toLowerCase();
      const result = synonymsStr.search(value) != -1;
      // console.log(result);

      return result;
    });

    resultsArr.push(filteredAreas);
  }

  const resultsArrFlat = resultsArr.flat();

  // searchDatalist.innerHTML = ``;
  awesomeplete.list = createOptionsDatalist(resultsArr);
}

function submitSearchFormHandler(evt) {
  evt.preventDefault();
  const value = searchInput.value;

  if (!value) {
    return;
  }

  console.log(`search`);


  // Поиск по названию
  // catchTargetPlace(getFloorIndexAndObjectOfPlaceIdOnSearch(value));
}

function resetFilter(currentSelectNode) {
  const selectNodes = filterForm.querySelectorAll(`select`);

  [...selectNodes].forEach((it) => {
    if (it !== currentSelectNode) {
      it.selectedIndex = 0;
    }
  });
}

function createToggleFloorsControls() {
  d3
    .select(`.aero-plans-toggle-floors`)
    .selectAll(`.aero-plans-toggle-floors__item`)
    .data(aeroPlans)
    .enter()
    .append(`li`)
    .classed(`aero-plans-toggle-floors__item`, true)
    .html((d, i) => {
      let floor = i + 1;

      return `
      <button class="aero-plans-toggle-floors__button" type="button" data-floor-id="${floor}">${floor} этаж</button>
        <span class="aero-plans-toggle-floors__badge">
          <span class="aero-plans-toggle-floors__badge-caption visually-hidden">Общее количество найденных мест</span>
          <span class="aero-plans-toggle-floors__badge-value"></span>
        </span>
      `;
    });
}

function calcLogoPosition(d, property) {
  if (!d.logoSrc) {
    return null;
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

function createOptionsList(optionslist) {
  const optionsFragment = document.createDocumentFragment();

  for (let item in optionslist) {
    let optionEl = new Option(item, optionslist[item])
    optionsFragment.appendChild(optionEl);
  }

  return optionsFragment;
}

function createOptionsDatalist(areasList) {
  const resultArr = [];

  for (let index = 0; index < areasList.length; index++) {
    let numberFloor = index + 1;
    const floor = areasList[index];

    floor.forEach((area) => {
      const title = area.title;
      const description = area.description;
      const floor = numberFloor;
      const result = {
        label: `<b>${title}</b> ${description} (${floor} этаж)`,
        value: title
      };

      resultArr.push(result);
    });
  }

  console.dir(resultArr);

  return resultArr;
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

  removeClassSelectedAreas();

  toggleFloors.toggleControls(floorIndex);
  toggleFloors.toggleTabContent(floorIndex);
  place.classList.add(PLAN_PLACE_SELECTED_CLASS);
  const placeBBox = place.getBBox();
  const cx = placeBBox.x + placeBBox.width / 2;
  const cy = placeBBox.y + placeBBox.height / 2;
  let scale = 0.95 * Math.min(dimensionFloorsArr[floorIndex].width / placeBBox.width, dimensionFloorsArr[floorIndex].height / placeBBox.height);

  if (scale < MIN_ZOOM) {
    scale = MIN_ZOOM
  } else if (scale > MAX_ZOOM) {
    scale = MAX_ZOOM;
  }

  let translate = [(dimensionFloorsArr[floorIndex].width / 2 - scale * cx), (dimensionFloorsArr[floorIndex].height / 2 - scale * cy)];

  svgArr[floorIndex]
    .transition()
    .duration(800)
    .call(zoomsArr[floorIndex].transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

  renderPlanPopper(place);
}

function renderPlanPopper(pathNode) {
  const title = pathNode.dataset.title || ``;
  const description = pathNode.dataset.description || ``;
  const linkUrl = pathNode.dataset.linkUrl || ``;
  const linkText = pathNode.dataset.linkText || ``;
  const link = `<a href="${linkUrl}" target="_blank">${linkText}</a>`;
  const buttonText = pathNode.dataset.buttonText || ``;
  const button = `<button type="button">${buttonText}</button>`;

  popper.innerHTML = `
    <h2 class="aero-plan-popper__title">${title}</h2>
    <p>${description}</p>
    <p>${link}</p>
    <p>${button}</p>
  `;
  popperInstance.update();
  popperInstance.reference = pathNode;
  popper.hidden = false;
}

function removeClassSelectedAreas() {
  const selectedPaths = document.querySelectorAll(`.${PLAN_PLACE_SELECTED_CLASS}`);
  [...selectedPaths].forEach((it) => {
    it.classList.remove(PLAN_PLACE_SELECTED_CLASS);
  });
}

function removeClassFilteredAreas() {
  const selectedPaths = document.querySelectorAll(`.${PLAN_PLACE_FILTERED_CLASS}`);
  [...selectedPaths].forEach((it) => {
    it.classList.remove(PLAN_PLACE_FILTERED_CLASS);
  });
}

function removePlacesCountBadge() {
  const badgesValueNodes = document.querySelectorAll(`.aero-plans-toggle-floors__badge-value`);
  [...badgesValueNodes].forEach((it) => {
    it.textContent = ``;
  });
}

function getTargetIdFromAreaObj(placeObj) {
  return placeObj.id;
}

function getFloorIndexAndObjectOfPlaceId(id) {
  let floorIndex = 0;
  let areaObj = null;
  id = parseInt(id, 10);

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
  let floorIndex = 0;
  let areaObj = null;
  value = value.toLowerCase().trim();

  for (let i = 0; i < aeroPlans.length; i++) {
    let areas = aeroPlans[i].areas;
    floorIndex = i;
    areaObj = areas.find((place) => {
      const synonyms = place.synonyms.map((word) => word.toLowerCase().trim());
      const title = place.title.toLowerCase();

      return synonyms.includes(value) || title.includes(value);
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
