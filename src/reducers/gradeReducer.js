import v4 from 'uuid';

const initialState = [{
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
            return action.payload;
        case 'DELETE_STUDENT':
            return action.payload;
        case 'ADD_STUDENT':
            return state.map(grade => {
                if (grade.isActive) {
                    grade.students = [...grade.students, action.payload];
                    return grade;
                } else return grade;
            });
        case 'CHANGE_GRADE_NAME':
            return state.map(grade => {
                if (grade.isActive) {
                    grade.name = action.payload;
                    return grade;
                } else return grade;
            });
        case 'SET_ACTIVE_GRADE':
            return action.payload;
        case 'DELETE_GRADE':
            return action.payload;
        default: return state;
    }
}
