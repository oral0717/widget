// 21.实现一个打点计时器，要求
// 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
// 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
// 3、第一个数需要立即输出

// 16.计算字符串的长度，排除空格,加上u修饰符，可以匹配码点大于0xFFFF的Unicode字符
function codePointLength(text){
  let result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
const s16 = "𠮷𠮷"
s16.length//4
codePointLength(s16) //2

// 15.为 String 扩展原型方法 byteLength(),计算字符串字节长度;字符串可能含有汉字，汉字有2个字节
String.prototype.byteLength = function() {  //获取字符串的字节数，扩展string类型方法
  let byte = 0
  const len = codePointLength(this)  //初始化字节数递加变量并获取字符串参数的字符个数,使用16题中的方法计算字符串长度
  if(len) {  //如果存在字符串，则执行计划
      for(let i = 0; i < len; i ++) {  //遍历字符串，枚举每个字符
          if(this.charCodeAt(i) > 255) {  //字符编码大于255，说明是双字节字符
              byte += 2  //则累加2个
          }else {
              byte ++  //否则递加一次
          }
      }
      return byte //返回字节数
  } else {
      return 0  //如果参数为空，则返回0个
  }
}
const str15 = '张张'
const str15_2= '𠮷𠮷'
str15.byteLength()// 4,字节数
str15.length // 2,字符数量，对于码点大于0xFFFF的Unicode识别有误
str15_2.byteLength()// 4,字节数
str15_2.length // 4,字符数量，对于码点大于0xFFFF的Unicode识别有误

// 14.号码/字符串target前start位后end位正常显示，中间n位用n个*表示,字符串可含汉字
function hideInfo(target,start,end){
  const targetStr = target.toString()
  const targetArr = Array.from(targetStr)
  let hiddenTargetArr = []

  if(start + end < targetArr.length){
    hiddenTargetArr = targetArr.map((item,index)=>{
      if(index >= start && index < targetArr.length - end){
        return '*'
      }
      else {
        return item
      }
    })
    return hiddenTargetArr.join('')
  }
  else{
    return targetStr
  }
}
function hideInfo(target,start,end){
  const targetStr = target.toString()
  // const targetLen = targetStr.length  //码点大于0xFFFF的 Unicode 字符,计算有误
  const targetLen = codePointLength(targetStr)// 使用16题中的方法计算字符串长度
  if(start + end < targetLen){
    // ()小括号里有两个子表达式，对应$1,$2;正则里要用变量，需要new RegExp()转化后使用
    // 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
    const reg = new RegExp(`(.{${start}}).+(.{${end}})`,'u')
    // replace第二个参数可以跟函数，str表示匹配reg的字符串，str1表示子表达式1匹配的字符串，str2表示子表达式2匹配的字符串
    const result = targetStr.replace(reg,(str,str1,str2)=>{
      let hiddenPart = ''
      for (let i = 0; i < targetLen - start - end; i++){
        hiddenPart +='*'
      }
      return str1 + hiddenPart + str2
    })
    return result
  }else{
    return targetStr
  }
}
hideInfo('3407211988030𠮷5122',11,6)//"34072119880*0𠮷5122"

// 13.js 代码中 parseInt 的调用方式，使之通过全部测试用例
function parseInt2(num){
  return parseInt(num, 10)//参数2设置进制，2~36，超出范围将NaN
}
parseInt2('12')//12
parseInt2('12px')//12

// 12.在数组 arr 中，查找值与 item 相等的元素出现的所有位置
function findPosition(arr, item){
  const position =[]
  arr.forEach((i,index)=>{
    if(i === item){
      position.push(index)
    }
  })
  return position
}
findPosition([1,2,3,4,3,3,5,3],3)//[2,4,5,7]

// 11.为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
function square(arr){
  const newArr = arr.map((item, index)=>{// map返回执行结果,如果没有return语句，则返回undefined
    return item * item
  })
  return newArr
}
function square(arr){
  const newArr = []
  arr.forEach((item, index)=>{// forEach没有返回值
    newArr.push(item * item)
  })
  return newArr
}
square([1,2,4,5])// [1,4,16,25]

// 10.找出数组 arr 中重复出现过的元素
function selectRepeatItem(arr){
  const arrObj = []
  const repeatArr = []
  const newArr = Array.from(new Set(arr))// 数组去重

  for(let i of newArr){
    arrObj.push({item: i, count: 0})
  }
  // 计算arr中的各个元素数量
  for( let i of arr) {
    for(let j of arrObj){
      if (i === j.item){
        j.count += 1
      }
    }
  }
  // 计数字段大于1，说明对应item是重复元素
  for (let i of arrObj){
    if(i.count > 1){
      repeatArr.push(i.item)
    }
  }

  return repeatArr
}
function selectRepeatItem(arr){}
selectRepeatItem([1, 2, 4, 4, 3, 3, 1, 5, 3]);// 1,4,3

// 9.统计数组 arr 中值等于 item 的元素出现的次数
function countItem(arr, item){
  let count = 0
  for(let i of arr){
    if (i === item){
      count += 1
    }
  }
  return count
}
countItem([1,'a','b','a','c','a'],'a')// 3

// 8.在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
function addItemInIndex(arr,item,index){
  const newArr = [...arr]
  newArr.splice(index,0,item)// 三个参数：要插入的位置，要删除的项数，要插入的元素
  return newArr
}
addItemInIndex([1,2,4],'3',2)//[1,2,'3',4]

// 7.合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
function concat(arr1,arr2){
  const newArr = arr1.concat(arr2)
  return newArr
}
concat([1,2],[4,'b'])//[1,2,4,'b']

// 6.删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组
function delArrItem(arr){
  const a = [...arr]
  a.shift()
  return a
}
delArrItem([1,2,4,6])//[2,4,6]

// 5.删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
function truncate(arr){
  const a = [...arr]
  a.pop()
  return a
}
truncate([1,2,3])

// 4.在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
function addArrayItem(arr = [], item){
  let newArr = []
  newArr = arr.concat([item])
  return newArr
}
addArrayItem([1,2,3],6)

// 3. 移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
function removeSelfSameItem(arr = [], item){
  if (arr.length <= 0){
    return []
  }
  const arrObjWithIndex = new Map( arr.map((itemA,indexA) => [indexA, itemA]) ) // 创建以arr的index为键，item为值的Map对象
  for (let [index, itemCur] of arrObjWithIndex){
    if (itemCur === item){
      arr.splice(index, 1)
    }
  }
  return arr
}
removeSelfSameItem([1,2,5], 5)// [1,2]

// 2.移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
function removeSameItem(arr = [], item){
  if (arr.length <= 0){
    return []
  }
  const newArr = []
  for (let i of arr) {
    if (i !== item){
      newArr.push(i)
    }
  }
  return newArr
}
removeSameItem([1,2,5], 5) // [1,2]

// 1. 计算给定数组 arr 中所有元素的总和 （数组中的元素均为 Number 类型）
function sum(arr = []) {
  if (arr.length <= 0){
    return 0
  }
  const total = arr.reduce((prev, cur) => {
    return prev + cur
  })
  return total
}
sum([1, 2, 3, 4, 5]) //15