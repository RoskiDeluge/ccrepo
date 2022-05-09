import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const cardId = req.query.cardId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed.' });
    return;
  }

  if (req.method === 'POST') {
    // Add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      cardId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;

      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed.' });
    }
  }

  if (req.method === 'GET') {
    // const dummyList = [
    //   { id: 'cm1', name: 'Max', text: 'A first comment' },
    //   { id: 'cm2', name: 'Roberto', text: 'A second comment' },
    //   { id: 'cm3', name: 'Amara', text: 'A third comment' },
    // ];
    // const db = client.db();

    // const documents = await db
    //   .collection('comments')
    //   .find()
    //   .sort({ _id: -1 })
    //   .toArray();
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { cardId: cardId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
}

export default handler;
