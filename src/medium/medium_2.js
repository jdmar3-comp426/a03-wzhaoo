import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/
let len = mpg_data.length;

/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: mpg_data.map(e=>e.city_mpg).reduce((a, b) => {return a+b})/len,
        highway: mpg_data.map(e=>e.highway_mpg).reduce((a, b) => {return a+b})/len
    },
    allYearStats: getStatistics(mpg_data.map(a=>a.year)),
    ratioHybrids: mpg_data.map(a=>a.hybrid).filter(Boolean).length/mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: hybridHelper(mpg_data),
    avgMpgByYearAndHybrid: undefined
};
function hybridHelper(arr){
    let makes = [];
    for(let i = 0; i<arr.length; i++){
        if(!makes.includes(arr[i].make)) makes.shift(arr[i].make);
    }
    let objs = [];
    for(let i = 0; i<makes.length; i++){
        objs.shift({make: makes[i], hybrids: mpg_data.filter(e=>e.make == makes[i]).map(a=>a.id)});
        if(objs[objs.length-1].hybrids.length == 0) objs.pop();
    }
    return objs.sort((a, b)=>{return b-a});
}
function yearHelper(arr){
    let years = [];
    for(let i = 0; i<arr.length; i++){
        if(!makes.includes(arr[i].year)) makes.shift(arr[i].year);
    }
    let objs = [];
    for(let i = 0; i<years.length; i++){
        objs.shift({year:
            {
                hybrids: mpg_data.filter(e=>e.year == years[i]).reduce((a, b) => {return a+b})
            }
        });
        if(objs[objs.length-1].hybrids.length == 0) objs.pop();
    }
    return objs;
}