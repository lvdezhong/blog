---
title: npm包的语义版本控制
tags:
  - node
emoji: 🗒️
link: https://github.com/lvdezhong
modified: 2021-04-23
---

# 使用npm的语义版本控制



语义版本控制（ semver）的概念很简单：所有的版本都有 3 个数字：x.y.z。

格式：**主版本号** **.** **次版本号** **.** **补丁版本号**

- 第一个数字是主版本。
- 第二个数字是次版本。
- 第三个数字是补丁版本。



当发布新的版本时，不仅仅是随心所欲地增加数字，还要遵循以下规则：

- 当进行不兼容的 API 更改时，则升级主版本。
- 当以向后兼容的方式添加功能时，则升级次版本。
- 当进行向后兼容的缺陷修复时，则升级补丁版本。



| 代码状态             |            阶段            | 规则                                              | 示例版本 |
| -------------------- | :------------------------: | ------------------------------------------------- | :------: |
| 首发                 |   新产品<br/>New product   | 从1.0.0开始                                       |  1.0.0   |
| 向后兼容的错误修复   | 补丁发布<br/>Patch release | 第三位数增加                                      |  1.0.1   |
| 向后兼容的新功能     | 次要发布<br/>Minor release | 中间数字增加<br/>并将最后一个数字重置为零         |  1.1.0   |
| 破坏向后兼容性的更改 | 主要发布<br/>Major release | 第一个数字增加<br/>并将中间和最后一个数字重置为零 |  2.0.0   |



语义版本控制使用了以下符号进行版本控制：

- `~`：如果写入的是 `~0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
- `^`：如果写入的是 `^0.13.0`，则要更新补丁版本和次版本：即 `0.13.1`、`0.14.0`...依此类推。
- `*`：如果写入的是 `*`，则表示接受所有的更新，包括主版本升级。
- `>`：接受高于指定版本的任何版本。
- `>=`：接受等于或高于指定版本的任何版本。
- `<=`：接受等于或低于指定版本的任何版本。
- `<`：接受低于指定版本的任何版本。
- `=`：接受确切的版本。
- `-`：接受一定范围的版本。例如：`2.1.0 - 2.6.2`。
- `||`：组合集合。例如 `< 2.1 || > 2.6`。

可以在范围内组合以上大部分内容，例如：`1.0.0 || >=1.1.0 <1.2.0`，即使用 `1.0.0` 或从 `1.1.0` 开始但低于 `1.2.0` 的版本。

还有其他的规则：

- 无符号: 仅接受指定的特定版本。
- `latest`: 使用可用的最新版本。