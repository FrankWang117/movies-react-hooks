# movies-react-hooks  

>基于电影API,结合 Reactjs 的 hooks 功能,制作的 demo

## 1 生成 app

使用 `create-react-app movies-react-hooks` 初始化 app,如果没有安装 `create-react-app` 那么可以使用:  

``` terminal
npm install -g create-react-app
```

来进行安装.  
生成之后我们将看到 (目录结构图片)  
有了基础目录结构,我们就可以开始了.  

## 2. 准备工作与Header组件  

在这个项目中我们需要四个组件:  

- App.js
- Header.js
- Movie.js
- Search.js

现在,我们在 `src` 文件夹内创建一个新的文件夹 `src/components` 文件夹,然后将 `src/App.js` 文件移动到 `src/components/App.js`(如果这时候运行项目,注意 `App.js`文件中的引用的路径),并且创建一个新的文件 `src/components/Header.js`:  

``` JavaScript
// Header.js
import React from "react";

const Header = (props) => {
	return (
		<header classNames="App-header">
			<h2>{props.text}</h2>
		</header>
	);
};

export default Header;
```  
同时,我们修改 `src/components/App.js` 为:

``` JavaScript
import React from 'react';
import './App.css';
import Header from './Header';

function App() {
	return (
		<div className="App">
			<Header text="movie app" />
		</div>
	);
}

export default App;

```

由于我们移动了 `App.js` 所以我们需要将 `src/index.js` 修改为:

``` JavaScript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';	// 这行我们修改了引用路径
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```  

在此项目中打开命令行,运行项目:  

``` terminal
npm start
```  

可以看到 ![初始化项目截图]().  

我们开始写部分样式,让 `Header` 组件看起来更header.  

``` css
/* src/components/App.css
 如果没有这个文件可以将 src/App.css 移入. */
.App {
	text-align: center;
}

.App-header {
	background-color: #282c34;
	height: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
	padding: 20px;
	cursor: pointer;
}
```  

保存文件后我们就可以在 `localhost:3000` 中看到页面发生了变化.

## 3. Movie 组件

同样的,创建 `src/components/Movis.js` 文件:  

``` JavaScript
import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {

	return (
		<div className="movie">
			<h2>银翼杀手</h2>

			<div>
				<img width="200" alt={`The movie titled: 银翼杀手`}
					src={DEFAULT_PLACEHOLDER_IMAGE} />
			</div>
			<p>2018-10-10</p>
		</div>
	);
};

export default Movie;
```  

只是简单的将影片信息展示出来,目前我们的影片信息都是固定的,后期会根据请求回来的数据进行修改,同时修改 `src/components/App.js`:  

``` JavaScript
import React from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie'

function App() {
	return (
		<div className="App">
			<Header text="movie app" />
			<Movie />
		</div>
	);
}

export default App;
```

JavaScript 书写的差不多了我们在将样式添加上去:

``` css
/* src/components/App.css*/
/* ... */
* {
	box-sizing: border-box;
}

@media screen and (min-width: 694px) and (max-width: 915px) {
	.movie {
	  max-width: 33%;
	}
  }
  
  @media screen and (min-width: 652px) and (max-width: 693px) {
	.movie {
	  max-width: 50%;
	}
  }
  
  
  @media screen and (max-width: 651px) {
	.movie {
	  max-width: 100%;
	  margin: auto;
	}
  }
```  

保存以上文件,我们可以看到 `localhost:3000` 发生了变化:  
![添加 Movie 组件]()

## 4. 请求 movie 数据

现在先将我们的组件进程放在一边,先去请求 movie 数据,让页面看起来更真实.  

让我们去修改 `src/components/App.js`:

``` JavaScript

```