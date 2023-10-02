export interface IAuthUser {
    "user": string,
    "password": string
}

export interface IFilterPeople {
    "names": string,
    "last_name": string,
    "document_number": string,
    "id_city": number
}

export interface IRegisterUser {
    "id_document_type": number,
    "document_number": string,
    "names": string,
    "last_name": string,
    "middle_name": string,
    "born_date": Date,
    "id_city": number,
    "email": string,
    "password": string
}

export interface IUserData {
    "id": number,
    "document_type": number,
    "id_number": string,
    "names": string,
    "last_name": string,
    "middle_name": string,
    "born_date": Date,
    "born_city": number,
    "email": string,
}