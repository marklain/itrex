import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StudentRow = ({ name, gpa, id, allGrades, onDeleteStudent }) => {
    return (
    <tr className="students-table__row">
        <td>{name}</td>
        <td>{gpa}</td>
        <td><button onClick={() => onDeleteStudent(id, allGrades)}>x</button></td>
    </tr>
)};

StudentRow.propTypes = {
    name: PropTypes.string.isRequired,
    gpa: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    allGrades: PropTypes.array,
    onDeleteStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    allGrades: state.gradesInfo
});
const mapDispatchToProps = dispatch => ({
    onDeleteStudent(id, grades) {
        const newGrades = grades.map(grade => {
            if (grade.isActive) {
                grade.students = grade.students.filter(student => student.id !== id);
                return grade;
            } else return grade;
        });
        dispatch({
            type: 'DELETE_STUDENT',
            payload: newGrades
        });
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentRow);
