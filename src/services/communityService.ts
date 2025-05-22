import axiosClient from '../utils/axiosClient';


export interface Community {
    id: number;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    members: number;
    followers: any[];
    posts: any[];
}

const communityService = {
    getAllCommunities: async (): Promise<Community[]> => {
        try {
            const response = await axiosClient.get('/api/communities', {
                timeout: 5000 // 5 segundos de timeout
            });
            return response.data;
        } catch (error) {
            console.error('Error en getAllCommunities:', error);
            throw new Error('Error al cargar las comunidades');
        }
    },

    getCommunityById: async (id: number): Promise<Community> => {
        const response = await axiosClient.get(`/api/communities/${id}`);
        return response.data;
    },

    getCommunitiesByCategory: async (category: string): Promise<Community[]> => {
        const response = await axiosClient.get(`/api/communities/category/${category}`);
        return response.data;
    },

    searchCommunities: async (name: string): Promise<Community[]> => {
        const response = await axiosClient.get(`/api/communities/search?name=${name}`);
        return response.data;
    },

    createCommunity: async (community: Partial<Community> | FormData): Promise<Community> => {
        // Si es FormData, no enviar Content-Type, axios lo pone automáticamente
        const isFormData = community instanceof FormData;
        const response = await axiosClient.post('/api/communities', community, isFormData ? {} : {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    updateCommunity: async (id: number, community: Partial<Community>): Promise<Community> => {
        const response = await axiosClient.put(`/api/communities/${id}`, community);
        return response.data;
    },

    deleteCommunity: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/communities/${id}`);
    },

    followCommunity: async (id: number): Promise<Community> => {
        const response = await axiosClient.post(`/api/communities/${id}/follow`);
        return response.data;
    },

    unfollowCommunity: async (id: number): Promise<Community> => {
        const response = await axiosClient.post(`/api/communities/${id}/unfollow`);
        return response.data;
    }
};

export default communityService;