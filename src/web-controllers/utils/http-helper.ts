import { HttpResponse } from '../ports'
export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data,
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data,
})

export const badRequest = (data: any): HttpResponse => ({
    statusCode: 400,
    body: data,
})

export const serverError = (data: any): HttpResponse => ({
    statusCode: 500,
    body: data,
})
