export default {
    // 加
    add(num1, num2) {
        var r1, r2, m;
        try { r1 = num1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = num2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        return (num1 * m + num2 * m) / m;
    },
    // 减
    subtract(num1, num2) {
        var r1, r2, m, n;
        try { r1 = num1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = num2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((num1 * m - num2 * m) / m).toFixed(n);  //
    },
    // 乘
    multiply(num1, num2) {
        var m = 0, s1 = num1.toString(), s2 = num2.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    // 除
    divide(num1, num2) {
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = num1.toString().split(".")[1].length } catch (e) { }
        try { t2 = num2.toString().split(".")[1].length } catch (e) { }
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    //四舍五入，保留指定位数
    round(num, n) {
        n = n || 2;
        if (isNaN(num) || num == "") return 0;
        return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
    }
}
