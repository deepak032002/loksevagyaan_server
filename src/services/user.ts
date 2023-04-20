import User from "../models/user.model";

export const createUser = (data: object) => {
    User.findAll()
};
