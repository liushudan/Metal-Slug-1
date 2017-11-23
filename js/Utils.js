class SortArray{
  filterArray(unsortedArray) {
    let tempSortedArray = [];
    for (let i = 0; i < unsortedArray.length; i++) {
      if (unsortedArray[i] != null) {
        tempSortedArray.push(unsortedArray[i]);
      }
    }
    return tempSortedArray;
  }
}
