import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import v4 from 'uuid';
import NavListItem from '../NavListItem';

const GradeNavigation = ({ gradeInfo, onAddGrade }) => {
    return (
    <nav className="grade-navigation">
        <ul className="grade-navigation__list">
            {gradeInfo.map(grade => <NavListItem className="grade-navigation__link" key={grade.id} id={grade.id} name={grade.name}/>)}
        </ul>
        <button className="grade-navigation__btn" onClick={() => onAddGrade(gradeInfo)}>+</button>
    </nav>
)};

GradeNavigation.propTypes = {
    gradeInfo: PropTypes.array,
    onAddGrade: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    gradeInfo: state.gradesInfo
});
const mapDispatchToProps = dispatch => ({
    onAddGrade(allGrades) {
        let newGrade = {
            id: v4(),
            name: null,
            students: [],
            isActive: true
        };
        let toggledGrades = allGrades.map(grade => {grade.isActive = false; return grade});
        let newGrades = [...toggledGrades, newGrade];
        dispatch({
            type: 'ADD_GRADE',
            payload: newGrades
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GradeNavigation);
