---
title: Proxy
tags:
  - javascript
emoji: 🗒️
link: https://github.com/lvdezhong
modified: 2022-10-06
---

# 详解JavaScript中的Proxy(代理)

Proxy是ES6中提供的新的API，可以用来定义对象各种基本操作的自定义行为 （在文档中被称为traps，我觉得可以理解为一个针对对象各种行为的钩子），拿它可以做很多有意思的事情，在我们需要对一些对象的行为进行控制时将变得非常有效。



## 语法

创建一个`Proxy`的实例需要传入两个参数

* `target` 要被代理的对象，可以是一个`object`或者`function`
* `handlers`对该代理对象的各种操作行为处理

```javascript
let target = {}
let handlers = {} // do nothing
let proxy = new Proxy(target, handlers)

proxy.a = 123

console.log(target.a) // 123
```

在第二个参数为空对象的情况下，基本可以理解为是对第一个参数做的一次浅拷贝
*（Proxy必须是浅拷贝，如果是深拷贝则会失去了代理的意义）*



## Traps(各种行为的代理)

就像上边的示例代码一样，如果没有定义对应的`trap`，则不会起任何作用，相当于直接操作了`target`。

当我们写了某个`trap`以后，在做对应的动作时，就会触发我们的回调函数，由我们来控制被代理对象的行为。

最常用的两个`trap`应该就是`get`和`set`了。

早年`JavaScript`有着在定义对象时针对某个属性进行设置`getter`、`setter`：

```javascript
let obj = {
  _age: 18,
  get age ()  {
    return `I'm ${this._age} years old`
  },
  set age (val) {
    this._age = Number(val)
  }
}

console.log(obj.age) // I'm 18 years old
obj.age = 19
console.log(obj.age) // I'm 19 years old
```

就像这段代码描述的一样，我们设置了一个属性`_age`，然后又设置了一个`get age`和`set age`。

然后我们可以直接调用`obj.age`来获取一个返回值，也可以对其进行赋值。

这么做有几个缺点：

* 针对每一个要代理的属性都要编写对应的`getter`、`setter`。
* 必须还要存在一个存储真实值的`key`*（如果我们直接在getter里边调用this.age则会出现堆栈溢出的情况，因为无论何时调用this.age进行取值都会触发getter）*。

`Proxy`很好的解决了这两个问题：

```javascript
let target = { age: 18, name: 'Niko Bellic' }
let handlers = {
  get (target, property) {
    return `${property}: ${target[property]}`
  },
  set (target, property, value) {
    target[property] = value
  }
}
let proxy = new Proxy(target, handlers)

proxy.age = 19
console.log(target.age, proxy.age)   // 19,          age : 19
console.log(target.name, proxy.name) // Niko Bellic, name: Niko Bellic
```

我们通过创建`get`、`set`两个`trap`来统一管理所有的操作，可以看到，在修改`proxy`的同时，`target`的内容也被修改，而且我们对`proxy`的行为进行了一些特殊的处理。

而且我们无需额外的用一个`key`来存储真实的值，因为我们在`trap`内部操作的是`target`对象，而不是`proxy`对象。



## 拿Proxy来做些什么

因为在使用了`Proxy`后，对象的行为基本上都是可控的，所以我们能拿来做一些之前实现起来比较复杂的事情。

在下边列出了几个简单的适用场景。



#### 解决对象属性为undefined的问题

在一些层级比较深的对象属性获取中，如何处理`undefined`一直是一个痛苦的过程，如果我们用`Proxy`可以很好的兼容这种情况。

```javascript
(() => {
  let target = {}
  let handlers = {
    get: (target, property) => {
      target[property] = (property in target) ? target[property] : {}
      if (typeof target[property] === 'object') {
        return new Proxy(target[property], handlers)
      }
      return target[property]
    }
  }
  let proxy = new Proxy(target, handlers)
  console.log('z' in proxy.x.y) // false (其实这一步已经针对`target`创建了一个x.y的属性)
  proxy.x.y.z = 'hello'
  console.log('z' in proxy.x.y) // true
  console.log(target.x.y.z)     // hello
})()
```

我们代理了`get`，并在里边进行逻辑处理，如果我们要进行`get`的值来自一个不存在的`key`，则我们会在`target`中创建对应个这个`key`，然后返回一个针对这个`key`的代理对象。

这样就能够保证我们的取值操作一定不会抛出`can not get xxx from undefined`
但是这会有一个小缺点，就是如果你确实要判断这个`key`是否存在只能够通过`in`操作符来判断，而不能够直接通过`get`来判断。



#### 普通函数与构造函数的兼容处理

如果我们提供了一个`Class`对象给其他人，或者说一个`ES5`版本的构造函数。
如果没有使用`new`关键字来调用的话，`Class`对象会直接抛出异常，而`ES5`中的构造函数`this`指向则会变为调用函数时的作用域。
我们可以使用`apply`这个`trap`来兼容这种情况：

```javascript
class Test {
  constructor (a, b) {
    console.log('constructor', a, b)
  }
}

