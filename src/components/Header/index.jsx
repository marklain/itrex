import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ averageGpa }) => {
    return (
    <header className="header">
        <h1 className="header__logo">School gpa calculator</h1>
        <p className="header__gpa-info"><span className="header__gpa">{averageGpa}</span><br/>average<br/>GPA</p>
    </header>
)};

Header.propTypes = {
    averageGpa: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    let activeGrade = state.gradesInfo.find(grade => grade.isActive === true);
    let gpaArr = activeGrade.students.map(student => Number(student.gpa));
    let sumResult = 0;
    gpaArr.forEach(i => {sumResult = sumResult + i});
    sumResult = (sumResult / activeGrade.students.length).toFixed(1);
    if (isNaN(sumResult)) {
        sumResult = 0;
    };
    return ({
    averageGpa: sumResult
})};


export default connect(mapStateToProps, null)(Header);
