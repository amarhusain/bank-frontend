
export interface UserData {
    id: number;
    email: string;
    roles: string[];
    token: string;

}


export interface SignupRequestDto {
    emailOrMobile: string;
    password: string;
}

export interface UserDto {
    id: number;
    email: string;
    mobile: string;
    isActive: string;
    isMobileVerified: boolean;
    isEmailVerified: boolean;
}