// Test(1, 2) // throw an error
let proxyClass = new Proxy(Test, {
  apply (target, thisArg, argumentsList) {
    // 如果想要禁止使用非new的方式来调用函数，直接抛出异常即可
    // throw new Error(`Function ${target.name} cannot be invoked without 'new'`)
    return new (target.bind(thisArg, ...argumentsList))()
  }
})

proxyClass(1, 2) // constructor 1 2
```

我们使用了`apply`来代理一些行为，在函数调用时会被触发，因为我们明确的知道，代理的是一个`Class`或构造函数，所以我们直接在`apply`中使用`new`关键字来调用被代理的函数。

以及如果我们想要对函数进行限制，禁止使用`new`关键字来调用，可以用另一个`trap`:`construct`

```javascript
function add (a, b) {
  return a + b
}

let proxy = new Proxy(add, {
  construct (target, argumentsList, newTarget) {
    throw new Error(`Function ${target.name} cannot be invoked with 'new'`)
  }
})

proxy(1, 2)     // 3
new proxy(1, 2) // throw an error
```



#### 用Proxy来包装fetch

在前端发送请求，我们现在经常用到的应该就是`fetch`了，一个原生提供的API。
我们可以用`Proxy`来包装它，使其变得更易用。

```javascript
let handlers = {
  get (target, property) {
    if (!target.init) {
      // 初始化对象
      ['GET', 'POST'].forEach(method => {
        target[method] = (url, params = {}) => {
          return fetch(url, {
            headers: {
              'content-type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin',
            method,
            ...params
          }).then(response => response.json())
        }
      })
    }

    return target[property]
  }
}
let API = new Proxy({}, handlers)

await API.GET('XXX')
await API.POST('XXX', {
  body: JSON.stringify({name: 1})
})
```

对`GET`、`POST`进行了一层封装，可以直接通过`.GET`这种方式来调用，并设置一些通用的参数。



#### 实现一个简易的断言工具

写过测试的各位童鞋，应该都会知道断言这个东西
`console.assert`就是一个断言工具，接受两个参数，如果第一个为`false`，则会将第二个参数作为`Error message`抛出。
我们可以使用`Proxy`来做一个直接赋值就能实现断言的工具。

```javascript
let assert = new Proxy({}, {
  set (target, message, value) {
    if (!value) console.error(message)
  }
})

assert['Isn\'t true'] = false      // Error: Isn't true
assert['Less than 18'] = 18 >= 19  // Error: Less than 18
```



#### 统计函数调用次数

在做服务端时，我们可以用`Proxy`代理一些函数，来统计一段时间内调用的次数。
在后期做性能分析时可能会能够用上：

```javascript
function orginFunction () {}
let proxyFunction = new Proxy(orginFunction, {
  apply (target, thisArg. argumentsList) {
    log(XXX)

    return target.apply(thisArg, argumentsList)
  }
})
```



#### 全部的traps

这里列出了`handlers`所有可以定义的行为 *(traps)*：

| traps                    | description                                        |
| :----------------------- | :------------------------------------------------- |
| get                      | 获取某个`key`值                                    |
| set                      | 设置某个`key`值                                    |
| has                      | 使用`in`操作符判断某个`key`是否存在                |
| apply                    | 函数调用，仅在代理对象为`function`时有效           |
| ownKeys                  | 获取目标对象所有的`key`                            |
| construct                | 函数通过实例化调用，仅在代理对象为`function`时有效 |
| isExtensible             | 判断对象是否可扩展，`Object.isExtensible`的代理    |
| deleteProperty           | 删除一个`property`                                 |
| defineProperty           | 定义一个新的`property`                             |
| getPrototypeOf           | 获取原型对象                                       |
| setPrototypeOf           | 设置原型对象                                       |
| preventExtensions        | 设置对象为不可扩展                                 |
| getOwnPropertyDescriptor | 获取一个自有属性 *（不会去原型链查找）* 的属性描述 |

