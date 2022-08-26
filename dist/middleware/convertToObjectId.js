import { ObjectId } from 'mongodb';
export function convertToObjectId(id) {
    if (!id) {
        throw new Error('Id is invalid');
    }
    var convertedId = new ObjectId(id);
    if (!convertedId) {
        throw new Error('Id conversion failed');
    }
    ;
    return convertedId;
}
