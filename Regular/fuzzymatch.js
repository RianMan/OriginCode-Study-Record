// 横向模糊匹配
const str1 = 'abbc abc abbbbc abbsbc aabc abbbbbc';
const reg1 = /ab{1,5}c/g;
const result1 = str1.match(reg1);
console.log(result1)
// [ 'abbc', 'abc', 'abbbbc', 'abc' ]

// 纵向模糊匹配
const str2 = 'a0b a1b aab a2b a3b a99b';
const reg2 = /a[1,2,3]b/g;
const res2 = str2.match(reg2);
console.log(res2);
//[ 'a1b', 'a2b', 'a3b' ]
