export const isValidInput = (value:string) => {
    const regex = /^[A-Z가-힣]+$/;
    return regex.test(value);
};