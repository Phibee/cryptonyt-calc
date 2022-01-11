import React from 'react';
import './App.css';
import BottomInfo from './components/BottomInfo';
import Button from './components/Button';
import Input from './components/Input';
import Switch from './components/Switch';

function App() {
	return (
		<>
			{/* Area for the Animation behind */}
			<div className="area">
				<ul className="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>

				{/* Start of the Form Glass */}
				<h1>Crypto Calculator</h1>
				<div className="glass-container">
					{/* column on left */}
					<div className="glass-col">
						<div className="flex-col h-full">
							<div className="col flex-grow">
								<Input label="Entry Price" />
								<Input label="Take Profit Price" />
								<Input label="Stop Loss Price" />
							</div>

							<div className="col flex-shrink flex-row align-bottom">
								<div className="col">
									<BottomInfo
										label="Winner Price:"
										amount={12000}
										percentage={0.56}
										percentageType="up"
									/>
								</div>
								<div className="col">
									<BottomInfo
										label="Losser Price:"
										amount={12000}
										percentage={0.56}
										percentageType="down"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* column on right */}
					<div className="glass-col">
						<div className="flex-col h-full">
							<div className="col flex-grow">
								<Switch columns={[{ label: 'Buy' }, { label: 'Sell' }]} />
								<Input label="Amount (USDT)" />
								<Input label="Leverage" />
							</div>

							<div className="col flex-shrink flex-row align-bottom">
								<div className="col flex-grow text-right">
									<Button label="Calculate" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
