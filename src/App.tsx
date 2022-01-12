import React, { useState } from 'react';
import './App.css';
import BottomInfo from './components/BottomInfo';
import Button from './components/Button';
import CurrencyInput from './components/CurrrencyInput';
import Input from './components/Input';
import RangeSlider from './components/RangeSlider';
import Switch from './components/Switch';

interface CryptoPrice {
	winPrice: number;
	winPercent: number;
	lossPrice: number;
	lossPercent: number;
}

function App() {
	// Declarations
	const [entryType, setEntryType] = useState(0);
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
			winPrice: !isNaN(winPrice) ? winPrice : 0,
			lossPrice: !isNaN(lossPrice) ? lossPrice : 0,
			winPercent: !isNaN(winPrice) ? tpPercentWithLeverage : 0,
			lossPercent: !isNaN(lossPrice) ? slPercentWithLeverage : 0,
		});
	}, [takeProfit, entryPrice, stopPrice, betAmount, leverage]);

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
			winPrice: !isNaN(winPrice) ? winPrice : 0,
			lossPrice: !isNaN(lossPrice) ? lossPrice : 0,
			winPercent: !isNaN(winPrice) ? tpPercentWithLeverage : 0,
			lossPercent: !isNaN(lossPrice) ? slPercentWithLeverage : 0,
		});
	}, [takeProfit, entryPrice, stopPrice, betAmount, leverage]);

	const handleOnClick = React.useCallback(() => {
		entryType === 0 ? calculateBuy() : calculateSell();
	}, [entryType, takeProfit, entryPrice, stopPrice, betAmount, leverage]);

	const range = React.useMemo(
		() => [
			{ value: 1, step: 1 }, // acts as min value
			{ value: 50 }, // acts as max value
		],
		[]
	);

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
								<CurrencyInput
									label="Entry Price"
									digits={4}
									withComma={false}
									onValueChanged={(e) => setEntryPrice(e)}
								/>
								<CurrencyInput
									label="Take Profit Price"
									digits={4}
									withComma={false}
									onValueChanged={(e) => setTakeProfit(e)}
								/>
								<CurrencyInput
									label="Stop Loss Price"
									digits={4}
									withComma={false}
									onValueChanged={(e) => setStopPrice(e)}
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
								<CurrencyInput
									label="Amount (USDT)"
									digits={4}
									onValueChanged={(e) => setBetAmount(e)}
								/>

								<RangeSlider
									range={range}
									label="Leverage"
									concatenatedString="x"
									onChange={(value) => setLeverage(value)}
								/>
							</div>

							<div className="col flex-shrink flex-row align-bottom">
								<div className="col flex-grow text-right">
									<Button label="Calculate" onClick={handleOnClick} />
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
