/**
 * 概念：为一组的复杂的子系统接口提供一个更高级的统一接口。通过这个接口使得对子系统接口访问更容易。
 * 在js里有时用于对底层结构兼容性做统一封装来简化用户使用
 * 
 * 我们封装addEventListener的兼容性的时候就用到了，还有在项目中会对axios进行封装使用其实也算
 */

function addEvent(dom,type,fn){
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
    }else if(dom.attachEvent){
        dom.attachEvent('on' + type,fn)
    }else{
        dom['on' + type ]= fn;
    }
}