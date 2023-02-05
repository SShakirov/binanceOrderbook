import {computed, onBeforeUnmount, type Ref, ref, type ComputedRef, ObjectDirective} from 'vue';

interface Interception {
  elementsInRow: number,
  interceptionIndex: number,
  observer: IntersectionObserver | null,
}

interface ObserverReturn {
  getElementsInRow: ComputedRef<number>,
  startListeners: () => void,
  vSetObserver: ObjectDirective,
}

type VoidFunction = (()=>void);

type TargetRuleFunction = ((observer:IntersectionObserver)=>void)
/**
 * Метод Инициализации обсервера
 * @param {Ref<HTMLElement | string>} observedContainerRef наблюдаемый контейнер
 * @param {VoidFunction | null} action ф-ция выполняемая в observingAction
 * @param {VoidFunction | null} targetRule ф-ция выбора цели обсервера
 * @param {Number} threshold процент появления для срабатывания функции
 * @param {Boolean} isDisposable снимается ли наблюдение после выполнения ф-ции
 * @param {VoidFunction | null} unobservingAction ф-ция выполняемая при остановке наблюдения
 * @return {ObserverReturn} возврат функций и хуков в компонент */

export default function useObserver(
    observedContainerRef: Ref<HTMLElement | null>,
    action: VoidFunction | null,
    targetRule: TargetRuleFunction | null = null,
    threshold = 0.1,
    isDisposable = true,
    unobservingAction: VoidFunction | null = null): ObserverReturn {
  const interception = ref<Interception>({
    elementsInRow: 0,
    interceptionIndex: 0,
    observer: null,
  });

  let observedContainer: HTMLElement | null;


  const getElementsInRow = computed(() => interception.value.elementsInRow);


  const countElementsInRow = function() {
    if (!observedContainer) return;
    const singleItem = observedContainer.children.item(0);
    if (!(singleItem instanceof HTMLElement)) return;
    const itemStyle = window.getComputedStyle(singleItem);
    const itemWidth = singleItem.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
    const gridStyle = window.getComputedStyle(observedContainer);
    const gridWidth =
            observedContainer.clientWidth - (parseFloat(gridStyle.paddingLeft) + parseFloat(gridStyle.paddingRight));
    interception.value.elementsInRow = Math.floor(gridWidth / itemWidth);
  };

  const countInterceptionIndex = function() {
    if (!observedContainer) return;
    const lastRowCards =
            observedContainer.children.length % interception.value.elementsInRow || interception.value.elementsInRow;
    interception.value.interceptionIndex =
            observedContainer.children.length - lastRowCards - (interception.value.elementsInRow - 1);
    if (interception.value.interceptionIndex < 0) interception.value.interceptionIndex = 0;
  };

  const observerTargetAdd = function() {
    if (!observedContainer) return;
    if (targetRule && interception.value.observer) return targetRule(interception.value.observer);
    const target = observedContainer.children[interception.value.interceptionIndex];
    if (!target) return;
    interception.value.observer?.observe(target);
  };

  const onElementObserved = function(entries: Array<IntersectionObserverEntry>) {
    entries.forEach(({isIntersecting, target}) => {
      if (!isIntersecting) {
        if (unobservingAction) {
          unobservingAction();
        }
        return;
      }
      if (isDisposable) interception.value.observer?.unobserve(target);
      if (isIntersecting) observingAction();
    });
  };

  const observingAction = function() {
    action?.();
  };

  const created = function() {
    interception.value.observer = new IntersectionObserver(onElementObserved, {threshold});
  };

  const startListeners = () => {
    window.addEventListener('resize', countElementsInRow);
  };

  const refreshData = () => {
    setTimeout(() => {
      observedContainer = observedContainerRef.value;
      countElementsInRow();
      countInterceptionIndex();
      observerTargetAdd();
    }, 100);
  };

  onBeforeUnmount(() => {
    interception.value.observer?.disconnect();
  });

  const vSetObserver = {
    mounted: () => {
      refreshData();
    },
    updated: () => {
      refreshData();
    },
  };


  created();

  return {
    getElementsInRow,
    startListeners,
    vSetObserver,
  };
}
