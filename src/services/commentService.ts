import axios from '../utils/axiosClient';

export interface Comment {
    id: number;
    content: string;
    author: any;
    post: any;
    createdAt: string;
    likes: number;
    likedBy: any[];
}

const commentService = {
    getAllComments: async (): Promise<Comment[]> => {
        const response = await axios.get('/api/comments');
        return response.data;
    },

    getCommentById: async (id: number): Promise<Comment> => {
        const response = await axios.get(`/api/comments/${id}`);
        return response.data;
    },

    getCommentsByPost: async (postId: number): Promise<Comment[]> => {
        const response = await axios.get(`/api/comments/post/${postId}`);
        return response.data;
    },

    getCommentsByPostOrderByDate: async (postId: number): Promise<Comment[]> => {
        const response = await axios.get(`/api/comments/post/${postId}/recent`);
        return response.data;
    },

    createComment: async (comment: Partial<Comment>): Promise<Comment> => {
        const response = await axios.post('/api/comments', comment);
        return response.data;
    },

    updateComment: async (id: number, comment: Partial<Comment>): Promise<Comment> => {
        const response = await axios.put(`/api/comments/${id}`, comment);
        return response.data;
    },

    deleteComment: async (id: number): Promise<void> => {
        await axios.delete(`/api/comments/${id}`);
    },

    likeComment: async (id: number): Promise<Comment> => {
        const response = await axios.post(`/api/comments/${id}/like`);
        return response.data;
    },

    unlikeComment: async (id: number): Promise<Comment> => {
        const response = await axios.post(`/api/comments/${id}/unlike`);
        return response.data;
    }
};

export default commentService; 