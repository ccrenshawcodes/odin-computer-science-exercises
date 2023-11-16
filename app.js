function mergeSort (arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        const half = Math.ceil(arr.length / 2);
        const left = mergeSort(arr.slice(0, half));
        const right = mergeSort(arr.slice(half));

        const sortedArr = [];
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
}

console.log(mergeSort([5, 7, 3, 2, 1, 4]));