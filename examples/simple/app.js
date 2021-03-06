/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	if (typeof requestAnimationFrame === 'undefined') {
		window.requestAnimationFrame = function (fn) {
			return setTimeout(fn, 100 / 6);
		};
		window.cancelAnimationFrame = function (id) {
			return clearTimeout(id);
		};
	}

	if (typeof console === 'undefined') {
		console = { log: function log() {}, time: function time() {}, timeEnd: function timeEnd() {} };
	}

	var Counter = React.createClass({
		displayName: 'Counter',

		getInitialState: function getInitialState() {
			return {
				text: '123123123'
			};
		},
		componentWillMount: function componentWillMount() {
			console.time('Counter mount');
		},
		componentDidMount: function componentDidMount() {
			console.timeEnd('Counter mount');
		},
		toNum: function toNum(num, callback) {
			var _this = this;

			cancelAnimationFrame(this.rid);
			var COUNT = this.props.COUNT;

			var counting = function counting() {
				var count = _this.props.count;

				switch (true) {
					case count > num:
						COUNT('DECREMENT');
						break;
					case count < num:
						COUNT('INCREMENT');
						break;
					case count === num:
						return callback && callback();
				}
				_this.rid = requestAnimationFrame(counting);
			};
			counting();
		},
		componentWillUpdate: function componentWillUpdate() {
			// debugger
			console.log('willUpdate', 'Counter');
		},
		componentDidUpdate: function componentDidUpdate() {
			this;
			//debugger
			console.log('DidUpdate', 'Counter');
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var state = this.state;
			this.setState({
				test: 100
			});
			console.log('Counter: receiveProps:setState', state === this.state);
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			console.log('Counter: shouldComponentUpdate');
			return true;
		},
		componentWillUnmount: function componentWillUnmount() {
			console.log('unmount', 'Counter');
		},
		getNum: function getNum(e) {
			var num = parseInt(this.input.value, 10);
			if (typeof num === 'number') {
				this.toNum(num);
			}
		},
		getInput: function getInput(input) {
			this.input = input;
		},
		handleChange: function handleChange(e) {
			var text = e.target.value.replace(/[^\d]+/, '');
			this.setState({ text: text });
		},
		render: function render() {
			var props = this.props;
			var COUNT = props.COUNT;

			return React.createElement(
				'div',
				{ id: 'abc' },
				React.createElement(
					'span',
					{ ref: Math.random() > 0.5 ? '' : 'test-ref', 'data-test': 'abaasdf' },
					'count: ',
					props.count
				),
				' ',
				React.createElement(
					'button',
					{ onClick: function () {
							return COUNT('INCREMENT');
						} },
					'+'
				),
				' ',
				React.createElement(
					'button',
					{ onClick: function () {
							return COUNT('DECREMENT');
						} },
					'-'
				),
				' ',
				React.createElement(
					'button',
					{ onClick: function () {
							return COUNT('INCREMENT_IF_ODD');
						} },
					'incrementIfOdd'
				),
				' ',
				React.createElement(
					'label',
					{ htmlFor: 'myinput' },
					'input number:',
					React.createElement('input', {
						type: 'text',
						value: this.state.text,
						onChange: this.handleChange,
						ref: this.getInput,
						id: 'myinput',
						name: 'myinput' })
				),
				React.createElement(
					'button',
					{ onClick: this.getNum },
					'run'
				),
				React.createElement(
					'a',
					{ href: 'adbadfasdf' },
					'test link'
				),
				React.createElement('p', { dangerouslySetInnerHTML: { __html: 'test dangerouslySetInnerHTML: ' + Math.random().toString(36).substr(2) } })
			);
		}
	});

	var Example = React.createClass({
		displayName: 'Example',

		getInitialState: function getInitialState() {
			return {
				val: 0,
				test: 0
			};
		},

		componentDidMount: function componentDidMount() {
			var _this2 = this;

			this.setState({ val: this.state.val + 1, test1: 1 });
			console.log('didMount', this.state); // log 1
			this.setState({ val: this.state.val + 1, test2: 2 });
			console.log('didMount', this.state); // log 2

			setTimeout(function () {
				_this2.setState({ val: _this2.state.val + 1 });
				console.log('setTimeout:', _this2.state); // log 3
				_this2.setState({ val: _this2.state.val + 1 });
				console.log('setTimeout:', _this2.state); // log 4
			}, 4);
		},

		render: function render() {
			return React.createElement(
				'p',
				null,
				this.state.val
			);
		}
	});

	var Wrap = React.createClass({
		displayName: 'Wrap',

		getInitialState: function getInitialState() {
			return { count: 0 };
		},
		COUNT: function COUNT(type) {
			var count = this.state.count;

			switch (type) {
				case 'INCREMENT':
					count += 1;
					break;
				case 'DECREMENT':
					count -= 1;
					break;
				case 'INCREMENT_IF_ODD':
					if (count % 2 === 0) {
						return;
					}
					count += 1;
					break;
			}
			this.setState({ count: count });
		},
		componentWillMount: function componentWillMount() {
			console.time('Wrap mount');
			// let state = this.state
			// this.setState({
			// 	count: this.props.count
			// })
			// console.log('componentWillMount:setState', state === this.state)
		},
		componentDidMount: function componentDidMount() {
			console.timeEnd('Wrap mount');
			var state = this.state;
			this.setState({
				count: this.props.count * 2
			});
			console.log('componentDidMount:setState', state === this.state);
		},
		componentWillUpdate: function componentWillUpdate() {
			// debugger
			console.log('willUpdate', 'Wrap');
		},
		componentDidUpdate: function componentDidUpdate() {
			//debugger
			console.log('DidUpdate', 'Wrap');
		},
		componentWillReceiveProps: function componentWillReceiveProps(props) {
			this.setState({
				count: props.count
			});
			console.log('Wrap:receiveProps');
		},
		shouldComponentUpdate: function shouldComponentUpdate() {
			console.log('Wrap: shouldComponentUpdate');
			return true;
		},
		componentWillUnmount: function componentWillUnmount() {
			console.log('unmount', 'wrap');
		},
		render: function render() {
			// let count = Math.random() > 0.5
			// ? <Counter ref="counter" count={ this.state.count } COUNT={ this.COUNT } />
			// : null
			return React.createElement(
				'div',
				null,
				React.createElement(Counter, { ref: 'counter', count: this.state.count, COUNT: this.COUNT }),
				React.createElement(Example, null)
			);
		}
	});

	var Stateless = function Stateless() {
		return React.createElement(
			'div',
			null,
			'stateless'
		);
	};

	React.render(React.createElement(Stateless, null), document.getElementById('container'));

	var update = function update(count) {
		return React.render(React.createElement(Wrap, { count: count }), document.getElementById('container'));
	};

	var num = 10;
	console.log(update(num));
	// setInterval(() => {
	// 	update(num++)
	// }, 1000)

	// setTimeout(() => {
	// 	React.unmountComponentAtNode(document.getElementById('container'))
	// }, 1000)

/***/ }
/******/ ]);