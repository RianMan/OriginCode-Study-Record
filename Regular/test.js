/** 匹配一个16进制的颜色值
#ffbbad
#Fc01DF
#FFF
#ffE
 */
const str = '#ffbbad #Fc01DF #FFF #ffE #ddZ0'
const colorReg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
console.log(str.match(colorReg))

// 匹配时间 '23:11 11:11 9:10 99:22'
const timeStr = '23:11 11:11 9:10 99:22';
const timeReg = /([2][0-3]|[0-1][0-9]):[1-5][0-9]/g;
const timeReg1 = /^([2][0-3]|0?[0-9]|1[0-9]):[1-5][0-9]$/g;
// console.log(timeStr.match(timeReg1))
console.log(timeReg1.test('02:11'))

// 匹配日期 'YYYY-MM-DD'
const dateStr = '2017-06-10'; 
const dateReg = /^[0-9]{4}-([0][1-9]|[1][0-2])-([0][1-9]|[12][0-9]|[3][0-1])$/g;
console.log(dateReg.test(dateStr))

// 匹配html 拿出id
const htmlStr = '<div id="container" class="main"></div>';
const htmlReg = /id=".*?"/
console.log(htmlStr.match(htmlReg)[0])

// 添加千分符
const strNumber = '188990002 18899' 
// ===>> const str = '188,990,002'
const regNumber = /\B(?=(\d{3})+\b)/g;
console.log(strNumber.replace(regNumber, ','));

// 货币格式化
const strPrice = '188' 
//¥ 188.00
const regPrice = /\b(?=\d+)/g;
console.log(strPrice.replace(regPrice, '$ '));

//密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符。
const regPassword = /\d{6,12}/;
const ps = '123'
console.log(regPassword.test(ps))

