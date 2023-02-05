import {ref} from 'vue';

export type IEmitModal = (event: 'closeModal') => void

interface ModalFunctions {
  closeModal: () => void,
  clickByContainer: () => void,
}

/**
 * Хук с обработкой поведения модальных окон
 * @param {IEmitModal} emits - Эмиты
 * @return {Object}
 **/
export default function useModal(emits: IEmitModal) : ModalFunctions {
  const isNoClose = ref(false);

  const closeModal = (): void => {
    if (isNoClose.value) {
      isNoClose.value = false;
      return;
    }

    emits('closeModal');
  };

  const clickByContainer = (): void => {
    isNoClose.value = true;
  };

  return {closeModal, clickByContainer};
}
