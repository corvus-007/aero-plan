export default class ToggleFloors {
  constructor(toggleControlList, floorsItems, initialIndex = 0) {
    this.toggleControlList = toggleControlList;
    this.toggleControlsItems = toggleControlList.querySelectorAll(`.aero-plans-toggle-floors__item`);
    this.floorsItems = floorsItems;
    this.index = initialIndex;
    this.toggleControlList.addEventListener(`click`, evt => {
      this.onClick(evt);
    });

    this.toggleControls(this.index);
    this.toggleTabContent(this.index);
  }

  onClick(evt) {
    const target = evt.target;
    const button = target.closest(`button`);

    if (!button) {
      return;
    }

    this.index = parseInt(target.dataset.floorId - 1, 10);
    this.toggleControls(this.index);
    this.toggleTabContent(this.index);
  }

  toggleControls(index) {
    this.index = index;

    [...this.toggleControlsItems].forEach((control, i) => {
      control.classList.toggle('aero-plans-toggle-floors__item--active', i == index);
    });
  }

  toggleTabContent(index) {
    this.index = index;

    [...this.floorsItems].forEach((floor, i) => {
      floor.classList.toggle('aero-plans__floor--active', i == index);
    });
  }
}
