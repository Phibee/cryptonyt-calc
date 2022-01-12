import React, { useState } from 'react';
import './App.css';
import BottomInfo from './components/BottomInfo';
import Button from './components/Button';
import Input from './components/Input';
import Switch from './components/Switch';

interface CryptoPrice {
	winPrice: number;
	winPercent: number;
	lossPrice: number;
	lossPercent: number;
}

function App() {
	// Declarations
	const [entryType, setEntryType] = useState(1);
	const [entryPrice, setEntryPrice] = useState(0);
	const [takeProfit, setTakeProfit] = useState(0);
	const [stopPrice, setStopPrice] = useState(0);
	const [betAmount, setBetAmount] = useState(0);
	const [leverage, setLeverage] = useState(0);

	const [computedPrice, setComputedPrice] = useState<CryptoPrice>();

	/**
	 * Calculates Buy (Long) Position
	 */
	const calculateBuy = React.useCallback(() => {
		const tpPercentage = ((takeProfit - entryPrice) / entryPrice) * 100;
		const slPercentage = ((entryPrice - stopPrice) / stopPrice) * 100;

		const tpPercentWithLeverage = tpPercentage * leverage;
		const slPercentWithLeverage = slPercentage * leverage;

		const winPrice = (tpPercentWithLeverage / 100) * betAmount;
		const lossPrice = (slPercentWithLeverage / 100) * betAmount;

		setComputedPrice({
			winPrice,
			lossPrice,
			winPercent: tpPercentWithLeverage,
			lossPercent: slPercentWithLeverage,
		});
	}, []);

	/**
	 * Calculates Sell (Short) Position
	 */
	const calculateSell = React.useCallback(() => {
		const tpPercentage = ((entryPrice - takeProfit) / takeProfit) * 100;
		const slPercentage = ((stopPrice - entryPrice) / entryPrice) * 100;

		const tpPercentWithLeverage = tpPercentage * leverage;
		const slPercentWithLeverage = slPercentage * leverage;

		const winPrice = (tpPercentWithLeverage / 100) * betAmount;
		const lossPrice = (slPercentWithLeverage / 100) * betAmount;

		setComputedPrice({
			winPrice,
			lossPrice,
			winPercent: tpPercentWithLeverage,
			lossPercent: slPercentWithLeverage,
		});
	}, []);

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
								<Input
									label="Entry Price"
									onChange={(e) =>
										setEntryPrice(parseFloat(e.currentTarget.value))
									}
								/>
								<Input
									label="Take Profit Price"
									onChange={(e) =>
										setTakeProfit(parseFloat(e.currentTarget.value))
									}
								/>
								<Input
									label="Stop Loss Price"
									onChange={(e) =>
										setStopPrice(parseFloat(e.currentTarget.value))
									}
								/>
							</div>

							{/* Bottom Stats Infor */}
							<div className="col flex-shrink flex-row align-bottom">
								<div className="col">
									<BottomInfo
										label="Winner Price:"
										amount={computedPrice?.winPrice ?? 0}
										percentage={computedPrice?.winPercent ?? 0}
										percentageType="up"
									/>
								</div>
								<div className="col">
									<BottomInfo
										label="Losser Price:"
										amount={computedPrice?.lossPrice ?? 0}
										percentage={computedPrice?.lossPercent ?? 0}
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
								<Switch
									columns={[{ label: 'Buy' }, { label: 'Sell' }]}
									onSelectionChanged={(e) => setEntryType(e)}
								/>
								<Input
									label="Amount (USDT)"
									onChange={(e) =>
										setBetAmount(parseFloat(e.currentTarget.value))
									}
								/>
								<Input
									label="Leverage"
									onChange={(e) =>
										setLeverage(parseFloat(e.currentTarget.value))
									}
								/>
							</div>

							<div className="col flex-shrink flex-row align-bottom">
								<div className="col flex-grow text-right">
									<Button
										label="Calculate"
										onClick={() =>
											entryType === 0 ? calculateBuy() : calculateSell()
										}
									/>
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
