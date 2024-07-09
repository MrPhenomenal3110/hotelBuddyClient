import dotenv from 'dotenv'

const sendMessage = async (message) => {
    // dotenv.config({path:'./.env'});
    const response = await fetch(process.env.SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
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
        })
    })
    console.log(res);
    return res.reverse();
  };
  
  export default sendMessage;
  