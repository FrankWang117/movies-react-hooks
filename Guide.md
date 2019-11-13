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
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=5abd63d1";

function App() {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				console.log(jsonResponse)
				setMovies(jsonResponse.Search);
				console.log(jsonResponse.Search)
				setLoading(false);
			});
	}, []);

	return (
		<div className="App">
			<Header text="Movie app" />
			<div className="movies">
				{loading && !errorMessage ? (<span>loading...</span>) :
					errorMessage ? (<div className="errorMessage">{errorMessage}</div>) :
						(movies.map((movie, index) => (
							<Movie key={`${index}-${movie.Title}`} movie={movie} />
						)))}
			</div>
			{/* <Movie /> */}
		</div>
	);
}

export default App;

```  

同时,我们修改样式:  

``` css
/* App.css*/
/* ... */
.App-header h2 {
	margin: 0;
}
.movies {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
}

.movie {
	padding: 5px 25px 10px 25px;
	max-width: 25%;
}
```

我们可以看到在某个循环内部我们调用了 `Movie` 组件,并传递了 `movie` 属性.我们来修改上一步在 `movie` 组件内部写死的数据:  

``` JavaScript
import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
	const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

	return (
		<div className="movie">
			<h2>{movie.Title}</h2>
			<div>
				<img width="200" alt={`The movie titled: ${movie.Title}`}
					src={poster} />
			</div>
			<p>({movie.Year})</p>

		</div>
	);
};

export default Movie;
```  

定义一个常量的意思是在电影(movie)没有海报时显示默认海报.  

现在我们刷新页面,可以看到新的电影信息已经请求完毕.  

让我们回到 `App.js` 文件,相信你也看到了我们使用了一些新的 `hooks`:`useState`以及 `useEffect`. 这也是我们这个 demo 所重点展示的内容,先来看看官网对 `hooks`以及这两个新 `hooks` 的介绍:  

>Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
>`useState` 通过在函数组件里调用它来给组件添加一些内部 state.`useState` 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState.
>`useEffect` Effect Hook 可以让你在函数组件中执行副作用操作.如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

先来详细的说一下 `useState` :  
接受唯一的一个参数,为初始 state.在上面的例子中我们可以看到:  

``` JavaScript
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
```  

我们在一个函数组件中调用了两次 `useState` hook,第一次相当于我们定义了一个 loading state ,并将它的初始值设置为 `true`(`useState`的参数),并定义了更新此state 的 `setLoading` 方法.第二次同理. 现在我们使用等价的 class 示例来展示 `useState` hook的使用:  

``` JavaScript
// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=5abd63d1";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			movies: [],
			errorMessage: null
		}
	}
	componentDidMount() {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				this.setState({
					movies: jsonResponse.Search,
					loading: false
				})
			});
	}
	render() {
		return (
			<div className="App" >
				<Header text="Movie App" />
				<div className="movies">
					{this.state.loading && !this.state.errorMessage ?
						(<span>loading</span>) :
						this.state.errorMessage ?
							(<div className="errorMessage">
								{this.state.errorMessage}
							</div>) : (this.state.movies.map((movie, index) => (
								<Movie key={`${index}-${movie.Title}`}
									movie={movie} />
							)))}
				</div>
			</div>
		)
	}

}
export default App;

```  

先主要看  `constructor` 函数中我们通过 `this.state` 定义了三个`state`: `loading`:负责页面的加载状态,`movies`用于存储请求来的电影数据,`errorMessage`:保存请求失败后的一些错误信息.并赋予了初始值.而后在 `componentDidMount` 声明周期函数中我们请求数据,并使用 `this.setState` 修改了我们定义的某些 `state`.  

通过两者的比较,我们发现 `useState` hook 大大精简了我们设置 `state` 以及更新 `state` 的方式,而 `useEffect` 则是精简了我们在生命周期函数中重述书写某些逻辑的语句.  

