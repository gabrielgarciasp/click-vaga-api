import BadRequestError from "../exceptions/BadRequestError";
import uuid from "../utils/uuid";
import * as fs from "fs";
import {FileUploadResponse} from "../types/file/FileUploadResponse";

function __uploadFile(files: any): FileUploadResponse {
    const file = files.file

    const [type, extension] = file.mimetype.split('/')

    if (type === undefined || extension === undefined) {
        throw new BadRequestError('Unsupported file')
    }

    if (type !== 'image') {
        throw new BadRequestError('Unsupported file')
    }

    const newFileName = uuid() + '.' + extension

    fs.writeFileSync('./public/' + newFileName, file.data)

    return {
        fileName: newFileName,
        url: `${process.env.URL_PHOTOS}/${newFileName}`
    }
}

export {__uploadFile}
