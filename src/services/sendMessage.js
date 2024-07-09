const sendMessage = async (message, threadId) => {
  try {
    if (!threadId) {
      throw new Error('Thread ID is not available.');
    }

    const response = await fetch('https://api-hotelbuddy.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    const res = [];
    data.forEach((msg) => {
      res.push({
        id: msg.id,
        message: msg.content[0].text.value,
        role: msg.role,
      });
    });

    console.log(res);
    return res.reverse();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error; // rethrow the error after logging it
  }
};

export default sendMessage;
