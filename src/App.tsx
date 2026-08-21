/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { Layout } from './components/Layout';
import { Cover } from './screens/Cover';
import { Directory } from './screens/Directory';
import { PeopleRoster } from './screens/PeopleRoster';
import { VendorPage } from './screens/VendorPage';
import { AddVendor } from './screens/AddVendor';
import { Booklet } from './screens/Booklet';
import { YouthRoster } from './screens/YouthRoster';
import { Classroom } from './screens/Classroom';
import { Wellness, SDG as SDGAlignment, Legitimacy, StillGrowing } from './screens/StaticScreens';

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Cover />} />
            <Route path="directory" element={<Directory />} />
            <Route path="people" element={<PeopleRoster />} />
            <Route path="vendor/:id" element={<VendorPage />} />
            <Route path="add-vendor" element={<AddVendor />} />
            <Route path="youth" element={<YouthRoster />} />
            <Route path="booklet/:id" element={<Booklet />} />
            <Route path="classroom" element={<Classroom />} />
            <Route path="wellness" element={<Wellness />} />
            <Route path="sdg" element={<SDGAlignment />} />
            <Route path="legitimacy" element={<Legitimacy />} />
            <Route path="still-growing" element={<StillGrowing />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
}
