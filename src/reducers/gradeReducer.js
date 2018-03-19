import v4 from 'uuid';

const initialState = JSON.parse(localStorage.getItem('grades-info')) || [{
    id: v4(),
    name: '8a',
    students: [{
        id: v4(),
        name: 'Vasya Pupkin',
        gpa: '4.8'
    }, {
        id: v4(),
        name: 'Petya Vasichkin',
        gpa: '3.2'
    }],
    isActive: true
}];

export default function(state = initialState,action) {
    switch (action.type){
        case 'ADD_GRADE':
            localStorage.setItem('grades-info', JSON.stringify(action.payload));
            return action.payload;
        case 'DELETE_STUDENT':
            localStorage.setItem('grades-info', JSON.stringify(action.payload));
            return action.payload;
        case 'ADD_STUDENT':
            let newGrade = state.map(grade => {
                if (grade.isActive) {
                    grade.students = [...grade.students, action.payload];
                    return grade;
                } else return grade;
            });
            localStorage.setItem('grades-info', JSON.stringify(newGrade));
            return newGrade;
        case 'CHANGE_GRADE_NAME':
            let newGrades = state.map(grade => {
                if (grade.isActive) {
                    grade.name = action.payload;
                    return grade;
                } else return grade;
            });
            localStorage.setItem('grades-info', JSON.stringify(newGrades));
            return newGrades;
        case 'SET_ACTIVE_GRADE':
            localStorage.setItem('grades-info', JSON.stringify(action.payload));
            return action.payload;
        case 'DELETE_GRADE':
            localStorage.setItem('grades-info', JSON.stringify(action.payload));
            return action.payload;
        default: return state;
    }
}
