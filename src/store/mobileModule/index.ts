import {defineStore} from 'pinia';
import {computed, ref} from 'vue';


export const useMobileHelper = defineStore('mobileHelper', () => {
  const currentWidth = ref(0);
  const desktopWidth = 1440;
  const tabletWidth = 1024;
  const mobileWidth2 = 600;
  const mobileWidth = 500;

  const getIsDesktop = computed((): boolean => {
    return currentWidth.value >= desktopWidth;
  });

  const getIsTablet = computed((): boolean => {
    return currentWidth.value <= tabletWidth;
  });

  const getIsMobile = computed((): boolean => {
    return currentWidth.value <= mobileWidth;
  });

  const getIsMobile2 = computed((): boolean => {
    return currentWidth.value <= mobileWidth2;
  });


  const setCurrentWidth = (width: number): void => {
    currentWidth.value = width;
  };


  const setListener = async (): Promise<void> => {
    setCurrentWidth(window.outerWidth);

    window.addEventListener('resize', () => {
      setCurrentWidth(window.outerWidth);
    });
  };

  return {
    getIsDesktop,
    getIsTablet,
    getIsMobile,
    getIsMobile2,

    setCurrentWidth,

    setListener,
  };
});

export default useMobileHelper;
