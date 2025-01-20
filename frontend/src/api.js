
const API_URL='http://localhost:8080'

export const GetAllEmployee=async(search='',page=1,limit=5)=>{
    const url=`${API_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`
    try {
        const options={
            method:'GET',
            'Content-Type':'application/josn',

        }
        const result=await fetch(url,options)
        const data=await result.json()
        return data
        
    } catch (error) {
        return error
        
    }
}

export const createEmployee=async(empObj)=>{
    const url=`${API_URL}/api/employees`
    try {
        const formData=new FormData()

        for(const key in empObj){
            formData.append(key,empObj[key])
        }
        const options={
            method:'POST',
            'Content-Type':'application/josn',
            body:formData

        }
        const result=await fetch(url,options)
        const data=await result.json()
        return data
        
    } catch (error) {
        return error
        
    }
}

export const deleteEmployee = async (employeeId) => {
    const url = `${API_URL}/api/employees/${employeeId}`;
    try {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
};


export const updateEmployee = async (employeeId, empObj) => {
    const url = `${API_URL}/api/employees/${employeeId}`;
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empObj),
        };

        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        throw new Error("Failed to update employee: " + error.message);
    }
};

export const GetEmployeeById = async (employeeId) => {
    const url = `${API_URL}/api/employees/${employeeId}`;
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
};
