import city from './area'
let lodash = require('lodash');

import request from '../api/util';
let options = { url: 'https://mh.gxmd666.com/api/v1/upload/area', method: 'post', data: {}, header: {} };
console.log('dataeee: ', options);
request(options).then(data => {
    console.log('data111: ', data);
})
let cityObj = {};
lodash.forEach(city.data, function (value1) {
    if (value1.children.length !== 0) {
        lodash.forEach(value1.children, function (value2) {
            if (value2.children.length !== 0) {
                lodash.forEach(value2.children, function (value3) {
                    cityObj[value3.value] = {
                        value: value3.value,
                        parentId: value3.parentId,
                        name: value3.name,
                        parentName: value3.parentName
                    }
                });
            }
            cityObj[value2.value] = {
                value: value2.value,
                parentId: value2.parentId,
                name: value2.name,
                parentName: value2.parentName
            }
        });
        cityObj[value1.value] = {
            value: value1.value,
            parentId: value1.parentId,
            name: value1.name,
            parentName: value1.parentName
        }
    }
});

export const cityList = city.data;
export function getCityInfo(d) {
    let result = {
        cityCode: [],
        CityName: ""
    }
    let cityInfo = cityObj[d];
    if (typeof cityInfo === "undefined") {
        return result;
    }
    while (cityInfo.parentId !== 0) {
        result.cityCode.unshift(cityInfo.value);
        result.CityName = cityInfo.name + " " + result.CityName;
        cityInfo = cityObj[cityInfo.parentId];
        if (typeof cityInfo === "undefined") {
            result.CityName = result.CityName.replace(/^\s+|\s+$/g, "");
            return result;
        }
    }
    result.CityName = result.CityName.replace(/^\s+|\s+$/g, "");
    return result;
}
// 省市归类底下所有的区
export function getSummaryArea(areaIdList) {
    let serviceArea = [];
    let areaData = [];
    areaIdList.forEach(element => {
        let addr = getCityInfo(element).CityName.split(" ");
        let areaName = addr[addr.length - 1];
        addr.splice(-1, 1);
        areaData.push({
            city: addr.join(" "),
            area: areaName,
            code: element
        });
    });
    areaData.forEach(ar => {
        let result = serviceArea.findIndex(item => item.cityName == ar.city);
        if (result == -1) {
            serviceArea.push({
                cityName: ar.city,
                areaName: ar.area,
                code: [ar.code]
            });
        } else {
            serviceArea[result].code.push(ar.code);
            serviceArea[result].areaName += " " + ar.area;
        }
    });
    return serviceArea;
};