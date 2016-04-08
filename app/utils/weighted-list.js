let rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

let getRandomItem = function(list, weight) {
    let total_weight = weight.reduce(function (prev, cur, i, arr) { // jshint ignore:line
        return prev + cur;
    });

    let random_num = rand(0, total_weight);
    let weight_sum = 0;
    //console.log(random_num)

    for (let i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return list[i];
        }
    }

    // end of function
};

// let list = ['javascript', 'php', 'ruby', 'python'];
// let weight = [0.5, 0.2, 0.2, 0.1];
// let random_item = getRandomItem(list, weight);

export default function weightedList(list, weights) {
  let randomItem = getRandomItem(list, weights);
  return randomItem;
}
