import {Schema, model } from 'mongoose'

const schema = new Schema({
    session: {type: String, required: true},
})

export const UserModel = model('User', schema)