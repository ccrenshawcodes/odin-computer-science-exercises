function mergeSort (arr) {
    const half = Math.ceil(arr.length / 2);
    let left;
    let right;
    let sortedArr = [];
    if (arr.length === 1) {
        return arr;
    } else {
        left = mergeSort(arr.slice(0, half));
        right = mergeSort(arr.slice(half));
    }
    while (left.length > 0 || right.length > 0) {
        if (left[0] < right[0] || right.length === 0) {
            sortedArr.push(left[0]);
            left.shift();
        } else if (right[0] < left[0] || left.length === 0) {
            sortedArr.push(right[0]);
            right.shift();
        }
    }
    return sortedArr;
}

//console.log(mergeSort([3, 2, 7, 4, 8, 5, 1, 6]));
