import React from 'react';
import Header from '../Header';
import GradeNavigation from '../GradeNavigation';
import GradeCard from '../GradeCard';

const App = (props) => {
    return (
    <div className="wrapper">
        <Header />
        <GradeNavigation />
        <GradeCard />
    </div>
)};



export default App
