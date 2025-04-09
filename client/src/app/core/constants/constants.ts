export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:5000/api';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiurl}/auth/login`,
        logout: `${apiurl}/auth/logout`,
    },
    TodoEndpoint: {
        getAllTodo: `${apiurl}/todos`,
        addTodo: `${apiurl}/todos`,
        updateTodo: `${apiurl}/todos`,
        deleteTodo: `${apiurl}/todos`,
    },
};