import { useState } from "react";
import api from "../api";

const ReplyComment = ({ reviewId }) => {
    const [reply, setReply] = useState('');
    const [message, setMessage] = useState('');

    const handleReply = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found. Please log in.');
                return;
            }

            const response = await api.post(`/reply-Comment/${reviewId}`, { reply }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Reply added successfully!');
            setReply(''); // Clear the reply input
            
        } catch (err) {
            setMessage('Error replying to review: ' + err.response?.data?.message || 'An unexpected error occurred.');
            console.error(err);
        }
    };

    return (
        <div>
            <textarea 
                value={reply} 
                onChange={(e) => setReply(e.target.value)} 
                placeholder="Give reply" 
            />
            <button onClick={handleReply}>Submit Reply</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReplyComment;
