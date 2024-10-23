const API_BASE_URL = 'http://localhost:3000/api/tasks';

async function makeRequest(methodType, query, query2) {
    let options, url;
    switch (methodType) {
        case 'POST':
            options = {
                method: methodType,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            };
            url = `${API_BASE_URL}`;
            break;
        case 'GET_ALL':
            options = {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                },
            };
            url = `${API_BASE_URL}`;
            break;
        case 'GET':
            options = {
                method: methodType,
                headers: {
                    accept: 'application/json'
                },
            };
            url = `${API_BASE_URL}/${query}`;
            break;
        case 'PUT':
            options = {
                method: methodType,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            };
            url = `${API_BASE_URL}`;
            break;
        case 'PUT_STATUS':
            options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            };
            url = `${API_BASE_URL}/${query2}/status`;
            break;
        case 'DELETE':
            options = {
                method: methodType,
                headers: {
                    accept: 'application/json'
                },
            };
            url = `${API_BASE_URL}/${query}`;
            break;
        default:
            break;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from `);
        }
        const data = await response.json();
        console.error(data)
        return data;
    } catch (error) {
        throw error;
    }
}

export async function addTask(requestData) {
    makeRequest('POST', requestData)
}

export async function getAllTasks() {
    const response = await makeRequest('GET_ALL');
    return response;
}

export async function getTask(id) {
    makeRequest('GET', id)
}

export async function editTask(requestData, id) {
    makeRequest('PUT', requestData, id)
}

export async function editTaskStatus(requestData, id) {
    makeRequest('PUT_STATUS', requestData, id)
}

export async function deleteTask(id) {
    makeRequest('DELETE', id)
}