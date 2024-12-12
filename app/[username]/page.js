import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDb from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {
  // Ensure `params` is defined before destructuring
 
  const { username } = await params;
  console.log('Params is :', username);
 // No need for `await` here

  // Connect to the database and check for the user
  try {
    await connectDb();
    const user = await User.findOne({ username });

    if (!user) {
      return notFound();
    }

    // Render PaymentPage if user exists
    return <PaymentPage username={username} />;
  } catch (error) {
    console.error('Database error:', error);
    return notFound();
  }
};

export default Username;
