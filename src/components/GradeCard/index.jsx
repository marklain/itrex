import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentRow from '../StudentRow';
import v4 from 'uuid';

const GradeCard = ({ activeGrade, allGrades, onDeleteStudent, onAddStudent, onChangeGradeName }) => {
    let studentNameRef = null,
        studentGpaRef = null,
        gradeNameRef = null;
    const onAddStudentFormSubmit = evt => {
        evt.preventDefault();
        onAddStudent(studentNameRef.value, studentGpaRef.value);
        studentNameRef.value = '';
        studentGpaRef.value = '';
    };
    const onChangeNameFormSubmit = evt => {
        evt.preventDefault();
        onChangeGradeName(gradeNameRef.value);
        gradeNameRef.value = '';
    }
    return (
    <div className="grade-card">
        <form onSubmit={onChangeNameFormSubmit} className="change-name-form">
            GRADE
            <input
                className="change-name-form__input"
                type="text" ref={node => gradeNameRef = node}
                placeholder={activeGrade.name || 'Type grade name...'}
            />
            <button className="change-name-form__btn" type="submit">apply</button>
        </form>
        <table className="students-table">
            <tbody>
                <tr className="students-table__title">
                    <th>Name</th>
                    <th>GPA</th>
                </tr>
                {activeGrade.students.map(student => (
                    <StudentRow
                        key={student.id}
                        name={student.name}
                        gpa={student.gpa}
                        id={student.id}
                    />
                ))}
            </tbody>

        </table>
        <form onSubmit={onAddStudentFormSubmit} className="add-student-form">
            <input type="text" placeholder="Type student name here..." ref={node => studentNameRef = node} className="add-student-form__name"/>
            <input type="text" placeholder="GPA" ref={node => studentGpaRef = node} className="add-student-form__gpa"/>
            <button type="submit">ADD</button>
        </form>
    </div>
)};

GradeCard.propTypes = {
    activeGrade: PropTypes.object,
    allGrades: PropTypes.array,
    onDeleteStudent: PropTypes.func,
    onAddStudent: PropTypes.func.isRequired,
    onChangeGradeName: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    activeGrade: state.gradesInfo.find(grade => grade.isActive === true),
    allGrades: state.gradesInfo
});
const mapDispatchToProps = dispatch => ({
    onAddStudent(name, gpa) {
        if (gpa.includes(',')) {
            alert(`Type GPA in format "${gpa.split(',').join('.')}" (with dot)`);
            return;
        }
        const newStudent = {
            id: v4(),
            name: name,
            gpa: gpa
        };
        dispatch({
            type: 'ADD_STUDENT',
            payload: newStudent
        })
    },
    onChangeGradeName(name) {
        dispatch({
            type: 'CHANGE_GRADE_NAME',
            payload: name
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GradeCard);
