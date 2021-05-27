import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ResponsiveDrawer } from './components/layout/ResponsiveDrawer';
import { Routes } from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    }
  }
})

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ResponsiveDrawer title="Top Coins" >
          <Routes />
          <CssBaseline />
        </ResponsiveDrawer>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
