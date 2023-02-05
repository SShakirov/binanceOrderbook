import moment from 'moment-timezone';
import {computed, ref, watch} from 'vue';


export default function useTimer(date: Date = new Date()) {
  const now = ref<number>(Date.now());
  const dateEnd = ref<Date>(date);
  const pausedTime = ref<number | null>(null);

  const hours = ref<string | number>(0);
  const minutes = ref<string | number>(0);
  const seconds = ref<string | number>(0);

  const timerId = ref<number | null>(null);


  const countUntil = computed(() => {
    const timeZone = moment.tz.guess();
    const formatedDate = moment.tz(dateEnd.value, timeZone).toDate();

    return {
      date: formatedDate,
      milliseconds: formatedDate.getTime(),
    };
  });

  const leftTime = computed(() => countUntil.value.milliseconds - now.value);

  const isCountable = computed(() => now.value < countUntil.value.milliseconds);

  const getTimerParams = computed(() => {
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  });

  const updateTimerParams = () => {
    let s = Math.floor(leftTime.value / 1000); // seconds count
    let m = Math.floor(s / 60); // minutes count
    let h = Math.floor(m / 60); // hours count
    const d = Math.floor(h / 24); // days count

    s = s % 60;
    m = m % 60;
    h = h % 24;
    h += d * 24;

    hours.value = h;
    minutes.value = m ?? 0;
    seconds.value = s ?? 0;
  };

  const setEndDate = (newDate: Date) => {
    dateEnd.value = newDate;
    stopTimer();
    playTimer();
  };

  const updateNow = () => {now.value = Date.now()};

  const playTimer = () => {
    if (pausedTime.value) {
      playFromPausedTime();
    } else {
      updateNow();

      if (isCountable.value) {
        timerId.value = setInterval(updateNow, 1000);
      }
    }
  };

  const stopTimer = () => {
    if (timerId.value) clearInterval(timerId.value);
  };

  const playFromPausedTime = () => {
    if (pausedTime.value) {
      const timeInPause = Date.now() - pausedTime.value;

      addDateToEndDate(timeInPause);
      pausedTime.value = null;
    }
  };

  const addDateToEndDate = (addTime: number | string | Date ) => {
    let addMilliseconds;

    if (typeof addTime === 'object') {
      addMilliseconds = addTime?.getTime();
    } else if (typeof addTime === 'string') {
      addMilliseconds = new Date(addTime).getTime();
    } else {
      addMilliseconds = addTime;
    }

    const newEndDate = new Date(dateEnd.value.getTime() + addMilliseconds);

    setEndDate(newEndDate);
  };

  const pause = () => {
    pausedTime.value = Date.now();
    stopTimer();
  };

  const pauseTimerForSomeTime = (seconds: number) => {
    stopTimer();

    setTimeout(() => {
      playTimer();
    }, seconds * 1000);
  };

  watch(now, () => {
    if (isCountable.value) {
      updateTimerParams();
    } else {
      stopTimer();
    }
  }, {deep: true});

  return {
    getLeftTime: leftTime,
    isCountable: isCountable,
    getTimerParams: getTimerParams,
    setEndDate: setEndDate,
    addDateToEndDate: addDateToEndDate,
    playTimer: playTimer,
    pause: pause,
    stopTimer: stopTimer,
    pauseTimerForSomeTime: pauseTimerForSomeTime,
  };
}
