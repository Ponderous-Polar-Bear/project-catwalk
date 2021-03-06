import React from 'react';
import Announcements from './Announcements.jsx';
import MainOverview from './MainOverview.jsx';
import ProductOverview from './ProductOverview.jsx';

const Overview = () => (
  <div id='overview'>
    <Announcements />
    <MainOverview />
    <ProductOverview />
  </div>
);

export default Overview;
