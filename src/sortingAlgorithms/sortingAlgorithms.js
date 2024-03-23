// sortingAlgorithms.js

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
      let pivotIndex = partition(mainArray, startIdx, endIdx, animations);
      quickSortHelper(mainArray, startIdx, pivotIndex - 1, animations);
      quickSortHelper(mainArray, pivotIndex + 1, endIdx, animations);
    }
  }
  
  function partition(mainArray, startIdx, endIdx, animations) {
    let pivot = mainArray[endIdx];
    let i = startIdx - 1;
    for (let j = startIdx; j <= endIdx - 1; j++) {
      if (mainArray[j] < pivot) {
        i++;
        [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
        animations.push([i, j]);
      }
    }
    [mainArray[i + 1], mainArray[endIdx]] = [mainArray[endIdx], mainArray[i + 1]];
    animations.push([i + 1, endIdx]);
    return i + 1;
  }
  
  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function heapSortHelper(mainArray, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    if (left < n && mainArray[left] > mainArray[largest]) {
      largest = left;
    }
  
    if (right < n && mainArray[right] > mainArray[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      [mainArray[i], mainArray[largest]] = [mainArray[largest], mainArray[i]];
      animations.push([i, largest]);
      animations.push([i, largest]);
      animations.push([i, mainArray[i]]);
      animations.push([largest, mainArray[largest]]);
      heapSortHelper(mainArray, n, largest, animations);
    }
  }
  
  function heapSort(mainArray, animations) {
    let n = mainArray.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapSortHelper(mainArray, n, i, animations);
    }
  
    for (let i = n - 1; i > 0; i--) {
      [mainArray[0], mainArray[i]] = [mainArray[i], mainArray[0]];
      animations.push([0, i]);
      animations.push([0, i]);
      animations.push([0, mainArray[0]]);
      animations.push([i, mainArray[i]]);
      heapSortHelper(mainArray, i, 0, animations);
    }
  }
  
  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations;
  }
  
  function bubbleSort(mainArray, animations) {
    let n = mainArray.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (mainArray[j] > mainArray[j + 1]) {
          [mainArray[j], mainArray[j + 1]] = [mainArray[j + 1], mainArray[j]];
          animations.push([j, j + 1]);
          animations.push([j, j + 1]);
          animations.push([j, mainArray[j]]);
          animations.push([j + 1, mainArray[j + 1]]);
        }
      }
    }
  }
  
  export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations;
  }