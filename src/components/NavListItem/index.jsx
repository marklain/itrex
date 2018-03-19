import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavListItem = ({ name, id, allGrades, setActiveGrade, onDeleteGrade }) => {
    return (
    <li className="grade-navigation__grade">
        <NavLink onClick={() => {setActiveGrade(id, allGrades)}} activeClassName="grade-navigation__link-active" className="grade-navigation__link" to={`/itrex/build/grades/${name}`}>GRADE {name}</NavLink>
        <button onClick={() => {onDeleteGrade(id, allGrades)}} className="grade-navigation__btn grade-navigation__btn-delete">x</button>
    </li>
)};

NavListItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    allGrades: PropTypes.array.isRequired,
    setActiveGrade: PropTypes.func.isRequired,
    onDeleteGrade: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    allGrades: state.gradesInfo
});
const mapDispatchToProps = dispatch => ({
    setActiveGrade(id, allGrades) {
        let newGrades = allGrades.map(grade => {
            if (grade.id === id) {
                grade.isActive = true;
                return grade;
            } else {
                grade.isActive = false;
                return grade;
            }
        });
        dispatch({
            type: 'SET_ACTIVE_GRADE',
            payload: newGrades
        })
    },
    onDeleteGrade(id, allGrades) {
        if (allGrades.length === 1) {
            alert('Sorry, but you can not delete this grade, becouse it is your last grade. Add new one, and than try again :)')
            return;
        }
        if (allGrades.find(grade => grade.id === id).isActive) {
            alert('Sorry, but you can not delete this grade, choose another one, and try to delete it again :)');
            return;
        }
        let newGrades = allGrades.filter(grade => grade.id !== id);
        dispatch({
            type: 'DELETE_GRADE',
            payload: newGrades
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavListItem);
