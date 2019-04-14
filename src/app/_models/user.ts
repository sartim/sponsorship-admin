export class User {
    id: number;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    data: {
        first_name: string,
        last_name: string,
        api_token: string
    };
}
