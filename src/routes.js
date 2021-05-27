import HomeIcon from '@material-ui/icons/Home';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { MarketOverview } from './components/MarketOverview/MarketOverview';

export const routes = [{
  path: '/',
  label: 'Market overview',
  component: MarketOverview,
  exact: true,
  icon: <HomeIcon />
},
{
  path: '/liquidity ',
  label: 'Liquidity',
  component: () => <div>Test</div>,
  exact: true,
  icon: <ShowChartIcon />
}
];
