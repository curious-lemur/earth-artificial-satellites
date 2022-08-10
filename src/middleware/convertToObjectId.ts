import { ObjectId } from 'mongodb';

export function convertToObjectId(id: string): ObjectId {
    if (!id) { throw new Error('Id is invalid') }
    const convertedId = new ObjectId(id);
    if (!convertedId) { throw new Error('Id conversion failed') };
    return convertedId;
}