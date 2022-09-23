---
title: hooks
tags:
  - react
emoji: 🗒️
link: https://github.com/lvdezhong
modified: 2021-04-23
---

# useState



```javascript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

`useState` 会返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。



> **注意**
>
> 你可能想知道：为什么叫 `useState` 而不叫 `createState`?
>
> “Create” 可能不是很准确，因为 state 只在组件首次渲染的时候被创建。在下一次重新渲染时，`useState` 返回给我们当前的 state。否则它就不是 “state”了！这也是 Hook 的名字*总是*以 `use` 开头的一个原因。



与 class 组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象。你可以用函数式的 `setState` 结合展开运算符来达到合并更新对象的效果

```javascript
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});
```

`useReducer` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。



### 惰性初始 state

`initialState` 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```



### 跳过 state 更新

调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较 state。）



### 一些坑

* **State类型为Object或者Array时，setState无法生效。**

*说明：*

当我们state所定义的state类型为Object或Array时，在回调中直接setState是无法成功的，demo如下：

```javascript
function App() {
  const [obj, setObj] = useState({
    num:1
  });
  const clickMe = () => {
    setObj(v => {
      let newObj = v
      newObj.num = v.num + 1 // 直接修改num的值不成功
      return newObj
    })
  }
  return (
    <button onClick={clickMe}>{obj.num}</button>
	);
}
```

此时num的值一直为1。

*原因：*

由于Object为引用类型，setState通过回调函数的形式赋值，其参数v存的是obj的地址，此时let newObj = v操作将newObj指向obj的地址，由于react中state是只读的，因此newObj.num = v.num + 1这个操作相当于obj.num = obj.num +1,因此无法成功。

*解决方案：*

通过浅拷贝或者深拷贝可解决此问题，将代码修改如下：

```javascript
function App() {
  const [obj,setObj] = useState({
    num:1
  });
  const clickMe = () => {
    setObj(v => {
      let newObj = Object.assign({}, v)   // 对v进行浅拷贝
      newObj.num = v.num + 1
      return newObj
    })
  }
  return (
    <button onClick={clickMe}>{obj.num}</button>
	);
}
```



* **setState后值未立即发生变化**

*说明：*

修改state后，如果直接调用此state，你会发现state的值未发生改变，demo如下：

```javascript
function App() {
  const [num, setNum] = useState(0);
  const clickMe = () => {
    setNum(num + 1)
   	console.log(num)
  }
  return (
    <button onClick={clickMe}>{num}</button>
	);
}
```

此时点击button，第一次button显示的num值变为1，而后台的num值显示为0，多次点击，后台总比视图要少1。

![](https://raw.githubusercontent.com/lvdezhong/figure-bed/master/img/202004151135318.png)

*原因：*

与react的更新有关，当调用setState时，react是异步更新state的，如果setState后立即获取state的值，此时state尚未更新，因此为旧的状态。

解决方案：

修改state的同时需要使用state的值时，建议使用函数的方式修改并进行相关的使用操作，将上面的方法修改如下：

```javascript
function App() {
  const [num,setNum] = useState(0);
  const clickMe = () => {
    setNum(num => {
    let newVal = num + 1
    console.log(newVal)
    return num+1
    })
  }
  return (
    <button onClick={clickMe}>{num}</button>
	);
}
```



* **异步获取的state值不是最新的state值**

*说明：*

当我们在一个异步函数中获取state值时，如果异步未执行完成时修改这个state的值，异步结束后获取的值仍然为原来的值，具体demo如下：

```javascript
function App() {
  const [num, setNum] = useState(0);
  const clickMe = () => {
    setTimeout(() => alert(num), 2000);
  };
  return (
    <>
      <button onClick={clickMe}>click me</button>
      <input
        onChange={e => {
          setNum(e.target.value);
        }}
      />
    </>
  );
}
```

在输入框先输入一组数字，点击click me后再输入几个数字，弹出的信息为click时的数字。

![](https://raw.githubusercontent.com/lvdezhong/figure-bed/master/img/20200421174819805.png)

*原因：*

这是由于函数组件中state是闭包的，因此每次调用函数获取的state只与当时的值有关（为什么要这样设计可查看dan的文章：[函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)）。设想如果setTimeout是一个请求，那么请求成功后我们想要的应该是调用这个函数时的state，但有时候我们就是需要修改后的state，所以我们要使用其他方法去获取这个值。

*解决方案：*

通过useRef获取当前值，useRef 返回一个可变的 ref 对象，num变化时修改numRecent.current的值，可将numRecent的值保持最新状态。

```javascript
function App() {
 const [num, setNum] = useState(0);
 const numRecent = useRef('');
 const clickMe = () => {
   setTimeout(() => alert(numRecent.current), 2000);
 };
 return (
   <>
     <button onClick={clickMe}>click me</button>
     <input
       onChange={e => {
         numrecent.current = e.target.value;
         setNum(e.target.value);
       }}
     />
   </>
 );
```

此时state始终与视图保持一致。



# useEffect



```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。



副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

```javascript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

```



在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState` 的比较逻辑解决：

```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

这是很常见的需求，所以它被内置到了 `useEffect` 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```



# 自定义 Hook



自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “`use`” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。 `useSomething` 的命名约定可以让我们的 linter 插件在使用 Hook 的代码中找到 bug。

```javascript
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

它将 `friendID` 作为参数，并返回该好友是否在线：

现在我们可以在两个组件中使用它：

```javascript
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```javascript
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

这两个组件的 state 是完全独立的。Hook 是一种复用*状态逻辑*的方式，它不复用 state 本身。事实上 Hook 的每次*调用*都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。



# 在多个 Hook 之间传递信息



由于 Hook 本身就是函数，因此我们可以在它们之间传递信息。

我们将使用聊天程序中的另一个组件来说明这一点。这是一个聊天消息接收者的选择器，它会显示当前选定的好友是否在线:

```javascript
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```



Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中）



