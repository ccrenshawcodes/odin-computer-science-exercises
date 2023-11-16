function fibs(n) {
    if (n === 2) {
        return [0, 1];
    } else {
        let arr = fibs(n - 1);
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
        return arr;
    }
}
