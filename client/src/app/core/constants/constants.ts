export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:5000/api';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiurl}/login`,
        logout: `${apiurl}/logout`,
        loggedUser: `${apiurl}/user`,
    },
    TodoEndpoint: {
        getAllTodo: `${apiurl}/todo`,
        addTodo: `${apiurl}/todo`,
        updateTodo: `${apiurl}/todo`,
        deleteTodo: `${apiurl}/todo`,
    },
};