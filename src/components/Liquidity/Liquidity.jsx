import * as React from 'react';
import { useLatestCoins } from '../../hooks/useLatestCoins';
import { ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Scatter, ResponsiveContainer } from 'recharts';
import { CircularProgress } from '@material-ui/core';

const mapDataToChart = (({ marketCap, volume, priceChange, ...rest }) => ({
  y: volume,
  z: Math.abs(priceChange),
  isZPositive: priceChange >= 0,
  marketCap,
  volume,
  priceChange,
  ...rest,
}));

export const Liquidity = () => {
  const { data, isLoading, isError } = useLatestCoins();
  const chartData = data.map(mapDataToChart);
  const chartDataPos = chartData.filter((i) => i.isZPositive);
  const chartDataNeg = chartData.filter((i) => !i.isZPositive);
  if (isLoading) {
    return <CircularProgress color="inherit" />
  }
  if (isError) {
    return <div>Something went wrong. Come back later</div>
  }

  return (
    <ResponsiveContainer width={1000} height="80%">
      <ScatterChart width={800} height={450}
        margin={{ top: 20, right: 20, bottom: 10, left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="marketCap" name="market cap" unit="$" />
        <YAxis dataKey="y" name="volume" unit="$" />
        <ZAxis dataKey="z" name="absoluteChange" unit="$" range={[50,500]}/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />}  />
        <Scatter data={chartDataNeg} fill="red" />
        <Scatter data={chartDataPos} fill="green" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div>
        <p className="desc">{item.name}</p>
        <p className="desc">Market cap: {item.marketCap.toFixed()} $</p>
        <p className="desc">Volume: {item.volume.toFixed()} $</p>
        <p className="desc">Price change: {item.priceChange.toFixed(2)} %</p>
      </div>
    );
  }

  return null;
};
