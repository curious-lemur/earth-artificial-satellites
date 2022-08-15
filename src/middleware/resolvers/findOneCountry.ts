import { connect, close } from '../../db/db-connection.js';
import { convertToObjectId } from '../convertToObjectId.js';

export default async function findOneCountry({id}) {
   const db = await connect();
   const convertedId = convertToObjectId(id);

   const countryDocument = await db.collection('countries').findOne({ _id: convertedId });
   if (!countryDocument) throw new Error('Country not found');
   const satelliteDocuments = await db.collection('satellites').find({ countries: countryDocument.name }).sort({ startupDate: -1 }).limit(5).toArray();
   if (!satelliteDocuments) throw new Error('Satellites of this country were not found');

   close();
   return {
      country: countryDocument,
      satellites: satelliteDocuments
   };
}