import axios from '../utils/axiosClient';

export interface Post {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    author: any;
    community: any;
    createdAt: string;
    likes: number;
    comments: any[];
    likedBy: any[];
}

const postService = {
    getAllPosts: async (): Promise<Post[]> => {
        const response = await axios.get('/api/posts');
        return response.data;
    },

    getPostById: async (id: number): Promise<Post> => {
        const response = await axios.get(`/api/posts/${id}`);
        return response.data;
    },

    getPostsByCommunity: async (communityId: number): Promise<Post[]> => {
        const response = await axios.get(`/api/posts/community/${communityId}`);
        return response.data;
    },

    getPostsByCommunityOrderByDate: async (communityId: number): Promise<Post[]> => {
        const response = await axios.get(`/api/posts/community/${communityId}/recent`);
        return response.data;
    },

    getPostsByCommunityOrderByLikes: async (communityId: number): Promise<Post[]> => {
        const response = await axios.get(`/api/posts/community/${communityId}/popular`);
        return response.data;
    },

    createPost: async (post: Partial<Post> | FormData): Promise<Post> => {
        // Si es FormData (con imagen), enviar como multipart, si no, enviar como JSON
        if (post instanceof FormData) {
            const response = await axios.post('/api/posts', post, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } else {
            // Elimina cualquier campo author, el backend lo asigna
            const { author, ...postData } = post;
            const response = await axios.post('/api/posts', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
    },

    updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
        const response = await axios.put(`/api/posts/${id}`, post);
        return response.data;
    },

    deletePost: async (id: number): Promise<void> => {
        await axios.delete(`/api/posts/${id}`);
    },

    likePost: async (id: number): Promise<Post> => {
        const response = await axios.post(`/api/posts/${id}/like`);
        return response.data;
    },

    unlikePost: async (id: number): Promise<Post> => {
        const response = await axios.post(`/api/posts/${id}/unlike`);
        return response.data;
    }
};

export default postService;