---
title: typora
tags:
  - tool
emoji: 🗒️
link: https://github.com/lvdezhong
modified: 2021-07-18
---

## 综述

**Markdown** 是[Daring Fireball](https://link.jianshu.com?t=http://daringfireball.net/) 发明的，这是[官方的指导手册连接](https://link.jianshu.com?t=http://daringfireball.net/projects/markdown/syntax)。然而，其语法根据不同的编辑器和编辑者而异。**Typora**使用的是[GitHub Flavored Markdown](https://link.jianshu.com?t=https://help.github.com/categories/writing-on-github/) 。

注意，Markdown中的html片段会被识别，但是不会实时解析或呈现，另外，原始的Markdown源文件被保存后可能会重新格式化。

*目录*

[TOC]

## 块元素

### 段落和换行

一个段落只是一个或者多个连续的文本行。在Markdown源代码中，段落由多个空白行分隔。在Typora，你只需要按 `回车键`来创建一个新的段落。

按`Shift`+`Enter`创建一个换行符。然而，大多数的编辑器会忽略单行中端，为了让其它的Markdown编辑器识别你的换行符，可以在行尾留下两个空格或者插入`<br/>`。

### 标题

标题在行的开始使用1-6个散列字符，对应1-6的标题级别，例如：



```markdown
# 这是一级标题

## 这是二级标题

### 这是三级标题
```

在typora中，输入一个或多个`#`，然后输入标题内容，按下回车键就会创建一个标题。

### 引用

Markdown使用电子邮件风格>字符进行块引用。他们被表示为：



```markdown
> 这是一个包含两段的blockquote。这是第一段
>
> 这是第二段。Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.我也不知道这事啥意思



> 这是另一个有一个段落的blockquote。两个区块引用之间有三个空白行分隔。
```

在typora中，只需输入'>'后跟引用内容就会生成一个块引用。 Typora将为您插入适当的“>”或换行符。 通过添加额外的“>”级别可以允许在另一个块引用内嵌一个引号。

### 列表

输入`* list item 1`将创建一个无序的列表，`*`符号可以使用`+`或者`-`代替。

输入`1. list item 1`将创建一个有序列表，他们的Markdown源代码如下：



```markdown
## un-ordered list
*   Red
*   Green
*   Blue

## ordered list
1.  Red
2.  Green
3.  Blue
```

### 任务列表

任务列表是标有[ ] 或者[x] (未完成或者完成)的列表，例如：



```markdown
- [ ] a task list item
- [ ] list syntax required
- [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed
```

可以通过单击项目之前的复选框来更改完成/未完成的状态。

### 代码块

Typora只支持Github Flavored Markdown中的栅栏。不支持原始代码块中的标记。

使用代码块很容易，输入```然后按下`entre`键。在```之后添加一个可选的语言标识符，我们将通过它进行语法高亮：



~~~gfm
例如：
```
function test(){
  console.log("notice the blank line before this function?");
}
```
语法高亮：
``` java
String str = new String("hello world!");
System.out.println(str)
```
~~~

### 数学公式

可以使用**MathJax**渲染*LaTeX*数学表达式。

输入`$$`，然后按下`Enter`键将触发一个接收*Tex/LaTeX*源码的输入范围。例如：
$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
 \mathbf{i} & \mathbf{j} & \mathbf{k} \
 \frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \
 \frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \
 \end{vmatrix}
$$
 在Markdown源代码文件中，数学公式是被`$$`标记的*LaTeX*表达式：



```markdown
$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$
```

### 表格

输入`|第一个标题|第二个标题|`然后按下`enter`键讲话创建一个有两列的表格。

创建表之后，在该表上将弹出一个表的工具栏，您可以在其中调整大小，对齐或删除表。 还可以使用上下文菜单来复制和添加/删除列/行。

以下描述可以跳过，因为表的markdown源代码是由typora自动生成的。表格中可以使用链接、粗体、斜体、或删除线等格式。



```markdown
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
```

最后，通过冒号`：`在标题行中，可以定义文本对齐方式，最左侧的买好表示左对齐，最右侧的冒号表示右对齐，两次都有冒号表示中心对齐。



```markdown
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```

### 脚注



```markdown
你可以使用脚注像这样[^脚注]
[^脚注]: 这里写脚注的*文本*
```

实现效果：

你可以使用脚注像这样[[1\]](#fn1)

### 分割线

在空白行输入`***`或者`---` 然后按`enter`键会出现分割线

------

### YAML Front Matter

Typora 支持[YAML Front Matter](https://link.jianshu.com?t=http://jekyllrb.com/docs/frontmatter/)。输入`---`在文章的顶端然后按下`Enter`键就会采用或者从菜单中插入一个元数据块。

### 目录

输入`[toc]`，然后按`enter`键将创建一个“目录”部分，从一个人的写作中提取所有标题，其内容将自动更新。

### 图表

Typora支持[sequence](https://link.jianshu.com?t=https://bramp.github.io/js-sequence-diagrams/), [flowchart](https://link.jianshu.com?t=http://flowchart.js.org/) 和 [mermaid](https://link.jianshu.com?t=https://knsv.github.io/mermaid/#mermaid)，可以在设置中启用此功能。

详情请看[document](https://link.jianshu.com?t=http://support.typora.io/Draw-Diagrams-With-Markdown/)

## 段元素

当你输入之后，段元素就会被渲染和呈现出来，将光标移动到段元素中，会显示Markdown源码，接下来将介绍段元素的用法：

### 链接

Markdown支持两种风格的链接：内联和引用。在两种样式中，链接文本由[方括号]分隔。

要创建内联链接，请在链接文本的关闭方括号后立即使用一组常规括号。 在括号内，将链接所在的网址与链接的可选标题一起放在引号中。 例如：



```markdown
This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.
```

实现效果：

This is [an example](https://link.jianshu.com?t=http://example.com/"Title") inline link. (`<p>This is <a href="http://example.com/" title="Title">`)

[This link](https://link.jianshu.com?t=http://example.net/) has no title attribute. (`<p><a href="http://example.net/">This link</a> has no`)

#### 内部链接

你可以将标题设置为一个连接，我们会创建一个书签，允许你点击标题后，跳转到文章中指定的部分，例如：

Ctrl(On Mac：Command) + Click[This link](#块元素)会跳转到块元素标题的位置 ，要查看如何写入，请移动光标或单击该链接，按⌘键将元素展开为markdown源。

#### 参考链接

参考样式链接使用第二组方括号，您可以在其中放置您选择的标签来标识链接：



```markdown
This is [an example][id] reference-style link.

Then, anywhere in the document, you define your link label like this, on a line by itself:

[id]: http://example.com/  "Optional Title Here"
```

在typora中，他们会被渲染为：

This is [an example](https://link.jianshu.com?t=http://example.com/) reference-style link.

隐式链接名称快捷方式允许您省略链接的名称，在这种情况下，将链接文本本身用作名称。 只需使用一组空白方括号 - 例如将Google“Google”链接到google.com网站，您可以简单地写：



```markdown
[Google][]
And then define the link:

[Google]: http://google.com/
```

在typora中，点击链接将扩展它进行编辑，command+click将打开Web浏览器中的超链接。

### URL地址

Typora允许插入URL作为链接，用尖括号包起来，`<`尖括号`>`。

`<i@typora.io>` 就变成了[i@typora.io](https://link.jianshu.com?t=mailto:i@typora.io).

Typora也会自动链接标准的URLs，例如：[www.google.com](https://link.jianshu.com?t=http://www.google.com)

### 图片

图片和链接看起来是一样的，但是图片需要在链接前加上`!`感叹号字符，图片的语法为：



```markdown
![](/path/to/img.jpg)

![](/path/to/img.jpg "Optional title")
```

您可以使用拖放来从图像文件或浏览器插入图像。 并通过点击图像修改markdown源代码。 如果图像与当前编辑文档在同一目录或子目录中拖放时，将使用相对路径。

更多关于图片的文档，请看[http://support.typora.io//Images/](https://link.jianshu.com?t=http://support.typora.io//Images/)

### 强调

Markdown将星号(`*`)和下划线(`_`)视为强调的指标，用一个`*`或`_`包括的文本，将被HTML中`<em>`标签包裹，例如：



```markdown
*single asterisks*

_single underscores_
```

显示：

*single asterisks*

*single underscores*

GFM会忽略词中的下划线，因为下划线经常被用在代码和名字中，例如：

> wow_great_stuff
>
> do_this_and_do_that_and_another_thing.

要在一个位置上产生一个文字星号或下划线，否则它将被用作强调分隔符，您可以反斜杠逃避它：



```markdown
\*this text is surrounded by literal asterisks\*
```

Typora建议使用`*`字符。

### 加粗

两个`**`或`__`会被HTML中的`<strong>`标签包裹，例如：



```markdown
**double asterisks**

__double underscores__
```

显示：

**double asterisks**

**double underscores**

Typora建议使用`**`字符。

### 代码

使用反引号包裹代码，与预格式化的代码块不同，代码段是表示的是正常段落中的代码：



```markdown
Use the `printf()` function.
```

显示：

Use the `printf()` function.

### 删除线

GFM添加了标准Markdown语法没有的下划线语法。

`~~Mistaken text.~~` 会变成~~Mistaken text.~~

### 下划线

下划线由原始的HTML提供。

`<u>Underline</u>` 变成<u>Underline</u>.

### emoji表情：happy

输入emoji语法：`:smile:`:smile:

用户可以通过按“ESC”键触发表情符号的自动完成建议，或在首选面板上启用后自动触发。 此外，还支持从菜单栏中的“Edit” - >“Emoji＆Symbols”直接输入UTF8表情符号。

### HTML

Typora无法呈现HTML片段。 但是Typora可以解析并渲染非常有限的HTML片段，作为Markdown的扩展，包括：

- 下划线Underline: `<u>underline</u>`
- 图片Image: `![](http://upload-images.jianshu.io/upload_images/2018694-1074db4f76d21622.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)` (And `width`, `height` attribute in HTML tag, and `width`, `height`, `zoom` style in `style` attribute will be applied.)
- 注释Comments: ``
- 超链接Hyperlink: `<a href="http://typora.io" target="_blank">link</a>`.

他们的大部分属性，样式或类将被忽略。 对于其他标签，typora会将其作为原始HTML片段呈现。

但是这些HTML将被导出打印或导出。

### 数学公式

为了使用这个特性，请先在`Preference`面板中的`Markdwn`选择开启，然后使用`$`来包裹TeX命令，例如：`$\lim_{x \to \infty} \exp(-x) = 0$`，将会渲染为LaTeX命令。

$lim_{x \to\infty} \exp(-x) = 0$

要触发内联数学的内联预览：输入“$”，然后按“ESC”键，然后输入TeXT命令，预览工具提示将如下所示可见：

![](https://raw.githubusercontent.com/lvdezhong/figure-bed/master/img/2018694-21a34e771a00afe4.gif)

### 下标和上标

为了使用这个特性，请先在`Preference`面板中的`Markdwn`选择开启。

- 使用`~`来包裹下标内容，例如：`H~2~O`,H2O， `X~long\ text~`/，Xlong text
- 使用`^`包裹上标内容，例如`X^2^`,X2

### 高亮

为了使用这个特性，请先在`Preference`面板中的`Markdwn`选择开启。

使用`==`包裹突出的内容，例如：`==highlight==`，显示为：==highlight==